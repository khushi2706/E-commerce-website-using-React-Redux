import { ActionTypes } from "../../../redux/constants/action-type";

const initialState = {
  products: [],
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `${ActionTypes.FETCH_PRODUCTS}_FULFILLED`:
      return { ...state, status: "success", loading: false, products: payload };
    case `${ActionTypes.FETCH_PRODUCTS}_PENDING`:
      return { status: "pending", loading: true };
    case `${ActionTypes.FETCH_PRODUCTS}_REJECTED`:
      return { status: "reject", loading: false };
    // case ActionTypes.SELECTED_PRODUCT:
    //   return state;
    default:
      return state;
  }
};
