import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { Button } from '../../../components/button';
import { ButtonColor } from '../../../enums/button.enum';
import { OrderDetailProps } from '../../../interfaces/components-props.interface';
import { OrderStatus } from '../../../enums/order.enum';

export function OrderCard(params: OrderDetailProps) {
  const { order } = params;
  const router = useRouter();

  function onCloseOrder() {
    router.push({
      pathname: '/pages/order-detail/order-detail.component',
      params: {
        orderId: order.id,
        isHistoryPage: params.isHistoryPage ? 1 : 0,
      },
    });
  }

  function onEditOrder() {
    router.push({
      pathname: '/pages/create-order/create-order.component',
      params: {
        orderId: order.id,
      },
    });
  }

  function getFisrtIcon(): any {
    if (!params.isHistoryPage) {
      return 'tag';
    }

    if (order.status === OrderStatus.Delivered) {
      return 'check-circle';
    }

    if (order.status === OrderStatus.NotDelivered) {
      return 'cancel';
    }

    return 'tag';
  }

  function getStatusColor(): string {
    if (order.status === OrderStatus.Delivered) {
      return '#16A34A';
    }
    if (order.status === OrderStatus.NotDelivered) {
      return '#DC2626';
    }
    return '#2563EB';
  }

  function getStatusText(): string {
    if (order.status === OrderStatus.Delivered) {
      return 'Entregado';
    } else if (order.status === OrderStatus.NotDelivered) {
      return 'No entregado';
    }

    return 'Pendiente';
  }

  return(
    <View style={styles.container}>

      <View style={styles.infoRow}>
        <MaterialIcons
          name={getFisrtIcon()}
          size={24}
          color={getStatusColor()}
        />

        <View style={styles.infoContent}>
          <Text style={[styles.infoValue, { color: params.isHistoryPage ? getStatusColor() : '#0F172A' }]}>
            { params.isHistoryPage ? getStatusText() : order.identifier }
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="person-outline"
          size={24}
          color="#2563EB"
        />

        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Cliente</Text>
          <Text style={styles.infoValue}>{order.personName}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="phone"
          size={24}
          color="#2563EB"
        />

        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Número de teléfono</Text>
          <Text style={styles.infoValue}>{order.personNumber}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="payments"
          size={24}
          color="#2563EB"
        />

        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Total</Text>
          <Text style={styles.infoValue}>${order.totalPrice}</Text>
        </View>
      </View>

      {(params.isHistoryPage && order.status === OrderStatus.NotDelivered) && (
        <View style={styles.infoRow}>
          <MaterialIcons
            name="info"
            size={24}
            color="#DC2626"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Motivo de no entrega</Text>
            <Text style={styles.infoValue}>{order.notDeliveredReason}</Text>
          </View>
        </View>
      )}

      {!params.isHistoryPage && (
        <View style={styles.buttonsContainer}>
          <Button
            buttonText="Ver Detalles"
            onClick={onCloseOrder}
            customWidth={50}
            background={ButtonColor.primary}
          />
          <Button
            buttonText="Modificar Pedido"
            onClick={onEditOrder}
            customWidth={50}
            background={ButtonColor.success}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
    gap: 10
  },
  label: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 5,
    width: '100%',
  },
  buttonSection: {
    width: '50%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F172A',
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563EB',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
});