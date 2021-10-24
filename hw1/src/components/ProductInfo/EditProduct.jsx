import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProduct } from "../../redux/actions/productActions";
import {
  setInputs,
  clearInputs,
  updateInputs,
  validateInputs,
  stopEdit,
} from "../../redux/actions/productEditFormActions";
import CustomInput from "../../UI/CustomInput/CustomInput";
import EditButton from "./EditButton";

function EditProduct() {
  const dispatch = useDispatch();
  const { inputs, isEdit } = useSelector((store) => store.productEditForm);

  useEffect(() => {
    if (isEdit) {
      dispatch(setInputs());
      dispatch(validateInputs());
      return;
    }
    dispatch(clearInputs());
  }, [isEdit, dispatch]);

  const changeHandler = ({ target: { name, value } }) => {
    dispatch(updateInputs(name, value));
    dispatch(validateInputs());
  };

  const saveNewInfo = (event) => {
    event.preventDefault();

    if (!Object.values(inputs).every((input) => input.valid)) {
      return;
    }

    const newInfo = {
      ...Object.assign(
        {},
        ...Object.entries(inputs).map(([name, { value }]) => ({
          [name]: value,
        }))
      ),
    };

    dispatch(updateProduct(newInfo));
    dispatch(stopEdit());
  };

  return (
    <form onSubmit={saveNewInfo}>
      {isEdit ? (
        <>
          {Boolean(Object.keys(inputs).length) &&
            Object.entries(inputs).map(
              ([name, { type, valid, errorMessage, value, label }]) => {
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
              }
            )}
        </>
      ) : undefined}
      <EditButton />
    </form>
  );
}

export default EditProduct;
