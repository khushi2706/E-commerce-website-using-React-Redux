import { callAPI } from "../../../apis/callApi";
import { ActionTypes } from "../../../redux/constants/action-type";

export const fetchProductsAction = (products) => {
  return {
    type: ActionTypes.FETCH_PRODUCTS,
    payload: callAPI("GET", "/products"),
  };
};

export const selectedProductAction = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
