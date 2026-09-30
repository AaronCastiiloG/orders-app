import { ProductStatus } from '../enums/product.enum';

export interface Product {
  id: string;
  name: string;
  quantity: number;
  purchaseStatus: ProductStatus;
  unitPrice: number;
  orderId?: string;
  personName?: string;
  personNumber?: string;
}

export interface PendingProduct extends Product {
  orderId?: string;
  personName?: string;
}
