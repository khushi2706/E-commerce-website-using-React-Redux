import { ActionTypes } from "../../../redux/constants/action-type";

const initialState = {
  cart: [], // each item: { id, name, price, quantity }
  totalPrice: 0,
};

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const cartReducer = (state = initialState, { type, payload }) => {
  let updatedCart;

  switch (type) {
    case ActionTypes.ADD_TO_CART: {
      const existingProduct = state.cart.find(item => item.id === payload.product.id);

      if (existingProduct) {
        updatedCart = state.cart.map(item =>
          item.id === payload.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...payload.product, quantity: 1 }];
      }

      return {
        ...state,
        cart: updatedCart,
        totalPrice: calculateTotal(updatedCart),
      };
    }

    case ActionTypes.REMOVE_FROM_CART:
      updatedCart = state.cart.filter(item => item.id !== payload.id);
      return {
        ...state,
        cart: updatedCart,
        totalPrice: calculateTotal(updatedCart),
      };

    case ActionTypes.INCREASE_QUANTITY:
      updatedCart = state.cart.map(item =>
        item.id === payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        cart: updatedCart,
        totalPrice: calculateTotal(updatedCart),
      };

    case ActionTypes.DECREASE_QUANTITY:
      updatedCart = state.cart
        .map(item =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      return {
        ...state,
        cart: updatedCart,
        totalPrice: calculateTotal(updatedCart),
      };

    default:
      return state;
  }
};
