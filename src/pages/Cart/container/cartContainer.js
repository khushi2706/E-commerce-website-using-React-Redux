import { removeFromCartAction } from "../actions/cartAction";
import { connect } from "react-redux";
import Cart from "../pages/Cart";

const mapStateToProps = (state) => ({
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) => dispatch(removeFromCartAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
