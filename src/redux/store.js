import { legacy_createStore as createStore } from "redux";
import reducers from "./reducers/index";

const store = createStore(
  reducers,
  {} /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
