import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { ChipProps, ModalResponse } from '../../interfaces/components-props.interface';
import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';
import { Order } from '../../interfaces/order.interface';
import { Product } from '../../interfaces/product.interface';
import { PRODUCT_CONSTANTS } from '../../constants/product.constants';
import { ProductStatus } from '../../enums/product.enum';
import { toastService } from '../../services/toast.service';

export function UseOrderDetail() {
  const { orderId, isHistoryPage } = useLocalSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<Order>();
  const [isCloseOrderButtonVisible, setIsCloseOrderButtonVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getOrderInfo();
  }, []);

  async function getOrderInfo() {
    const isHistoryPageValue = isHistoryPage === '1';
    setIsCloseOrderButtonVisible(!isHistoryPageValue);
    setIsLoading(true);
    const orderFound = await orderService.getOrderById(orderId as string);
    const productsFound = await productService.getProductsByOrder(orderId as string);
    setOrder(orderFound);
    setProducts(productsFound);
    setIsLoading(false);
  }

  function getChiProps(status: ProductStatus): ChipProps {
    const chipProps = PRODUCT_CONSTANTS.statusChipPros[status];
    const label = PRODUCT_CONSTANTS.statusLabel[status];
    chipProps.label = label;

    return chipProps;
  }

  function onCloseOrder(): void {
    setModalVisible(true);
  }
  
  function onCloseModal(response?: ModalResponse): void {
    setModalVisible(false);

    if (response?.isSuccess) {
      router.back();
      toastService.showSuccess('El pedido se ha cerrado correctamente');
    }
  }

  async function onShareOrder()  {
    const phone = `52${order?.personNumber}`;
    const message = buildMessage();

    const url = `whatsapp://send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(url);
    } catch {
      console.log('WhatsApp no está instalado');
    }
  };

  function buildMessage(): string {
    const productsText = products
      .map((product: Product) => {
        return `• ${product.name} x${product.quantity} - $${product.unitPrice} c/u = $${product.quantity * product.unitPrice}`;
      }
      )
      .join('\n');

    const total = products.reduce(
      (sum, product) => sum + product.quantity * product.unitPrice,
      0
    );

    const message = [
      `🛒 Pedido de: ${order?.personName}`,
      '',
      '📦 Productos:',
      productsText,
      '',
      `💰 Total: $${total}`,
    ].join('\n');

    return message;
  }

  return {
    order,
    products,
    isLoading,
    getChiProps,
    onCloseOrder,
    isModalVisible,
    onCloseModal,
    isCloseOrderButtonVisible,
    onShareOrder
  }
}
