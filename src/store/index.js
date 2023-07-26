import { configureStore,combineReducers } from "@reduxjs/toolkit";
import productSlice from "../features/product/product.slice";
import bannerSlice from "../features/banner/banner.slice";
import loginSlice from "../features/loginModel/login.slice";
import authSlice from "../features/auth/auth.slice";
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
}
const combinedReducer=combineReducers({
    auth: authSlice,
    product: productSlice,
    banner:bannerSlice,
    loginModel:loginSlice

})
const mypersistReducer = persistReducer(persistConfig, combinedReducer)
const store = configureStore({
    reducer: mypersistReducer,
    middleware: [thunk] 
});

export default store;
export const persistor = persistStore(store)