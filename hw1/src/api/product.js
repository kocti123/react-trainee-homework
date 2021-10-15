import { GET_ALL_PRODUCTS } from "../constants/productsURL";

export const fetchAllProduct = async () => {
  const respones = await fetch(GET_ALL_PRODUCTS);

  return respones.json();
}

export const fetchProductById = async (id) => {
  const respones = await fetch(`${GET_ALL_PRODUCTS}/${id}`);

  return respones.json();
}

export const sentNewInstockInfo = (product, amount) => {
  fetch(`${GET_ALL_PRODUCTS}/${product.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...product, instock: product.instock - amount }),
  });
}

export const sentInfoAboutProduct = (newInfo) => {
  fetch(`${GET_ALL_PRODUCTS}/${newInfo.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInfo),
  });
}