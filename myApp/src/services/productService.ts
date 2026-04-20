import { fetchProductByBarcode } from '../api/openfood-api-client';
import { mapOpenFoodProduct } from '../mappers/product.mapper';
import { postProducts } from '../api/backend-client';
import { Products } from '../types/Products';

export async function getProductFromBarcode(barcode: string) {
  const response = await fetchProductByBarcode(barcode);

  if (!response || response.status === 0) {
    return null;
  }

  return mapOpenFoodProduct(response);
}

export async function saveProduct(product: Products) {
  return postProducts(product);
}
