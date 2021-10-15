import React from "react";

import styles from './ErrorMessage.module.css';

function ErrorMessage(props) {

  const showMessage = props.errorMessage.length > 0 && !props.valid;
  const messageClass = `${styles.message} ${showMessage && styles.show}`;
  return (
    <div className={styles.messageWrapper}>
      <div className={messageClass}>
        {props.errorMessage}
      </div>
    </div>
  );
}

export default ErrorMessage;
