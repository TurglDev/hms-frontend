import { baseApi } from "./api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import tenantReducer from "@/features/tenant/slices/tenantSlice";

const isDev = import.meta.env.DEV;

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    tenant: tenantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: isDev
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
