import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import productEditFormReducer from './productEditFormReducer';

const reducers = combineReducers({
  allProducts: productsReducer,
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
  productEditForm: productEditFormReducer,
});

export default reducers;