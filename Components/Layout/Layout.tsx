import { Footer } from "components/Layout/Footer";
import { Header } from "components/Layout/Header";
import { LayoutProps } from "interfaces/Layout/Layout";

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