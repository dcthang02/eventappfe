import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./userSlice";
import eventSlice from "./eventSlice";
import locationSlice from "./locationSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    event: eventSlice.reducer,
    location: locationSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
