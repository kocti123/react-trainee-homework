import { fetchProductById, sentInfoAboutProduct } from "../../api/product";
import { productActions } from "../../constants/ActionTypes";

export const fetchAndSetProduct = (id) => (dispatch) => {
  fetchProductById(id)
    .then((product) => {
      dispatch({
        type: productActions.SET_PRODUCT,
        payload: product,
      })
    })
}

export const clearProduct = () => (dispatch) => {
  dispatch({
    type: productActions.CLEAR_PRODCUT,
  });
}

export const updateProduct = (newInfo) => async (dispatch, getState) => {
  const { product } = getState().product;
  const res = await sentInfoAboutProduct({
    ...product,
    ...newInfo,
  });

  dispatch({
    type: productActions.UPDATE_PRODUCT,
    payload: res,
  })
}

