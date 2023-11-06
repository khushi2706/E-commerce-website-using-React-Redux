import { callAPI } from "../../../apis/callApi";
import { ActionTypes } from "../../../redux/constants/action-type";

export const fetchProductsAction = () => {
  const products = callAPI("GET", "/products");
  return {
    type: ActionTypes.FETCH_PRODUCTS,
    payload: products,
  };
};

export const selectedProductAction = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
