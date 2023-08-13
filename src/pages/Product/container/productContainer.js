import { fetchProductsAction } from "../actions/productAction";
import { connect } from "react-redux";
import Product from "../pages/Product";
import { addToCartAction } from "../../Cart/actions/cartAction";

const mapStateToProps = (state) => ({
  productReducer: state.productReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProductsAction()),
  addToCart: (data) => dispatch(addToCartAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
