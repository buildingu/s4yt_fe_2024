import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import helpers from "@root/helpers";
import Reducers from "@reducers";

const middleware = [thunk.withExtraArgument(helpers)];
const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: ["user", "formOptions"] },
  Reducers
);

export const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(...middleware)
);
export const persistor = persistStore(store);
