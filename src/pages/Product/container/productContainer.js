import { connect } from "react-redux";
import Product from "../pages/Product";
import { fetchProductsAction } from "../actions/productAction";
import { addToCartAction } from "../../Cart/actions/cartAction";

const mapStateToProps = (state) => ({
  productReducer: state.productReducer,
  cartReducer: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProductsAction()),
  addToCart: (productData) => dispatch(addToCartAction(productData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
