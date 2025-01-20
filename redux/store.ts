import {configureStore} from "@reduxjs/toolkit";
import {ecommerceApi} from "@/redux/api";
import authSlice from "@/redux/feature/authSlice";


export const makeStore = () => {
    return configureStore({
        reducer:{
            [ecommerceApi.reducerPath]: ecommerceApi.reducer,
            // userProfile: userProfileSlice,
            auth: authSlice,
            // cart: cartSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(ecommerceApi.middleware),
    });
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']