import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { driversReducer } from "./drivers/drivers-slice";
import { ridesReducer } from "./rides/rides-slice";

export const store = configureStore({
    reducer: {
        drivers: driversReducer,
        rides: ridesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
