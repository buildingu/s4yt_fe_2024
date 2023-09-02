import { createStore,applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import Helpers from '@root/helpers';
import Reducers from '@reducers';

const Middleware = [thunk.withExtraArgument(Helpers)];
const PersistedReducer = persistReducer({key:'root',storage,whitelist:['local','options']},Reducers);

export const Store = createStore(PersistedReducer,{},applyMiddleware(...Middleware));
export const Persistor = persistStore(Store);
