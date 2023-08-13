import { combineReducers } from "redux";
import { productReducer } from "../../pages/Product/reducer/productReducer";
import { cartReducer } from "../../pages/Cart/reducer/cartReducer";

const reducers = combineReducers({
  productReducer,
  cartReducer,
});

export default reducers;
