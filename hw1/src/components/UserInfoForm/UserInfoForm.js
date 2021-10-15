import React, { useState } from "react";

import CustomInput from "./CustomInput";
import InitState from "./InitState";

import styles from "./UserInfoForm.module.css";

function UserInfoForm(props) {
  const [state, setState] = useState(() => new InitState());

  function changesHandler({ target: { name, value } }) {
    setState((prevState) => {
      const isNameValid = (value) => {
        if (value.length === 0) {
          return "Должен быть заполнен";
        }
        if (value.length > 0 && value[0].toUpperCase() !== value[0]) {
          return "Имя должно начинаться с заглавной буквы";
        }
        return "";
      };

      const isDateBirthValid = (value) => {
        if (value.length === 0) {
          return "Должен быть заполнен";
        }
        return "";
      };

      const isPhoneNumverValid = (value) => {
        if (value.length === 0) {
          return "Должен быть заполнен";
        }
        if (!value.match(/\d-\d{4}-\d{2}-\d{2}/)) {
          return "Номер должен иметь фомат x-xxxx-xx-xx где x это число";
        }
        return "";
      };

      const isUserSiteValid = (value) => {
        if (value.length === 0) {
          return "Должен быть заполнен";
        }
        if (!value.startsWith("https://")) {
          return "адрес должен начинаться с https://";
        }
        return "";
      };

      const isTextAreaValid = (value) => {
        if (value.length === 0) {
          return "Должен быть заполнен";
        }
        if (value.length > 600) {
          return "поле должно иметь мешьше чем 600 символов";
        }
        return "";
      };

      const propsToCheck = [
        ["firstName", isNameValid],
        ["lastName", isNameValid],
        ["dateBirth", isDateBirthValid],
        ["phoneNumber", isPhoneNumverValid],
        ["userSite", isUserSiteValid],
        ["userBio", isTextAreaValid],
        ["userStack", isTextAreaValid],
        ["userProject", isTextAreaValid],
      ];

      let newState = {
        ...prevState,
        [name]: {
          ...prevState[name],
          value,
        }
      }

      return Object.assign(
        {},
        ...propsToCheck.map((prop) => validate(...prop, newState))
      );
    });
  }

  function validate(propertyName, callbackChecker, prevState) {
    const value = prevState[propertyName].value.trim();
    const errorMessage = callbackChecker(value);
    let valid = errorMessage.length === 0;
    return {
      [propertyName]: {
        ...prevState[propertyName],
        errorMessage,
        valid,
      },
    };
  }

  function submitHandler(event) {
    event.preventDefault();

    if (
      Object.values(state).every((input) => input.valid)
    ) {
      props.onSubmit(
        Object.assign(
          {},
          ...Object.entries(state).map((input) => ({
            [input[0]]: input[1].value.trim(),
          }))
        )
      );
    }
  }

  function cancelFormHandler() {
    setState(new InitState());
  }

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Создание анкеты</h1>
      <form onSubmit={submitHandler}>
        {Object.values(state).map((formProprety) => (
          <CustomInput
            key={formProprety.name}
            type={formProprety.type}
            value={formProprety.value}
            label={formProprety.label}
            errorMessage={formProprety.errorMessage}
            valid={formProprety.valid}
            name={formProprety.name}
            onChange={changesHandler}
          />
        ))}
        <div className={styles.buttons}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={cancelFormHandler}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfoForm;
