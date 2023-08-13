import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const store = createStore(
  reducers,
  {} /* preloadedState, */,
  applyMiddleware(thunk, promise)
);

export default store;
