import { useSelector, useDispatch } from "react-redux";

import {
  startEdit,
  stopEdit,
} from "../../redux/actions/productEditFormActions";

function EditButton() {
  const dispatch = useDispatch();
  const { isEdit } = useSelector((store) => store.productEditForm);

  function startEditHandler() {
    dispatch(startEdit());
  }

  function cancelEditHandler() {
    dispatch(stopEdit());
  }

  return (
    <>
      {isEdit ? (
        <>
          <button type="submit">Save</button>
          <button onClick={cancelEditHandler}>Cancel</button>
        </>
      ) : (
        <button onClick={startEditHandler}>Edit</button>
      )}
    </>
  );
}

export default EditButton;
