import { Stack } from 'expo-router';
import { View, Text, TextInput, FlatList } from 'react-native';

import { Button } from '../../components/button';
import { ButtonColor } from '../../enums/button.enum';
import { Loader } from '../../components/loader';
import { MAIN_STYLES } from '../../MainStyles';
import { OrderCard } from './order-card/order-card';
import { styles } from './order-view.styles';
import { UseOrderView } from './order-view';
import { MenuOrders } from '../../components/menu';

export default function OrderView() {
  const useOrderView = UseOrderView();

  return(
    <View style={[MAIN_STYLES.pageContainer, styles.container]}>
      <Stack.Screen options={{
        headerTitle: "Pedidos",
        headerRight: () => (
          <MenuOrders/>
        ),
      }} />
      <View style={styles.searchInput}>
        <TextInput
          placeholder='Buscar pedido'
          value={useOrderView.search}
          onChangeText={useOrderView.setSearch}
          style={MAIN_STYLES.input}
        />
      </View>
      <FlatList
        style={styles.orderDetailsList}
        contentContainerStyle={styles.orderDetailContainer}
        data={useOrderView.filteredOrders}
        keyExtractor={(order) => order.id.toString()}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
      <View style={styles.buttonContainer}>
        <Text style={ styles.totalText } > Total: ${ useOrderView.total } </Text>
        <Button buttonText='Crear nuevo pedido' onClick={useOrderView.onCreateOrder} background={ButtonColor.success}/>
      </View>
      { useOrderView.isLoading && <Loader /> }
    </View>
  );
}
