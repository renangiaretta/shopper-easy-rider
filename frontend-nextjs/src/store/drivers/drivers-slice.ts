import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDriver } from "../../interfaces/drivers.interface";

interface IDriversState {
    availableDrivers: IDriver[];
};

const initialState: IDriversState = {
    availableDrivers: [] as IDriver[],
};

const availableDrivers = (state: IDriversState, action: PayloadAction<IDriver[]>) => {
    state.availableDrivers = action.payload;
};

const driversSlice = createSlice({
        name: "drivers",
        initialState,
        reducers: {
        availableDrivers,
    },
});

export const { reducer: driversReducer, actions: driversActions } = driversSlice;
