import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import busesReducer from "./busesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busesReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
