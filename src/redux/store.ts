import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import busesReducer from "./busesSlice";
import bookingsReducer from "./bookingsSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busesReducer,
    bookings: bookingsReducer,
  }
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
