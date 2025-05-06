import { ActionTypes } from "../../../redux/constants/action-type";

export const addToCartAction = (product = {}) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: { product },
  };
};

export const removeFromCartAction = (productId) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: { id: productId },
  };
};

export const increaseQuantityAction = (id) => ({
  type: ActionTypes.INCREASE_QUANTITY,
  payload: { id },
});

export const decreaseQuantityAction = (id) => ({
  type: ActionTypes.DECREASE_QUANTITY,
  payload: { id },
});



