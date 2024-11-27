'use client';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from ".";


interface StoreWrapperProps {
    children: ReactNode;
}

export const StoreWrapper = ({ children }: StoreWrapperProps) => {
    return <Provider store={store}>{children}</Provider>;
};