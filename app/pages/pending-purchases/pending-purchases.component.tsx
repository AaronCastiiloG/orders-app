import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { Loader } from '../../components/loader';
import { styles } from './pending-purchases.styles';
import { UsePendingPurchases } from './pending-purchases';

export default function PendingPurchases() {
  const usePendingPurchases = UsePendingPurchases();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{
        headerTitle: "Compras pendientes"
        }} />
      <View style={{ flex: 1, paddingLeft: 20 }}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>Nombre</Text>
          <Text style={styles.headerCell}>Cant.</Text>
          <Text style={styles.headerCell}>Cliente</Text>
          <Text style={styles.headerCell}>Acción</Text>
        </View>

        <FlatList
          data={usePendingPurchases.products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>{item.personName} {item.personNumber}</Text>
              <View style={styles.actionsCell}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => usePendingPurchases.onConfirmBuyProduct(item)}>
                    <MaterialIcons name="shopping-cart-checkout" size={24} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </View>
      { usePendingPurchases.isLoading && <Loader /> }
    </View>
  );
}
