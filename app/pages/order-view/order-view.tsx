import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';

import { APP_CONSTANTS } from '../../constants/app.constants';
import { Order } from '../../interfaces/order.interface';
import { OrderStatus } from '../../enums/order.enum';
import { orderService } from '../../services/order.service';

export function UseOrderView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      getAllOrders();
    }, [])
  );

  const filteredOrders = orders.filter(order =>
    order.personName.toLowerCase().includes(search.toLowerCase()) ||
    order.personNumber.includes(search)
  );

  async function getAllOrders() {
    setIsLoading(true);
    const criteria = APP_CONSTANTS.criteria;
    criteria.field = 'status';
    criteria.value = OrderStatus.Created;
    const ordersFirebase = await orderService.getOrdersByCriteria(criteria);
    
    if (ordersFirebase) {
      setOrders(ordersFirebase);
      calculateTotal(ordersFirebase);
    }
    setIsLoading(false);
  }

  function calculateTotal(ordersFirebase: Order[]) {
    let totalPrice = 0;

    for (const order of ordersFirebase) {
      totalPrice += order.totalPrice;
    }

    setTotal(totalPrice);
  }
  
  function onCreateOrder() {
    router.push('pages/create-order/create-order.component');
  }

  function navigatePendingPurchses() {
    router.push('pages/pending-purchases/pending-purchases.component');
  }

  function navigateOrdersHistory() {
    router.push('pages/order-history/order-history.component');
  }

  return {
    orders,
    setOrders,
    search,
    setSearch,
    filteredOrders,
    onCreateOrder,
    navigatePendingPurchses,
    total,
    isLoading,
    navigateOrdersHistory
  };
}
