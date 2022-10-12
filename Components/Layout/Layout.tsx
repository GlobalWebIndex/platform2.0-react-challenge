import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";
import { LayoutProps } from "interfaces/layout/Layout";

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