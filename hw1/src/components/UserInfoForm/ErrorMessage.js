import React from "react";

import styles from './ErrorMessage.module.css';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const showMessage = this.props.errorMessage.length > 0
    const messageClass = `${styles.message} ${showMessage && styles.show}`
    return (
      <div className={styles.messageWrapper}>
        <div className={messageClass}>
          {this.props.errorMessage}
        </div>
      </div>
    );
  }
}

export default ErrorMessage;
