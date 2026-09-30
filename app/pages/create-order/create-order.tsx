import { useLocalSearchParams, useNavigation , useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { APP_CONSTANTS } from '../../constants/app.constants';
import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';
import { ModalResponse } from '../../interfaces/components-props.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderStatus } from '../../enums/order.enum';
import { Product } from '../../interfaces/product.interface';
import { toastService } from '../../services/toast.service';

export function CreateOrder()  {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [personName, setPersonName] = useState('');
  const [personNumber, setPersonNumber] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [isVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const isEditMode = !!orderId;

  useEffect(() => {
    setEditProcess();
  }, []);

  async function setEditProcess(): Promise<void> {
    navigation.setOptions({
      headerTitle: isEditMode
        ? 'Editar Pedido'
        : 'Crear Pedido',
    });

    if (!isEditMode) {
      setIsLoading(false);

      return;
    }
    
    
    setIsLoading(true);
    const orderToEdit = await orderService.getOrderById(orderId as string);
    const orderProducts = await productService.getProductsByOrder(orderId as string);
    setOrderToEdit(orderToEdit, orderProducts);
  }

  function setOrderToEdit(orderToEdit: Order, orderProducts: Product[]) {
    setPersonName(orderToEdit.personName);
    setPersonNumber(orderToEdit.personNumber);
    setIdentifier(orderToEdit.identifier);
    setProducts(orderProducts);
    calculateOrderTotal(orderProducts);
    setIsLoading(false);
  }

  function onCloseAddProducts(response?: ModalResponse): void {
    if (!response?.isSuccess) {
      setModalVisible(false);
      setProductToEdit(null);
      
      return;
    }

    const product = response?.response;
    const currentProducts = products;

    if (productToEdit) {
      return updateProductEdited(currentProducts, product);
    }

    if (!isEditMode) {
      product.id = currentProducts.length + 1;
    }

    currentProducts.push(product);
    finishAddProductProcess(currentProducts);
  }

  function updateProductEdited(currentProducts: Product[], product: Product): void {
    for (const currentProduct of currentProducts) {
      if (currentProduct.id.toString() !== product.id.toString()) {
        continue;
      }

      currentProduct.quantity = product.quantity;
    }
    setProducts(currentProducts);
    finishAddProductProcess(currentProducts);

    return;
  }

  function finishAddProductProcess(currentProducts: Product[]): void {
    calculateOrderTotal(currentProducts);
    setProducts(currentProducts);
    setProductToEdit(null);
    setModalVisible(false);
  }

  async function onSaveOrder(): Promise<void> {
    setIsLoading(true);
    const order = buildOrderBody();
    const isSuccess = await isSuccessRequest(order);

    if (!isSuccess) {
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
    router.back();
  }

  async function isSuccessRequest(order: Order): Promise<boolean> {
    if (isEditMode) {
      await orderService.updateOrder(orderId.toString(), order);

      return true;
    } else {
      const createdOrder = await onCreateOrder(order);

      return !!createdOrder;
    }
  }

  async function onCreateOrder(order: Order): Promise<Order | null> {
    const criteria = APP_CONSTANTS.criteria;
    criteria.field = 'personNumber';
    criteria.value = order.personNumber;
    const ordersFound = await orderService.getOrdersByCriteria(criteria);

    if (isOrderRegistered(ordersFound)) {
      toastService.showError('El número ingresado ya existe');

      return null;
    }

    await setOderIdentifier(order);
    const orderCreated = await orderService.createOrder(order);

    for (const product of products) {
      product.orderId = orderCreated.id;
    }
    await productService.createProducts(products);
    toastService.showSuccess('El pedido ha sido creado');

    return orderCreated;
  }

  function isOrderRegistered(ordersFound: Order[]): boolean {
    if (!ordersFound?.length) {
      return false;
    }

    for (const order of ordersFound) {
      if (order.status === OrderStatus.Created) {
        return true;
      }
    }

    return false;
  }

  async function setOderIdentifier(order: Order): Promise<void> {const criteria = APP_CONSTANTS.criteria;
    criteria.field = 'status';
    criteria.value = OrderStatus.Created;

    const ordersCount = await orderService.getOrdersCountByCriteria(criteria);
    order.identifier = (ordersCount + 1).toString();
  }

  function buildOrderBody(): Order {
    const order: Order = {
      personName,
      personNumber,
      totalPrice,
      id: '',
      identifier,
      status: OrderStatus.Created
    };
    
    return order;
  }

  function calculateOrderTotal(products: Product[]): void {
    let total = 0;

    for (const product of products) {
      total += (Number(product.unitPrice) * Number(product.quantity));
    }

    setTotalPrice(total);
  }

  function isCreateOrdeEnabled(): boolean {
    const value = personName.trim().length > 0 &&
      personNumber.trim().length > 0 &&
      products.length > 0;

    return value;
  }

  function onDeleteProduct(productId: string): void {
    setProducts(currentProducts => 
      currentProducts.filter(product => product.id !== productId)
    );

    if (isEditMode) {
      productService.deleteProducts(productId.toString());
    }

    calculateOrderTotal(products);
  }

  function onEditProduct(product: Product): void {
    setProductToEdit(product);
    setModalVisible(true);
  }

  return {
    personName,
    personNumber,
    setPersonName,
    setPersonNumber,
    isVisible,
    onCloseAddProducts,
    onSaveOrder,
    setModalVisible,
    products,
    totalPrice,
    isCreateOrdeEnabled,
    onDeleteProduct,
    isEditMode,
    orderId,
    isLoading,
    onEditProduct,
    productToEdit
  };
}