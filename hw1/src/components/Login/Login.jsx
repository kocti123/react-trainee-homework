import { useState } from "react";

import styles from "./Login.module.css";
import LoginFormModal from "./LoginForm";

function Login({ onLogin, onLogout, logInfo }) {
  const [showLoginForm, setShowLoginForm] = useState(false);

  function startLogin() {
    setShowLoginForm(true);
  }

  function loginHandler(name, role) {
    onLogin(name, role);
    setShowLoginForm(false);
  }

  function cancelHandler() {
    setShowLoginForm(false);
  }

  return (
    <div>
      {logInfo.login ? (
        <div className={styles.loginStatus}>
          <p>{logInfo.name}</p>
          <button onClick={onLogout}>log out</button>
        </div>
      ) : (
        <button onClick={startLogin}>log in</button>
      )}
      <LoginFormModal
        showLoginForm={showLoginForm}
        onLogin={loginHandler}
        onCancel={cancelHandler}
      />
    </div>
  );
}

export default Login;
