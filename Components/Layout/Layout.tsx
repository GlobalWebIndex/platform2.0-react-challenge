import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";
import { Loader } from "components/layout/Loader";
import { LayoutProps } from "interfaces/layout/Layout";
import { AppContext } from 'context/AppProvider';
import { ContextProps } from 'interfaces/context/Context';
import { useContext } from 'react';

export const Layout = ({ children }: LayoutProps) => {
    const { darkMode } = useContext<ContextProps>(AppContext);

    return (
        <div className={`${(darkMode === true) && "dark"} flex h-screen w-full`}>
            <div className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-100 w-full h-full">
                <Header />
                <main className="w-full flex-1">
                    {children}
                </main>
                <Footer />
                <Loader />
            </div>
        </div>
    )
};