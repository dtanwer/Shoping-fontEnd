import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
}

const mypersistReducer = persistReducer(persistConfig, userReducer)
const store = configureStore({
    reducer: {
        auth: mypersistReducer
    },
    middleware: [thunk] 
});

export default store;
export const persistor = persistStore(store)