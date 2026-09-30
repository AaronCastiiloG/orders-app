import { ReactNode } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Order } from './order.interface';
import { Product } from './product.interface';

export interface OrderDetailProps {
  order: Order;
  isHistoryPage?: boolean;
};

export interface ButtonProps {
  buttonText: string;
  customWidth?: number;
  disabled?: boolean;
  onClick?: () => void;
  background?: string;
};

export interface ToolbarProps {
  title: string;
  isBackButtonVisible?: boolean;
  backButtonRoute?: string;
}

export interface ModalResponse {
  response?: any;
  isSuccess: boolean;
}

export interface ModalProps {
  isVisible: boolean;
  onClose: (response?: ModalResponse) => void;
  children?: ReactNode;
}

export interface AddProductModalProps extends ModalProps {
  isEditOrder: boolean;
  orderId?: string;
  product: Product | null;
}

export interface ProductListProps {
  onDeleteProduct: (id: string) => void;
  onEditProduct: (id: Product) => void;
  products?: Product[];
}

export interface ChipProps {
  background: string;
  color: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

export interface CloseOrderModalProps extends ModalProps {
  order: Order;
}
