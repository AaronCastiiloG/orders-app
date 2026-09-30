import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export function MenuOrders() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity
          onPress={() => setVisible(true)}>
          <MaterialIcons
            name="more-vert"
            size={28}
            color="white"
          />
        </TouchableOpacity>
      }
      contentStyle={{
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingVertical: 8,
        width: 240,
      }}
      style={{
        marginTop: 40,
      }}
    >
      <Menu.Item
        title="Compras pendientes"
        leadingIcon="basket-outline"
        titleStyle={{
          fontSize: 16,
          color: '#333',
          marginLeft: 8,
        }}
        onPress={() => {
          setVisible(false);
          router.push('pages/pending-purchases/pending-purchases.component');
        }}
      />

      <Menu.Item
        title="Historial de pedidos"
        leadingIcon="history"
        titleStyle={{
          fontSize: 16,
          color: '#333',
          marginLeft: 8,
        }}
        onPress={() => {
          setVisible(false);
          router.push('pages/order-history/order-history.component');
        }}
      />

      <Menu.Item
        title="Generar etiquetas"
        leadingIcon="tag-outline"
        titleStyle={{
          fontSize: 16,
          color: '#333',
          marginLeft: 8,
        }}
        onPress={() => {
          setVisible(false);
          router.push('pages/generate-pdf/generate-pdf.component');
        }}
      />

      <Menu.Item
        title="Inventario"
        leadingIcon="archive-outline"
        titleStyle={{
          fontSize: 16,
          color: '#333',
          marginLeft: 8,
        }}
        onPress={() => {
          setVisible(false);
        }}
      />
    </Menu>
  );
}