import { ActionTypes } from "../../../redux/constants/action-type";

const initialState = {
  products: [],
  status: "idle", // Added an initial status of "idle" for clarity
  loading: false, // Added a loading flag
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `${ActionTypes.FETCH_PRODUCTS}_FULFILLED`:
      return { ...state, status: "success", loading: false, products: payload };
    case `${ActionTypes.FETCH_PRODUCTS}_PENDING`:
      return { ...state, status: "pending", loading: true };
    case `${ActionTypes.FETCH_PRODUCTS}_REJECTED`:
      return { ...state, status: "rejected", loading: false };
    // case ActionTypes.SELECTED_PRODUCT:
    //   return state;
    // You can add more cases for other action types as needed
    default:
      return state;
  }
};
