export async function fetchProductByBarcode(barcode: string) {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch product from api");
  }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error fetching product:', error);
    return null;
  }
}
