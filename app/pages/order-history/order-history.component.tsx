import { Stack } from 'expo-router';
import { View, TextInput, FlatList } from 'react-native';
import { EmptyOrders } from '../../components/empty-orders';

import { Loader } from '../../components/loader';
import { MAIN_STYLES } from '../../MainStyles';
import { OrderCard } from '../order-view/order-card/order-card';
import { styles } from './order-history.styles';
import { UseOrderHistory } from './order-history';

export default function OrderHistory() {
  const useOrderHistory = UseOrderHistory();

  return(
    <View style={[MAIN_STYLES.pageContainer, styles.container]}>
      <Stack.Screen options={{
        headerTitle: "Historial de pedidos",
        }} />
      <View style={styles.searchInput}>
        <TextInput
          placeholder='Buscar pedido'
          value={useOrderHistory.search}
          onChangeText={useOrderHistory.setSearch}
          style={MAIN_STYLES.input}
        />
      </View>
      <FlatList
        style={styles.orderDetailsList}
        contentContainerStyle={styles.orderDetailContainer}
        data={useOrderHistory.filteredOrders}
        keyExtractor={(order) => order.id.toString()}
        renderItem={({ item }) => <OrderCard order={item} isHistoryPage={true}/>}
        ListEmptyComponent={() => <EmptyOrders />}
      />
      { useOrderHistory.isLoading && <Loader /> }
    </View>
  );
}
