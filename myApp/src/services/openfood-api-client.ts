export async function fetchProductByBarcode(barcode: string) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    if (!response.ok) {
      console.log('Something went wrong');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching product:', error);
    return null;
  }
}
