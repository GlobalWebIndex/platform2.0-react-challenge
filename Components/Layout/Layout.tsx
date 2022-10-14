import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";
import { LayoutProps } from "interfaces/layout/Layout";
import { AppContext } from 'context/AppProvider';
import { ContextProps } from 'interfaces/context/Context';
import { useContext } from 'react';
import useTranslation from "next-translate/useTranslation";

export const Layout = ({ children }: LayoutProps) => {
    const { darkMode, loading } = useContext<ContextProps>(AppContext);
    const { t } = useTranslation("common");

    return (
        <div className={`${(darkMode === true) && "dark"} flex w-full font-noto-serif-jp`}>
            <div className="bg-gray-50 text-gray-900 dark:bg-black/95 dark:text-gray-300 w-full min-h-screen">
                <Header />
                <main className="relative">
                    <div id="nprogress-placeholder" className="absolute top-[60px] md:top-[80px] h-[1px] opacity-30"></div>
                    <div className="w-full flex-1 py-[60px] md:py-[120px]">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>

            {
                (loading) && 
                <div className="fixed w-screen h-screen bg-white/90 dark:bg-black/90 flex items-center justify-center">
                    <h2>{t("loading")}</h2>
                </div>
            }
        </div>
    )
};