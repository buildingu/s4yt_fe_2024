import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import helpers from "@root/helpers";
import Reducers from "@reducers";

const middleware = [thunk.withExtraArgument(helpers)];

export const store = createStore(Reducers, {}, applyMiddleware(...middleware));
