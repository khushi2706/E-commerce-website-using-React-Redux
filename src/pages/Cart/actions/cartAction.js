import { ActionTypes } from "../../../redux/constants/action-type";

export const addToCartAction = (product = {}) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: { product },
  };
};

export const removeFromCartAction = (id) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: { id },
  };
};
