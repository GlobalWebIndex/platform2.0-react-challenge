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
            <div id="tailwind" className="bg-gray-50 dark:bg-black/95 text-gray-900 dark:text-gray-300 w-full min-h-screen">
                <Header />
                <main>
                    <div className="w-full flex-1 py-[60px] md:py-[120px]">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>

            {
                (loading) && 
                <div className="fixed w-screen h-screen bg-white/90 dark:bg-black/90 flex items-center justify-center">
                    <Image src="/icons/loader.png" width={48} height={48} loading="eager" />
                </div>
            }
        </div>
    )
};