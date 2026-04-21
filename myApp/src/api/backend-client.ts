import { Settings } from "../types/Settings";
import { Products } from "../types/Products";
import { apiRequest } from "../helper/apiRequest";

export function getProducts() {
  return apiRequest<Products[]>("/products");
}

export function postProducts(data: Products) {
  return apiRequest<Products>("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id: number) {
  return apiRequest<void>(`/products/${id}`, {
    method: "DELETE",
  });
}

export function getSettings() {
  return apiRequest<Settings>("/settings");
}

export function postSettings(data: Settings) {
  return apiRequest<Settings>("/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function patchSettings(id: number, data: Partial<Settings>) {
  return apiRequest<Settings>(`/settings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}