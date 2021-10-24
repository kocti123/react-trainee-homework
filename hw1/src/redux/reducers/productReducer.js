import { productActions } from '../../constants/ActionTypes';

const initState = {
  product: {}
};

const productsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case productActions.SET_PRODUCT:
    case productActions.UPDATE_PRODUCT:
      return {
        ...state,
        product: {
          ...payload,
        }
      };
    case productActions.CLEAR_PRODCUT:
      return initState;
    default:
      return state;
  }
}

export default productsReducer;