import { fetchProductsAction } from "../actions/productAction";
import { connect } from "react-redux";
import Product from "../pages/Product";

const mapStateToProps = (state) => ({
  productReducer: state.productReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProductsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
