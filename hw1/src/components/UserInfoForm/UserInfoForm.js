import React from "react";

import CustomInput from "./CustomInput";
import InitState from "./InitState";

import styles from "./UserInfoForm.module.css";

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = new InitState();
    this.changesHandler = this.changesHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.cancelFormHandler = this.cancelFormHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
  }

  changesHandler({ target: { name, value } }) {
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        value: value,
      },
    }));
  }

  blurHandler({ target: { name, value } }) {
    console.log("foces changed");
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        errorMessage: "",
      },
    }));
  }

  validate(propertyName, callbackChecker) {
    let valid = false;
    this.setState((prevState) => {
      const value = prevState[propertyName].value.trim();
      const errorMessage = callbackChecker(value);
      valid = errorMessage.length === 0;
      return {
        [propertyName]: {
          ...prevState[propertyName],
          errorMessage,
          valid,
        },
      };
    });
    return valid;
  }

  submitHandler(event) {
    event.preventDefault();

    const isNameValid = (value) => {
      if (value[0].toUpperCase() !== value[0]) {
        return "Имя должно начинаться с заглавной буквы";
      }
      return "";
    };
    this.validate("firstName", isNameValid);
    this.validate("lastName", isNameValid);

    // const isDateBirthValid = (value) => {
    //   if (value.length === 0) {
    //     return "should not be empty";
    //   }
    //   return "";
    // };
    // this.validate("dateBirth", isDateBirthValid);

    const isPhoneNumverValid = (value) => {
      if (!value.match(/\d-\d{4}-\d{2}-\d{2}/)) {
        return "Номер должен иметь фомат x-xxxx-xx-xx где x это число";
      }
      return "";
    };
    this.validate("phoneNumber", isPhoneNumverValid);

    const isUserSiteValid = (value) => {
      if (!value.startsWith("https://")) {
        return "адрес должен начинаться с https://";
      }
      return "";
    };
    this.validate("userSite", isUserSiteValid);

    const isTextAreaValid = (value) => {
      if (value.length > 600) {
        return "поле должно иметь мешьше чем 600 символов";
      }
      return "";
    };
    this.validate("userBio", isTextAreaValid);
    this.validate("userStack", isTextAreaValid);
    this.validate("userProject", isTextAreaValid);

    this.setState((prevState) => {
      if (
        Object.values(prevState).every(
          (input) => input.errorMessage.length === 0
        )
      ) {
        this.props.onSubmit(Object.assign(
          {},
          ...Object.entries(prevState).map((input) => ({
            [input[0]]: input[1].value.trim(),
          }))
        ));
      }
    });
  }

  cancelFormHandler() {
    this.setState(new InitState());
  }

  render() {
    return (
      <div className={styles.form}>
        <h1 className={styles.title}>Создание анкеты</h1>
        <form onSubmit={this.submitHandler}>
          {Object.values(this.state).map((formProprety) => (
            <CustomInput
              key={formProprety.name}
              type={formProprety.type}
              value={formProprety.value}
              label={formProprety.label}
              errorMessage={formProprety.errorMessage}
              name={formProprety.name}
              onChange={this.changesHandler}
              onBlur={this.blurHandler}
            />
          ))}
          <div className={styles.buttons}>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={this.cancelFormHandler}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserInfoForm;
