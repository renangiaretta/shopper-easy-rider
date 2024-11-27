import { IDriver } from "./drivers.interface";

export interface IRide {
    id: number,
    date: Date,
    origin: string,
    destination:
    string,
    distance:
    number,
    duration:
    string,
    driver: {
        id: number,
        name: string
    },
    value: number
}

export interface IEstimateRide {
    customer_id: string;
    origin: string;
    destination: string;
}

export interface IEstimatedRide {
    origin: ICoordinates;
    destination: ICoordinates;
    options: IDriver[]
    distance: number
    duration: string;
    routeResponse: IRoutes
}

export interface ICoordinates {
    latitude: TLatitude;
    longitude: TLongitude;
}

export interface IRoutes {
    routes: IRoute[]
}

export interface IRoute {
        distanceMeters: number;
        duration: string;
        legs: ILeg[];
        polyline: IPolyline
}

export interface IPolyline {
    encodedPolyline: string;
}

export interface ILeg {
    startLocation: IStartLocation;
    endLocation: IEndLocation;
}

export interface IStartLocation {
    latLng: ICoordinates
}

export interface IEndLocation {
    latLng: ICoordinates
}

export type TLatitude =  number

export type TLongitude = number