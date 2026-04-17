import { fetchProductByBarcode } from './openfood-api-client';
import { mapOpenFoodProduct } from '../mappers/product.mapper';
import { postProducts } from './backend-client';

export async function getProductFromBarcode(barcode: string) {
  const response = await fetchProductByBarcode(barcode);

  if (!response || response.status === 0) {
    return null;
  }

  return mapOpenFoodProduct(response);
}

export async function saveProduct(product: any) {
  return postProducts(product);
}