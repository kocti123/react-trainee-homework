import { fetchAllProducts } from '../../api/product';
import { allProductsActions } from '../../constants/ActionTypes';

export const fetchAndSetAllProducts = () => (dispatch, getState) => {
  fetchAllProducts().then((products) => {
    dispatch({
      type: allProductsActions.SET_ALL_PRODUCTS,
      payload: products,
    });
  }
  );
}
