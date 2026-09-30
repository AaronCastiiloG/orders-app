import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { APP_CONSTANTS } from '../../constants/app.constants';
import { Order } from '../../interfaces/order.interface';
import { OrderStatus } from '../../enums/order.enum';
import { orderService } from '../../services/order.service';

export function UseOrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      getAllOrders();
    }, [])
  );

  const filteredOrders = orders.filter(order =>
    order.personName.toLowerCase().includes(search.toLowerCase()) ||
    order.personNumber.includes(search)
  );

  async function getAllOrders(): Promise<void> {
    setIsLoading(true);
    const criteria = APP_CONSTANTS.criteria;
    criteria.field = 'status';
    criteria.value = OrderStatus.Delivered;
    const deliveredOrders = await orderService.getOrdersByCriteria(criteria);
    criteria.value = OrderStatus.NotDelivered;
    const undeliveredOrders = await orderService.getOrdersByCriteria(criteria);
    const allOrders = [...deliveredOrders, ...undeliveredOrders];

    if (allOrders?.length) {
      setOrders(allOrders);
    }

    setIsLoading(false);
  }

  return {
    orders,
    setOrders,
    search,
    setSearch,
    filteredOrders,
    isLoading,
  };
}
