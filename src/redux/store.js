import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Reducers
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

/**
 * initialize the following :
 * a- initialState
 * b- middle ware
 * c- Reducers  (combine all reducers in only one )
 */
const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

/**
 * store Creation (reducers , initialState , middlewarex)
 */
// let store;
// if (window.navigator.userAgent.includes("Chrome")) {
//   store = createStore(
//     reducers,
//     initialState,
//     compose(
//       applyMiddleware(...middleware),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// } else {
//   store = createStore(
//     reducers,
//     initialState,
//     compose(applyMiddleware(...middleware))
//   );
// }

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const store = createStore(reducers, initialState, enhancer);

// let enhancer;
// if (__DEV__) {
//   const composeEnhancers =
//     typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//       : compose;

//   enhancer = composeEnhancers(
//     applyMiddleware(thunk),
//     applyMiddleware(middleware)
//   );
// } else {
//   enhancer = compose(
//     applyMiddleware(thunk),
//     applyMiddleware(middleware)
//   );
// }

// const store = createStore(reducers, initialState, enhancer);

export default store;
