import { createStore, applyMiddleware, compose, combineReducers } from "redux"; //combineReducers,

import counterReducer from "./reducer/counterReducer";
import userLoginReducer from "./reducer/userLoginReducer";

import thunk from "redux-thunk";

const middleware = [thunk];
const allReducer = combineReducers({
  usr: userLoginReducer,
  ctr: counterReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// + const store = createStore(reducer, /* preloadedState, */ composeEnhancers(

const store = createStore(
  // userLoginReducer,
  allReducer,

  composeEnhancers(applyMiddleware(...middleware))
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
