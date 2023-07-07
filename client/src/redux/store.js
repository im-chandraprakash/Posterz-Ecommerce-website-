import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore  } from "redux-persist";
import thunk from "redux-thunk";


const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    categoryReducer,
    cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);