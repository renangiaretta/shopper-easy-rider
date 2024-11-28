import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEstimatedRide } from "../../interfaces/rides.interface";

interface IRidesState {
    estimatedRide: IEstimatedRide;
    additionalRideData: IAdditionalRideData;
};

interface IAdditionalRideData {
    customerId: string;
    originString: string;
    destinationString: string;
}


const initialState: IRidesState = {
    additionalRideData: {} as IAdditionalRideData,
    estimatedRide: {} as IEstimatedRide,
};


const additionalRideData = (state: IRidesState, action: PayloadAction<IAdditionalRideData>) => {
    state.additionalRideData = action.payload;
}

const estimatedRide = (state: IRidesState, action: PayloadAction<IEstimatedRide>) => {
    state.estimatedRide = action.payload;
}


const ridesSlice = createSlice({
    name: "rides",
    initialState,
    reducers: {
        estimatedRide,
        additionalRideData,
    },
});

export const { reducer: ridesReducer, actions: ridesActions } = ridesSlice;
