import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { ContextProps } from 'interfaces/context/Context';
import { AppContext } from 'context/AppProvider';
import { SunIcon, MoonIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

export const Header = () => {
    const router = useRouter();
    const [showLanguages, setShowLanguages] = useState(false);
    const { t } = useTranslation("common");
    const { darkMode, setDarkMode } = useContext<ContextProps>(AppContext);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const toggleShowLanguages = () => {
        setShowLanguages(!showLanguages);
    };

    return (
        <header className="fixed h-[80px] items-center w-full flex py-4 px-8 justify-between z-10 backdrop-blur-lg bg-white/80 dark:bg-black/80">
            <div>
                {
                    (typeof router?.locales !== "undefined" && Array.isArray(router?.locales)) &&
                    (showLanguages) ? 
                    router.locales.map((locale, index: number) => {
                        return (
                            (locale !== router.locale) &&
                            <Link href={router.asPath} locale={locale} passHref key={`${locale}-${index}`}>
                                <a className="mr-8 hover:opacity-80" onClick={toggleShowLanguages} href="#">{t(locale)}</a>
                            </Link>
                        )
                    }) : <GlobeEuropeAfricaIcon onClick={toggleShowLanguages} className="cursor-pointer hover:opacity-80 transition-opacity" width={24} height={24} />
                }
            </div>

            <div>
                {
                    (darkMode) ? 
                    <SunIcon onClick={toggleTheme} className="cursor-pointer hover:opacity-80 transition-opacity" width={24} height={24} /> : 
                    <MoonIcon onClick={toggleTheme} className="cursor-pointer hover:opacity-80 transition-opacity" width={24} height={24} />
                }
            </div>
        </header>
    )
};