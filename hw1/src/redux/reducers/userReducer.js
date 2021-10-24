import { userActions } from '../../constants/ActionTypes';

const initialState = {
  username: '',
  id: undefined,
  isLogin: false,
  error: '',
  isLoginFormShown: false,
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userActions.LOGIN_USER:
      return {
        ...initialState,
        ...payload,
        isLogin: true,
      }
    case userActions.FAILED_TO_LOGIN:
      return {
        ...state,
        ...payload,
      }
    case userActions.SHOW_LOGIN_FORM: {
      return {
        ...state,
        isLoginFormShown: true,
      }
    }
    case userActions.CLOSE_LOGIN_FORM: {
      return {
        ...state,
        isLoginFormShown: false,
      }
    }
    case userActions.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}

export default userReducer;
