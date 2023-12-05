import { ActionTypes } from "../../../redux/constants/action-type";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TO_CART:
      // When adding to the cart, use the spread operator to preserve the existing state and add the new product to the cart array.
      return {
        ...state,
        cart: [...state.cart, payload.product],
      };

    case ActionTypes.REMOVE_FROM_CART:
      // When removing from the cart, use the spread operator to preserve the existing state and filter out the item with the specified ID from the cart array.
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload.id),
      };

    default:
      return state;
  }
};
