import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { Button } from '../../components/button';
import { ButtonColor } from '../../enums/button.enum';
import { Chip } from '../../components/chip';
import { Loader } from '../../components/loader';
import { styles } from './order-detail.styles';
import { UseOrderDetail } from './order-detail';
import { CloseOrderModal } from './close-order-modal/close-order-modal.component';

export default function OrderDetail() {
  const useOrderDetail = UseOrderDetail();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{
        headerTitle: "Detalles de pedido",
        headerRight: () => (
          <TouchableOpacity
            onPress={useOrderDetail.onShareOrder}
            style={{ marginRight: 10 }}
          >
            <FontAwesome
              name="whatsapp"
              size={24}
              color="#25D366"
            />
          </TouchableOpacity>
        )
      }} />
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <MaterialIcons
            name="person-outline"
            size={24}
            color="#2563EB"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Cliente</Text>
            <Text style={styles.infoValue}>{ useOrderDetail.order?.personName }</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <MaterialIcons
            name="phone"
            size={24}
            color="#2563EB"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Número del cliente</Text>
            <Text style={styles.infoValue}>{ useOrderDetail.order?.personNumber }</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <MaterialIcons
            name="payments"
            size={24}
            color="#2563EB"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Total</Text>
            <Text style={styles.orderNumber}>${ useOrderDetail.order?.totalPrice }</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 2 }]}>
            Nombre
          </Text>

          <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>
            Cant.
          </Text>

          <Text style={[styles.headerText, { flex: 2, textAlign: 'center' }]}>
            Estatus
          </Text>

          <Text style={[styles.headerText, { flex: 1, textAlign: 'right' }]}>
            Precio
          </Text>
        </View>

        <FlatList
          data={useOrderDetail.products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={[styles.cell, { flex: 2 }]}>
                { item.name }
              </Text>

              <Text style={[styles.cell, styles.centerCell, { flex: 1 }]}>
                { item.quantity }
              </Text>

              <Text style={[styles.cell, styles.centerCell, { flex: 2 }]}>
                <Chip { ...useOrderDetail.getChiProps(item.purchaseStatus) }/>
              </Text>

              <Text style={[styles.priceCell, { flex: 1 }]}>
                ${ item.unitPrice }
              </Text>
            </View>
          )}
        />

      </View>

      <CloseOrderModal
        isVisible={useOrderDetail.isModalVisible}
        onClose={useOrderDetail.onCloseModal}
        order={useOrderDetail.order!}
      />

      { useOrderDetail.isCloseOrderButtonVisible &&
        <View style={styles.buttonContainer}>
          <Button buttonText='Cerrar pedido' onClick={useOrderDetail.onCloseOrder} background={ButtonColor.success}/>
        </View>
      }

      { useOrderDetail.isLoading && <Loader /> }
    </View>
  );
}
