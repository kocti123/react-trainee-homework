import { cartActions } from '../../constants/ActionTypes';

const initState = {
  cartLoaded: false,
  amount: 0,
  products: [],
  id: undefined,
}

const cartReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case cartActions.SET_CART:
      return {
        ...store,
        ...payload
      };
    case cartActions.CLEAR_CART:
      return initState;
    default:
      return store;
  }
}

export default cartReducer;