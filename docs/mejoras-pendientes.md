# Mejoras pendientes

Cambios chicos para el uso diario. Sin auth y sin reescribir la app.

Al final está cómo entra la app hoy (`App.tsx`, `Main.tsx`, `_layout.tsx`, `index.tsx` y el safe area) y cómo debería quedar.

## 1. El total no se actualiza al borrar un producto

Archivo: `app/pages/create-order/create-order.tsx`, función `onDeleteProduct`.

`setProducts` guarda la lista nueva, pero `calculateOrderTotal(products)` usa la lista de antes del borrado. El total se queda viejo hasta que agregues o edites otro producto.

Calcular el total con la lista ya filtrada:

```tsx
function onDeleteProduct(productId: string): void {
  const nextProducts = products.filter((product) => product.id !== productId);

  setProducts(nextProducts);
  calculateOrderTotal(nextProducts);

  if (isEditMode) {
    productService.deleteProducts(productId.toString());
  }
}
```

## 2. Si Firestore falla, el loader se queda pegado

En la lista de pedidos y al guardar no hay `try/catch`. Si la red falla, `setIsLoading(false)` no se ejecuta.

En `getAllOrders` de `app/pages/order-view/order-view.tsx`:

```tsx
async function getAllOrders() {
  setIsLoading(true);

  try {
    const ordersFirebase = await orderService.getOrdersByCriteria({
      field: 'status',
      value: OrderStatus.Created,
    });

    setOrders(ordersFirebase);
    calculateTotal(ordersFirebase);
  } catch {
    toastService.showError('No se pudieron cargar los pedidos');
  } finally {
    setIsLoading(false);
  }
}
```

El mismo patrón en `onSaveOrder` y en `setEditProcess` de `create-order.tsx`: `try`, toast de error, `finally` con `setIsLoading(false)`.

## 3. El criterio de búsqueda es un objeto compartido

`app/constants/app.constants.ts` exporta un solo objeto `criteria`. Cada consulta le reescribe `field` y `value`. Si dos llamadas se cruzan, una puede leer el filtro de la otra.

Dejar de usar ese objeto. Pasar uno nuevo en cada llamada:

```tsx
await orderService.getOrdersByCriteria({
  field: 'status',
  value: OrderStatus.Created,
});
```

Lo mismo en `onCreateOrder` (`personNumber`) y en `setOderIdentifier` (`status`). Cuando nadie lo use, borrar `APP_CONSTANTS.criteria`.

## 4. Al editar, los productos nuevos no se guardan

En `isSuccessRequest`, el modo edición solo hace `updateOrder`. Borrar sí pega a Firebase al momento. Agregar un producto solo lo mete en memoria y se pierde al salir. Cambiar la cantidad también se queda en memoria (`updateProductEdited` no llama al servicio).

Al guardar en edición:

1. `updateOrder` con nombre, teléfono y total, como ahora.
2. Productos que ya tienen id de Firestore: `productService.updateProduct`.
3. Productos nuevos (sin id de Firestore): `productService.createProduct` con `orderId`.

Una forma simple es marcar los nuevos. Por ejemplo, no asignarles id de Firebase hasta crearlos, y al guardar separar la lista:

```tsx
const existing = products.filter((product) => product.orderId);
const createdNow = products.filter((product) => !product.orderId);

await orderService.updateOrder(orderId.toString(), order);

for (const product of existing) {
  await productService.updateProduct(product);
}

if (createdNow.length > 0) {
  await productService.createProducts(
    createdNow.map((product) => ({ ...product, orderId: orderId.toString() }))
  );
}
```

Hoy, en modo creación, el id temporal es `currentProducts.length + 1`. Ese número no es un id de Firestore. Conviene no usarlo como si lo fuera: el id real lo devuelve `createProduct` / `createProducts`.

## 5. Quitar "Inventario" del menú

En `app/components/menu.tsx`, el ítem Inventario solo cierra el menú. Borrar ese `Menu.Item` hasta que exista la pantalla.

## 6. Estado vacío en Pedidos

`EmptyOrders` ya existe y el historial lo usa. La lista principal no.

En `app/pages/order-view/order-view.component.tsx`, en el `FlatList`:

```tsx
ListEmptyComponent={useOrderView.isLoading ? null : EmptyOrders}
```

Mientras carga, no mostrar el vacío. El texto de `empty-orders.tsx` dice "critertios"; corregirlo a "criterios".

Lo mismo se puede poner en compras pendientes si la lista llega vacía.

## 7. Jalar para refrescar

En el `FlatList` de pedidos:

```tsx
refreshing={useOrderView.isLoading}
onRefresh={useOrderView.getAllOrders}
```

`getAllOrders` tiene que salir en el return del hook. Si el loader de pantalla completa y el refresh se pisan, usa un estado aparte `isRefreshing` para el pull, y deja `isLoading` solo para la primera carga.

## 8. Teclado numérico en el teléfono

En `create-order.component.tsx`, el `TextInput` del número:

```tsx
keyboardType="phone-pad"
```

## 9. Buscar también por número de pedido

En `filteredOrders` de `order-view.tsx`, incluir `identifier`:

```tsx
const query = search.toLowerCase();

const filteredOrders = orders.filter((order) =>
  order.personName.toLowerCase().includes(query) ||
  order.personNumber.includes(search) ||
  order.identifier.toLowerCase().includes(query)
);
```

## 10. Limpieza chica

- En `app/services/toast.service.ts`, quitar el `console.log('Mostrando toast')`.
- `App.tsx` en la raíz no se ejecuta. Se puede borrar cuando `index.tsx` deje de depender de la misma estructura. El detalle está abajo.
- `@react-native-firebase/auth` está en `package.json` y en `app.json` (`plugins`) y no se usa. Quítalo cuando confirmes que no lo vas a ocupar; si lo quitas del plugin, hay que volver a generar el build nativo.

## Orden sugerido

1. Total al borrar y `try/finally` del loader.
2. Dejar de mutar `APP_CONSTANTS.criteria`.
3. Guardar productos al editar.
4. Estado vacío, refresh, teclado y búsqueda por folio.
5. Menú Inventario, typo, `console.log`.
6. Acomodar la entrada de la app (siguiente sección). El punto 6 se puede hacer junto con borrar `App.tsx` y `Main.tsx`.
7. Reestructurar rutas y carpetas. Va después de los puntos anteriores. El detalle está en "Estructura futura".

---

# Cómo entra la app

`package.json` tiene `"main": "expo-router/entry"`. Expo Router es el arranque. `App.tsx` no participa.

```
expo-router/entry
        │
        ▼
app/_layout.tsx          envuelve todas las pantallas
        │
        ├── /            app/index.tsx  →  Main.tsx  →  OrderView
        ├── /pages/create-order/create-order.component
        ├── /pages/order-detail/order-detail.component
        └── ...cada archivo dentro de app/ que exporta un componente por default
```

Cualquier archivo dentro de `app/` con `export default` es una ruta. Por eso `router.push('pages/create-order/create-order.component')` abre esa pantalla: el path es el archivo. Hooks y servicios sin `export default` no deberían ser pantallas, pero viven dentro de `app/`, que Expo reserva para rutas. A la larga conviene dejar en `app/` solo las pantallas y mover servicios, hooks y componentes fuera, por ejemplo a `src/`. No hace falta hacerlo ahora.

## Qué hace cada archivo

### `App.tsx` (raíz)

Copia de una app sin Expo Router: `SafeAreaProvider`, `StatusBar` y `Main`. Con `"main": "expo-router/entry"` nunca se monta. El safe area y los providers que sí corren están en `_layout.tsx`. Este archivo se puede borrar.

### `app/_layout.tsx`

Es el reemplazo de `App.tsx`. Se monta una vez y envuelve todas las rutas.

Hoy hace cuatro cosas:

- `PaperProvider` para el menú de React Native Paper.
- `SafeAreaProvider` para poder leer los márgenes del notch y de la barra de gestos.
- `SafeAreaView` con `edges={['bottom']}` alrededor del `Stack`.
- `Stack` (el navegador) y el `Toast` como hermano, para que el toast flote encima.

El header del `Stack` ya se dibuja debajo de la barra de estado. Por eso el `SafeAreaView` solo pide el borde de abajo: evita que el botón de "Crear pedido" quede bajo la barra de gestos, y no empuja el header otra vez hacia abajo.

`StatusBar` no está aquí. Está solo en `index.tsx`, así que solo la pantalla de inicio lo declara. Conviene moverlo al layout para que aplique en todas las rutas.

### `app/index.tsx`

Es la ruta `/`, la primera pantalla. Solo pinta un `View` con `MAIN_STYLES.main_container` y renderiza `Main`.

Ese estilo tiene `alignItems: 'center'` y `justifyContent: 'center'`. En la raíz de una pantalla empuja el contenido al centro en vez de dejarlo ocupar el alto. El `Stack` ya le da `flex: 1` a la ruta. Este `View` extra no aporta.

### `app/Main.tsx`

Solo existe en la ruta `/`. Renderiza `OrderView` y le suma padding con `useSafeAreaInsets()`:

```tsx
paddingTop: insets.top
paddingBottom: insets.bottom
```

Las otras pantallas (crear, detalle, historial) no pasan por `Main`, así que no tienen ese padding. La de inicio sí. Por eso el margen se siente distinto solo en Pedidos.

Ese padding está de más:

- Arriba: el header del `Stack` ya consumió `insets.top`. Sumarlo otra vez deja un hueco debajo del título.
- Abajo: el `SafeAreaView` del layout ya aplicó `edges={['bottom']}`. Sumarlo otra vez deja doble margen sobre el botón.

## Cómo debería quedar

Un solo lugar para providers y safe area: `_layout.tsx`. `index.tsx` solo muestra la lista. Sin `App.tsx` y sin `Main.tsx`.

`app/_layout.tsx`:

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#1E293B' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontSize: 20 },
              headerTitleAlign: 'center',
              contentStyle: { backgroundColor: '#F8FAFC' },
            }}
          />
        </SafeAreaView>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
```

`edges={['bottom']}` se queda. El header cubre el borde de arriba. No hace falta `useSafeAreaInsets` en la pantalla de inicio.

`app/index.tsx`:

```tsx
import OrderView from './pages/order-view/order-view.component';

export default function Index() {
  return <OrderView />;
}
```

Después de eso, borrar `App.tsx` y `app/Main.tsx`. `MAIN_STYLES.main_container` se puede dejar si otra pantalla lo usa; la ruta `/` ya no lo necesita.

Expo Router ya trae un `SafeAreaProvider` por dentro. El de `_layout.tsx` puede quedarse: es el que envuelve tu árbol y hace que `useSafeAreaInsets` tenga valores reales. El de `App.tsx` no, porque ese archivo no corre.

---

# Estructura futura

Hoy la ruta es el path del archivo. `app/pages/order-history/order-history.component.tsx` se abre como `pages/order-history/order-history.component`. La carpeta `pages` y el sufijo `.component` alargan la URL. Hooks, servicios y componentes también viven dentro de `app/`, que Expo reserva para pantallas.

Expo no usa `page.tsx`. Un archivo con ese nombre sería la ruta `/order-detail/page`. El equivalente es una carpeta con `index.tsx`: `app/order-history/index.tsx` se abre como `/order-history`.

La estructura separa el mapa de rutas de las pantallas. `src/app` solo reexporta. `src/features` tiene la pantalla, el hook y los estilos. Lo compartido queda fuera de `app`.

```
src/
  app/
    _layout.tsx                      Stack, providers, toast
    index.tsx                        /
    create-order/
      index.tsx                      /create-order
    order-history/
      index.tsx                      /order-history
    pending-purchases/
      index.tsx                      /pending-purchases
    generate-pdf/
      index.tsx                      /generate-pdf
    order/
      [orderId].tsx                  /order/abc123

  features/
    orders/
      orders.tsx                     la lista, lo que hoy es OrderView
      use-orders.ts
      orders.styles.ts
      order-card.tsx
    create-order/
      create-order.tsx
      use-create-order.ts
      create-order.styles.ts
      add-product-modal.tsx
      product-list.tsx
    order-detail/
      order-detail.tsx
      use-order-detail.ts
      order-detail.styles.ts
      close-order-modal.tsx
    order-history/
      order-history.tsx
      use-order-history.ts
      order-history.styles.ts
    pending-purchases/
      pending-purchases.tsx
      use-pending-purchases.ts
      pending-purchases.styles.ts
    generate-pdf/
      generate-pdf.tsx
      use-generate-pdf.ts
      generate-pdf.styles.ts

  components/
    button.tsx
    chip.tsx
    loader.tsx
    menu.tsx
    empty-orders.tsx
    toolbar.tsx
  services/
    order.service.ts
    product.service.ts
    toast.service.ts
  db/
    firebase.ts
  interfaces/
  enums/
  constants/
  utils/
```

Cada `index.tsx` solo reexporta la pantalla:

```tsx
export { default } from '@/features/order-history/order-history';
```

`src/app/index.tsx` reexporta la lista de pedidos. `App.tsx` y `Main.tsx` no entran. Si el proyecto pasa a `src/app`, ese directorio tiene prioridad sobre `app/` en la raíz: conviene dejar uno solo.

El `Stack` no cambia. Cambian los `push`:

```tsx
router.push('/create-order');
router.push('/order-history');
router.push('/pending-purchases');
router.push('/generate-pdf');
router.push(`/order/${order.id}`);
```

`[orderId].tsx` entrega el id con `useLocalSearchParams()`, igual que hoy. `_layout.tsx` dentro de una carpeta de pantalla no hace falta: ese archivo es el contenedor de rutas hijas, y aquí basta el de la raíz.

Al mover archivos, hay que actualizar los imports y el alias `@/` en `tsconfig.json` para que apunte a `./src/*`. Los hooks del historial, compras pendientes, crear pedido, detalle y etiquetas siguen con `useEffect` y `[]`, porque esas pantallas se crean al entrar y se destruyen al salir. `useFocusEffect` se queda solo en la lista de pedidos, que permanece montada debajo del stack.
