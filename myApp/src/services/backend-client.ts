import { Products } from "../types/Products";


// ! dont push
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function getProducts() {
  const res = await fetch(`${BACKEND_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function postProducts(data: Products) {
  const res = await fetch(`${BACKEND_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create product");
  }

  return res.json();
}