import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCardUsingUserId } from "../../redux/actions/cartActions";
import { closeLoginForm, userLogin } from "../../redux/actions/userActions";

import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";

import styles from "./LoginForm.module.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("johnd");
  const [password, setPassword] = useState("m38rmF$");
  // const [username, setUserName] = useState("derek");
  // const [password, setPassword] = useState("jklg*_56");
  const [showLoading, setShowLoading] = useState(false);
  const refInput = useRef();
  const { error, isLoginFormShown } = useSelector((store) => store.user);

  useEffect(() => {
    if (isLoginFormShown) {
      refInput.current.focus({ preventScroll: true });
    }
  }, [isLoginFormShown]);

  function cancelHandler() {
    dispatch(closeLoginForm());
  }

  async function submitHandler(event) {
    if (event) event.preventDefault();
    setShowLoading(true);
    const isLogin = await dispatch(userLogin(username, password));
    console.log(isLogin);
    setShowLoading(false);
    if (isLogin) {
      dispatch(setCardUsingUserId());
    }
  }

  function changeUserNameHandler({ target: { value } }) {
    setUserName(value);
  }
  function changePasswordHandler({ target: { value } }) {
    setPassword(value);
  }

  return (
    <Modal show={isLoginFormShown} onClose={cancelHandler} title="please login">
      {showLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={submitHandler} className={styles.loginForm}>
          <label>
            User name:
            <input
              ref={refInput}
              type="text"
              value={username}
              onChange={changeUserNameHandler}
            />
          </label>
          <label>
            password:
            <input
              type="password"
              value={password}
              onChange={changePasswordHandler}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
          <p>{error ? error : ""}</p>
        </form>
      )}
    </Modal>
  );
}

export default LoginFormModal;
