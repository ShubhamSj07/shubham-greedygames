import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));

// store.subscribe(() => {
//   console.log(store.getState());
// });
