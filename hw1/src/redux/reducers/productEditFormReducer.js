import { productEditForm } from '../../constants/ActionTypes';

const initState = {
  isEdit: false,
  inputs: {},
}

const productEditFormReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case productEditForm.SET_INPUTS:
    case productEditForm.UPDATE_INPUTS:
      return {
        ...state,
        inputs: {
          ...payload,
        }
      };
    case productEditForm.CLEAR_INPUTS:
      return initState;
    case productEditForm.START_EDIT_PRODUCT:
      return {
        ...state,
        isEdit: true
      }
    case productEditForm.STOP_EDIT_PRODUCT:
      return {
        ...state,
        isEdit: false
      }
    default:
      return state;
  }
}

export default productEditFormReducer;