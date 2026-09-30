import { useEffect, useState } from 'react';

import { Order } from '../../interfaces/order.interface';
import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { ProductStatus } from '../../enums/product.enum';

export function UsePendingPurchases() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllProducts() {
    setIsLoading(true);
    const products = await productService.getProductsByStatus(ProductStatus.Pending);
    const orders = await orderService.getOrders();

    if (!products?.length) {
      setProducts([]);
      setIsLoading(false);

      return;
    }

    setOrderPersonNameByProduct(orders, products);
    setIsLoading(false);
  }

  useEffect(() => {
    const loadProducts = async () => getAllProducts();
    void loadProducts();
  }, []);

  async function onConfirmBuyProduct(product: Product): Promise<void> {
    setIsLoading(true);
    product.purchaseStatus = ProductStatus.Purchased;
    await productService.updateProduct(product);
    await getAllProducts();
  }

  function setOrderPersonNameByProduct(orders: Order[], products: Product[]): void {
    for (const product of products) {
      const orderFound = orders.find((order) => order.id === product.orderId);

      if (orderFound) {
        product.personName = orderFound.personName;
        product.personNumber = orderFound.personNumber;
      }
    }
    setProducts(products);
  }

  return {
    products,
    isLoading,
    onConfirmBuyProduct
  };
}