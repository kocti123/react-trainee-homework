import { cartActions } from "../../constants/ActionTypes";

import { createNewCart, fetchCartByUserId, putUpdatedCard } from "../../api/cartApi";
import { fetchProductById } from "../../api/product";

export const addItemToCart = ({ image, title, price, id: productId }, buyAmount) => async (dispatch, getState) => {
  const { products, amount, id: cartId } = getState().cart;

  if (products.some(({ id: idInCart }) => idInCart === +productId)) {
    const updatedCart = products.map((product) => {
      if (product.id === +productId) {
        return {
          ...product,
          amount: +product.amount + +buyAmount,
        };
      }
      return product;
    });

    dispatch({
      type: cartActions.SET_CART,
      payload: {
        amount: +amount + +buyAmount,
        products: updatedCart,
      },
    });

    await putUpdatedCard(cartId, updatedCart);

    return;
  }
  const newProducts = [
    ...products,
    {
      amount: buyAmount,
      image,
      title,
      price,
      id: +productId,
    },
  ]

  dispatch({
    type: cartActions.SET_CART,
    payload: {
      amount: +amount + +buyAmount,
      products: newProducts,
    }
  });

  await putUpdatedCard(cartId, newProducts);
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: cartActions.CLEAR_CART,
  });
};

export const setCardUsingUserId = () => async (dispatch, getState) => {
  if (!getState().user.isLogin) return;

  const { id } = getState().user;
  const cart = await fetchCartByUserId(id);
  if (!cart) {
    const newCartId = createNewCart(id);
    dispatch({
      type: cartActions.SET_CART,
      payload: {
        cartLoaded: true,
        amount: 0,
        products: [],
        id: newCartId,
      },
    });
    return;
  }

  const { products } = cart;

  const totalAmount = products.reduce((acc, { quantity }) => acc + quantity, 0);
  const card = await Promise.all(
    products.map(async ({ productId, quantity: amount }) => {
      const { image, title, price } = await fetchProductById(productId);
      return {
        image,
        title,
        price,
        amount,
        id: +productId,
      };
    })
  );

  dispatch({
    type: cartActions.SET_CART,
    payload: {
      cartLoaded: true,
      amount: totalAmount,
      products: card,
      id: cart.id
    },
  });
};
