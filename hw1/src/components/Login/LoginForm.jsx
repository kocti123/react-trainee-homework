import { useEffect, useState, useRef } from "react";

import Modal from "../../UI/Modal/Modal";

import styles from "./LoginForm.module.css";

function LoginFormModal({ showLoginForm, onLogin, onCancel }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const refInput = useRef();

  useEffect(() => {
    if (showLoginForm) {
      refInput.current.focus({ preventScroll: true });
    }
  }, [showLoginForm]);

  function validateInput() {
    if (userName.trim().length === 0) {
      return "user name should be filled";
    }
    if (password.trim().length === 0) {
      return "password should be filled";
    }
    if (userName.trim() === "admin" && password.trim() !== "123") {
      return "incorect user name or password";
    }
    return "";
  }

  function submitHandler(event) {
    if (event) event.preventDefault();

    const err = validateInput();
    if (err) {
      setErrorMessage(err);
      return;
    }

    const role = userName === "admin" ? "admin" : "customer";
    onLogin(userName.trim(), role);

    setErrorMessage("");
    setUserName("");
    setPassword("");
  }

  function closeModalHandler() {
    setErrorMessage("");
    setUserName("");
    setPassword("");
    onCancel();
  }

  function changeUserNameHandler({ target: { value } }) {
    setUserName(value);
  }
  function changePasswordHandler({ target: { value } }) {
    setPassword(value);
  }

  return (
    <Modal
      show={showLoginForm}
      onClose={closeModalHandler}
      title="please login"
    >
      <form onSubmit={submitHandler} className={styles.loginForm}>
        <label>
          User name:
          <input
            ref={refInput}
            type="text"
            value={userName}
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
          <button onClick={closeModalHandler}>Cancel</button>
        </div>
      </form>
      <p>{errorMessage ? errorMessage : ""}</p>
    </Modal>
  );
}

export default LoginFormModal;
