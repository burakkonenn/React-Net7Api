import { configureStore  } from "@reduxjs/toolkit";
import gitProduct from "../features/productSlice";

export const store = configureStore({
    reducer: {
        app: gitProduct,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});