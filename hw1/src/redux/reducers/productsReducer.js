import { allProductsActions } from "../../constants/ActionTypes";

const initialState = {
  products: [],
}

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case allProductsActions.SET_ALL_PRODUCTS:
      return {
        products: [
          ...payload,
        ],
      }
    default:
      return state;
  }
}

export default productsReducer;