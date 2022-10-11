import { Footer } from "Components/Layout/Footer";
import { Header } from "Components/Layout/Header";
import { LayoutProps } from "Interfaces/Layout/Layout";

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
};