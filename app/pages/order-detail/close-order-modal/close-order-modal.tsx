import { useState } from 'react';

import { CloseOrderModalProps } from '../../../interfaces/components-props.interface';
import { Order } from '../../../interfaces/order.interface';
import { OrderStatus } from '../../../enums/order.enum';
import { orderService } from '../../../services/order.service';
import { productService } from '../../../services/product.service';

export function UseCloseOrderModal(params: CloseOrderModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDelivered, setIsDelivered] = useState(true);
  const [reason, setReason] = useState('');

  const response = { isSuccess: false, response: null };

  function onCloseModal(): void {
    params.onClose(response);
  }

  async function onDeliverOrder(): Promise<void> {
    setIsLoading(true);
    const deliveredOrder = buildDeliveredOrderBody();

    await orderService.updateOrder(deliveredOrder.id, deliveredOrder);
    await productService.deleteProductsByOrderId(deliveredOrder.id);
    params.onClose({ isSuccess: true, response: { order: deliveredOrder } });
    setIsLoading(false);
  }

  function buildDeliveredOrderBody(): Order {
    const deliveredOrder = { ...params.order };
    deliveredOrder.status = isDelivered ? OrderStatus.Delivered : OrderStatus.NotDelivered;

    if (!isDelivered) {
      deliveredOrder.notDeliveredReason = reason;
    }

    return deliveredOrder;
  }

  function toggleDelivered(): void {
    setIsDelivered(!isDelivered);
  }

  function isCloseOrderButtonEnabled(): boolean {
    return isDelivered || (!isDelivered && reason.trim().length > 0);
  }

  return {
    isLoading,
    onCloseModal,
    response,
    isDelivered,
    toggleDelivered,
    reason,
    setReason,
    isCloseOrderButtonEnabled,
    onDeliverOrder
  };
}
