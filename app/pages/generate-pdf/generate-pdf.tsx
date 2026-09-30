import { useNavigation , useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

import { APP_CONSTANTS } from '../../constants/app.constants';
import { buildLabelsHtml } from '../../mocks/orders-pdf';
import { Order } from '../../interfaces/order.interface';
import { orderService } from '../../services/order.service';
import { OrderStatus } from '../../enums/order.enum';
import { Alert } from 'react-native';

export function UseGeneratePdf() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrdersToPrint();
  }, []);

  async function getOrdersToPrint(): Promise<void> {
    const criteria = APP_CONSTANTS.criteria;
    criteria.field = 'status';
    criteria.value = OrderStatus.Created;
    const ordersFound = await orderService.getOrdersByCriteria(criteria);
    setOrders(ordersFound);
  }

  async function generatePdf(): Promise<void> {
    console.log("Entró a generatePdf");
    const labelsHtml = orders.map((order: Order) => `
      <div class="label">
        <div class="order-number">
          Pedido #${order.identifier}
        </div>

        <div class="customer-name">
          ${order.personName}
        </div>

        <div class="phone">
          ${order.personNumber}
        </div>

        <div class="total">
          Total: $${order.totalPrice}
        </div>
      </div>
    `).join('');

    const html = buildLabelsHtml(labelsHtml);

    try {
      const pdf = await Print.printToFileAsync({
        html,
      });

      await Sharing.shareAsync(pdf.uri);
    } catch (e) {
      Alert.alert("Error", JSON.stringify(e));
    }
  }

  return {
    generatePdf,
    orders
  };
}