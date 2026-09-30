import { ProductStatus } from '../enums/product.enum';
import { ChipProps } from '../interfaces/components-props.interface';

const PRODUCT_STATUS_LABEL: Record<ProductStatus, string> = {
  [ProductStatus.Pending]: 'Pendiente',
  [ProductStatus.Purchased]: 'Comprado',
  [ProductStatus.Cancelled]: 'Cancelado',
};

const PENDING_CHIP: ChipProps = {
  background: '#FEF3C7',
  color: '#F59E0B',
  label: ''
}

const PURCHASED_CHIP: ChipProps = {
  background: '#D1FAE5',
  color: '#10B981',
  label: ''
}

const CANCELLED_CHIP: ChipProps = {
  background: '#FEE2E2',
  color: '#EF4444',
  label: ''
}

const PRODUCT_STATUS_CHIP: Record<ProductStatus, ChipProps> = {
  [ProductStatus.Cancelled]: CANCELLED_CHIP,
  [ProductStatus.Pending]: PENDING_CHIP,
  [ProductStatus.Purchased]: PURCHASED_CHIP,
};

export const PRODUCT_CONSTANTS = {
  statusLabel: PRODUCT_STATUS_LABEL,
  statusChipPros: PRODUCT_STATUS_CHIP
};
