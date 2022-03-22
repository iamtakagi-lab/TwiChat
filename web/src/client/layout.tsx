import React from "react";
import { useMemo } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export const Layout: React.FC<{children}> = ({ children }) => (
    <>
        <Header/>
            {children}
        <Footer/>
    </>
)