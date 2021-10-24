import { authUser } from "../../api/userApi";

import { userActions } from "../../constants/ActionTypes";

export const userLogin = (username, password) => async (dispatch) => {
  const user = await authUser(username, password);
  if (user.err) {
    dispatch({
      type: userActions.FAILED_TO_LOGIN,
      payload: {
        error: user.err
      }
    });
    return false;
  }
  dispatch({
    type: userActions.LOGIN_USER,
    payload: {
      username: user.name.firstname,
      id: user.id,
    }
  });
  return true;
}

export const userLogout = () => (dispatch) => {
  dispatch({ type: userActions.LOGOUT_USER });
}

export const showLoginForm = () => (dispatch) => {
  dispatch({ type: userActions.SHOW_LOGIN_FORM });
}

export const closeLoginForm = () => (dispatch) => {
  dispatch({ type: userActions.CLOSE_LOGIN_FORM });
}