import { useState, useEffect } from "react";

import CustomInput from "../../UI/CustomInput/CustomInput";
import EditButton from "./EditButton";

function EditProduct({
  product,
  onNewProductInfo,
  onEdit,
  onCancelEdit,
  isEdit,
  role,
}) {
  const [inputs, setInputs] = useState([
    {
      name: "title",
      type: "text",
      valid: true,
      errorMessage: "",
      value: product.title,
    },
    {
      name: "description",
      type: "textArea",
      valid: true,
      errorMessage: "",
      value: product.description,
    },
    {
      name: "instock",
      type: "number",
      valid: true,
      label: "is left",
      errorMessage: "",
      value: product.instock,
    },
    {
      name: "price",
      type: "number",
      label: "$",
      valid: true,
      errorMessage: "",
      value: product.price,
    },
  ]);

  const isInputValidFunctions = {
    title: (value) => {
      if (value.length === 0) {
        return "should be filled";
      }
      if (value.length > 30) {
        return "should be less than 30 characters";
      }
      return "";
    },
    description: (value) => {
      if (value.length === 0) {
        return "should be filled";
      }
      if (value.length > 600) {
        return "should be less than 600 characters";
      }
      return "";
    },
    instock: (value) => {
      if (value < 0) {
        return "should be more than 0";
      }
      return "";
    },
    price: (value) => {
      if (value < 0) {
        return "should be more than 0";
      }
      return "";
    },
  };

  function startEditHandler() {
    onEdit();
  }

  function cancelEditHandler() {
    onCancelEdit();
  }

  function saveInputsHandler() {
    if (!inputs.every((input) => input.valid)) {
      return;
    }

    const newInfo = {
      ...Object.assign(
        {},
        ...inputs.map((input) => ({ [input.name]: input.value }))
      ),
    };

    onNewProductInfo(newInfo);
    onCancelEdit();
  }

  useEffect(() => {
    (function syncInputsWithProduct() {
      setInputs((prevState) => {
        const newState = prevState.map((input) => {
          return {
            ...input,
            value: product[input.name],
          };
        });
        return newState;
      });
    })();
  }, [product]);

  function changeHandler({ target: { name, value } }) {
    const newInputsValue = inputs.map((input) => {
      let errorMessage = "";
      if (input.name === name) {
        errorMessage = isInputValidFunctions[input.name](value);
      }

      return {
        ...input,
        errorMessage,
        value: input.name === name ? value : input.value,
        valid: errorMessage.length === 0,
      };
    });
    setInputs(newInputsValue);
  }

  return (
    <>
      {isEdit ? (
        <>
          {inputs.map(({ name, type, valid, errorMessage, value, label }) => {
            return (
              <CustomInput
                key={name}
                name={name}
                type={type}
                label={label}
                valid={valid}
                errorMessage={errorMessage}
                value={value}
                onChange={changeHandler}
              />
            );
          })}
        </>
      ) : undefined}

      <EditButton
        role={role}
        isEdit={isEdit}
        onStartEdit={startEditHandler}
        onSaveEdit={saveInputsHandler}
        onCancelEdit={cancelEditHandler}
      />
    </>
  );
}

export default EditProduct;
