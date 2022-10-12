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
        <div className={`${(darkMode === true) && "dark"} flex w-full font-noto-serif-jp`}>
            <div className="bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-400 w-full h-full">
                <Header />
                <main className="w-full flex-1 py-[120px]">
                    {children}
                </main>
                <Footer />
                <Loader />
            </div>
        </div>
    )
};