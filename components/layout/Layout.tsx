import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";
import { LayoutProps } from "interfaces/layout/Layout";
import { AppContext } from 'context/AppProvider';
import { ContextProps } from 'interfaces/context/Context';
import { useContext } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";

export const Layout = ({ children }: LayoutProps) => {
    const { darkMode, loading } = useContext<ContextProps>(AppContext);
    const router = useRouter();

    return (
        <div className={`${(darkMode === true) && "dark"} flex w-full ${(router.locale === "jp") ? "font-noto-serif-jp" : "font-roboto"}`}>
            <div id="tailwind" className="bg-gradient-to-br from-gray-100 to-white dark:from-black/95 dark:to-black  text-gray-900 dark:text-gray-300 w-full min-h-screen">
                <Header />
                <main>
                    <div className="w-full flex-1 pt-[60px] md:pt-[120px]">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>

            {
                (loading) &&
                <div className="fixed z-20 w-screen h-screen bg-white/90 dark:bg-black/90 flex items-center justify-center">
                    <Image src="/icons/loader.png" width={48} height={48} loading="eager" alt="loader" />
                </div>
            }
        </div>
    )
};