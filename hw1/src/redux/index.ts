import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { State } from "../types";
import reducers from "./reducers";

const store: Store<State, AnyAction> = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<State, unknown, AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default store;
