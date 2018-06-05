import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducers, {}, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);