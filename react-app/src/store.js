import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
const middleware = [thunkMiddleware];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;