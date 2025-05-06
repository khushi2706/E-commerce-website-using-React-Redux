import { connect } from "react-redux";
import Cart from "../pages/Cart";
import { decreaseQuantityAction, increaseQuantityAction, removeFromCartAction } from "../actions/cartAction";

const mapStateToProps = (state) => ({
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) => dispatch(removeFromCartAction(productId)),
  increaseQuantity: (id) => dispatch(increaseQuantityAction(id)),
  decreaseQuantity: (id) => dispatch(decreaseQuantityAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
