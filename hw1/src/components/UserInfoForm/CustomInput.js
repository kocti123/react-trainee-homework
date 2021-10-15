import React from "react";

import ErrorMessage from "./ErrorMessage";

import styles from "./CustomInput.module.css";

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    let input;
    if (this.props.type === "textArea") {
      input = (
        <div className={styles.CustomTextarea}>
          <textarea
            name={this.props.name}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            value={this.props.value}
            required
          />
          <div>{this.props.value.length}/600</div>
        </div>
      );
    } else {
      input = (
        <input
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          type={this.props.type}
          required
          className={styles.input}
        ></input>
      );
    }

    return (
      <div className={styles.customInput}>
        <label className={styles.label} htmlFor={this.props.name}>
          {this.props.label}
        </label>
        {input}
        <ErrorMessage errorMessage={this.props.errorMessage} />
      </div>
    );
  }
}

export default CustomInput;
