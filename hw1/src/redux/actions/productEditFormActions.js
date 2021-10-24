import { productEditForm } from "../../constants/ActionTypes";

export const setInputs = () => (dispatch, getState) => {
  const { product } = getState().product
  dispatch({
    type: productEditForm.SET_INPUTS,
    payload: {
      title: {
        type: "text",
        valid: true,
        errorMessage: "",
        value: product.title,
      },
      description: {
        type: "textArea",
        valid: true,
        errorMessage: "",
        value: product.description,
      },
      price: {
        type: "number",
        label: "$",
        valid: true,
        errorMessage: "",
        value: product.price,
      },
    },
  });
};

export const clearInputs = () => (dispatch) => {
  dispatch({ type: productEditForm.CLEAR_INPUTS });
};

export const updateInputs = (name, value) => (dispatch, getState) => {
  const { inputs } = getState().productEditForm;
  dispatch({
    type: productEditForm.UPDATE_INPUTS,
    payload: {
      ...inputs,
      [name]: {
        ...inputs[name],
        value,
      }
    }
  })
}

export const validateInputs = () => (dispatch, getState) => {
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

  const { inputs } = getState().productEditForm;
  let isChanged = false;

  const checkInputs = {};
  Object.entries(inputs).forEach(([name, props]) => {
    const err = isInputValidFunctions[name](props.value);
    if (err) isChanged = true;
    checkInputs[name] = {
      ...props,
      errorMessage: err,
      valid: err.length === 0,
    }
  });

  if (!isChanged) {
    dispatch({
      type: productEditForm.UPDATE_INPUTS,
      payload: {
        ...checkInputs,
      }
    });
  }
}

export const startEdit = () => (dispatch) => {
  dispatch({
    type: productEditForm.START_EDIT_PRODUCT
  })
}

export const stopEdit = () => (dispatch) => {
  dispatch({
    type: productEditForm.STOP_EDIT_PRODUCT,
  })
}
