import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions/cartActions";
import {
  userLogin,
  userLogout,
  showLoginForm,
} from "../../redux/actions/userActions";

import styles from "./Login.module.css";
import LoginFormModal from "./LoginForm";

function Login() {
  const dispatch = useDispatch();
  const { isLogin, username, isLoginFormShown } = useSelector(
    (store) => store.user
  );

  function startLogin() {
    dispatch(showLoginForm());
  }

  function onLogout() {
    dispatch(userLogout());
    dispatch(clearCart());
  }

  return (
    <div>
      {isLogin ? (
        <div className={styles.loginStatus}>
          <p>{username}</p>
          <button onClick={onLogout}>log out</button>
        </div>
      ) : (
        <button onClick={startLogin}>log in</button>
      )}
      <LoginFormModal />
    </div>
  );
}

export default Login;
