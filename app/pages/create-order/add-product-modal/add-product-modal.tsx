import { useEffect, useState } from 'react';

import { AddProductModalProps } from '../../../interfaces/components-props.interface';
import { productService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';
import { ProductStatus } from '../../../enums/product.enum';

export function UseAddProductModal(params: AddProductModalProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState<boolean>(false);

  const response = { isSuccess: false, response: null };

  const isSaveButtonEnabled = name?.toString().length > 0 &&
    quantity?.toString().length > 0 &&
    unitPrice?.toString().length > 0;

  useEffect(() => {
    setEditProcess();
  }, []);

  async function setEditProcess() {
    if (!params.product) {
      return;
    }

    setIsLoading(true);
    setIsEditProduct(true);
    const product = params.product;
    setName(product.name);
    setPrice(product.unitPrice.toString());
    setQuantity(product.quantity.toString());
    setIsLoading(false);
  }

  function onCloseModal(): void {
    resetForm();
    params.onClose(response);
  }

  async function onAddProduct(): Promise<void> {
    setIsLoading(true);
    const product = buildProductBody();
    let responseBody = product

    if (params.isEditOrder && !params.product) {
      product.orderId = params.orderId;
      responseBody = await productService.createProduct(product);
    } else if (params.isEditOrder && params.product) {
      product.orderId = params.orderId;
      responseBody = await productService.updateProduct(product);
    }

    response.isSuccess = true;
    response.response = responseBody as any;
    resetForm();
    setIsLoading(false);
    params.onClose(response);
  }

  function buildProductBody(): Product {
    const product: Product = {
      name,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      id: params.product ? params.product.id : '',
      purchaseStatus: ProductStatus.Pending
    };

    return product;
  }

  function resetForm(): void {
    setName('');
    setQuantity('');
    setPrice('');
  }

  return {
    name,
    quantity,
    unitPrice,
    setName,
    setQuantity,
    setPrice,
    onCloseModal,
    onAddProduct,
    isSaveButtonEnabled,
    response,
    isLoading,
    isEditProduct
  };
}
