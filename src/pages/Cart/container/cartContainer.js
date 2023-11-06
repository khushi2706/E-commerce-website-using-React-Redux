import { connect } from "react-redux";
import Cart from "../pages/Cart";
import { removeFromCartAction } from "../actions/cartAction";

const mapStateToProps = (state) => ({
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) => dispatch(removeFromCartAction(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
