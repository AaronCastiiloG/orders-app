import { Stack } from 'expo-router';
import { Text, TextInput, View } from 'react-native';

import { AddProductModal } from './add-product-modal/add-product-modal.component';
import { Button } from '../../components/button';
import { ButtonColor } from '../../enums/button.enum';
import { CreateOrder } from './create-order';
import { CreateOrderStyles } from './create-order.styles';
import { Loader } from '../../components/loader';
import { MAIN_STYLES } from '../../MainStyles';
import { ProductList } from './products-list/product-list.component';

export default function CreateOrderComponent() {
  const styles = CreateOrderStyles;
  const useCreateOrder = CreateOrder();

  return(
    <View style={styles.container}>
      <Stack.Screen />
      <View style={styles.formContainer}>
        <View style={styles.inputSecction}>
          <Text style={MAIN_STYLES.boldText}>Nombre:</Text>
          <TextInput
            value={useCreateOrder.personName}
            onChangeText={useCreateOrder.setPersonName}
            style={styles.input}
          />
          <Text style={MAIN_STYLES.boldText}>Número:</Text>
          <TextInput
            value={useCreateOrder.personNumber}
            onChangeText={useCreateOrder.setPersonNumber}
            style={styles.input}
          />
        </View>
        <View>
          <Button buttonText='Agregar producto' onClick={() => useCreateOrder.setModalVisible(true)}/>
        </View>
        <ProductList products={useCreateOrder.products} onDeleteProduct={useCreateOrder.onDeleteProduct} onEditProduct={useCreateOrder.onEditProduct}/>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalOrderText}> Total del pedido: ${ useCreateOrder.totalPrice } </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonText='Guardar Pedido'
          onClick={useCreateOrder.onSaveOrder}
          disabled={!useCreateOrder.isCreateOrdeEnabled()}
          background={ButtonColor.success}/>
      </View>
      {
        useCreateOrder.isVisible && <AddProductModal
        isVisible={useCreateOrder.isVisible}
        onClose={useCreateOrder.onCloseAddProducts}
        isEditOrder={useCreateOrder.isEditMode}
        orderId={useCreateOrder.orderId?.toString()}
        product={useCreateOrder.productToEdit}/>
      }
      
      { useCreateOrder.isLoading && <Loader /> }
    </View>
  );
}
