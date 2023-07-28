import { combineReducers } from "redux";
import { productReducer } from "../../pages/Product/reducer/productReducer";

const reducers = combineReducers({
  productReducer,
});

export default reducers;
