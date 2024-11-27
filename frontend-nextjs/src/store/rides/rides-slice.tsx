import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEstimatedRide } from "../../interfaces/rides.interface";

interface IRidesState {
    estimatedRide: IEstimatedRide | null;
    additionalRideData: IAdditionalRideData | null;
};

interface IAdditionalRideData {
    customerId: string;
    originString: string;
    destinationString: string;
}


const initialState: IRidesState = {
    additionalRideData: null,
    estimatedRide: null,
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
