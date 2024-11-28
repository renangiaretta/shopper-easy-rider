import type { Metadata } from "next";
import Header from "@/components/Header";
import { StoreWrapper } from "@/store/StoreWrapper";
import Footer from "@/components/Footer";
import './../../scss/main.sass'


export const metadata: Metadata = {
    title: "Easy Rider",
    description: "O melhor está por vir. Aperte o cinto!",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreWrapper>
            {children}
        </StoreWrapper>
    );
}
