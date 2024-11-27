import type { Metadata } from "next";
import styles from './styles.module.sass'
import Header from "@/components/Header";
import './../scss/main.sass'
import { StoreWrapper } from "@/store/StoreWrapper";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <html lang="pt-br">
      <body>
        <StoreWrapper>
          <Header />
          <ToastContainer />
            {children}
          <Footer />
        </StoreWrapper>
      </body>
    </html >
  );
}
