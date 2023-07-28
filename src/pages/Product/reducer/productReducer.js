import { ActionTypes } from "../../../redux/constants/action-type";

const initialState = {
  products: [],
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    // case ActionTypes.SELECTED_PRODUCT:
    //   return state;
    default:
      return state;
  }
};
