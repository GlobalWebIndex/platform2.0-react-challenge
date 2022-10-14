import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";
import { LayoutProps } from "interfaces/layout/Layout";
import { AppContext } from 'context/AppProvider';
import { ContextProps } from 'interfaces/context/Context';
import { useContext } from 'react';

export const Layout = ({ children }: LayoutProps) => {
    const { darkMode } = useContext<ContextProps>(AppContext);

    return (
        <div className={`${(darkMode === true) && "dark"} flex w-full font-noto-serif-jp`}>
            <div className="bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-300 w-full min-h-screen">
                <Header />
                <main className="relative">
                    <div id="nprogress-placeholder" className="absolute top-[60px] md:top-[80px] h-[1px] opacity-30"></div>
                    <div className="w-full flex-1 py-[60px] md:py-[120px]">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
};