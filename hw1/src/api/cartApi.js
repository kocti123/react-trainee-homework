import { GET_USER_CARD, GET_CARD } from "../constants/productsURL"

export const fetchCartByUserId = async (id) => {
  const data = await fetch(`${GET_USER_CARD}/${id}`);
  const cards = await data.json();
  return Promise.resolve(cards[0]);
}

export const putUpdatedCard = async (id, cart) => {
  const res = await fetch(`${GET_CARD}/${id}`, {
    method: "PUT",
    body: JSON.stringify(
      {
        products: cart,
      }
    )
  })
}

export const createNewCart = async (userId) => {
  const res = await fetch(`${GET_CARD}`, {
    method: "POST",
    body: JSON.stringify(
      {
        date: new Date().toISOString(),
        userId,
        products: [],
      }
    )
  })
  console.log(res);
}