import React from "react";

import ErrorMessage from "./ErrorMessage";

import styles from "./CustomInput.module.css";

function CustomInput(props) {

  let input;
  if (props.type === "textArea") {
    input = (
      <div className={styles.CustomTextarea}>
        <textarea
          name={props.name}
          // onBlur={props.onBlur}
          onChange={props.onChange}
          value={props.value}
        // required
        />
        <div>{props.value.length}/600</div>
      </div>
    );
  } else {
    input = (
      <input
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        // onBlur={props.onBlur}
        type={props.type}
        // required
        className={styles.input}
      ></input>
    );
  }

  return (
    <div className={styles.customInput}>
      <ErrorMessage errorMessage={props.errorMessage} valid={props.valid} />
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
      {input}
    </div>
  );
}

export default CustomInput;
