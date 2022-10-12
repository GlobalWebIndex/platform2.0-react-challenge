import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ContextProps } from 'interfaces/context/Context';
import { AppContext } from 'context/AppProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

export const Header = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { darkMode, setDarkMode } = useContext<ContextProps>(AppContext);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <header className="fixed w-full flex p-4 justify-between">
            <div>
                {
                    (typeof router?.locales !== "undefined" && Array.isArray(router?.locales)) && 
                    router.locales.map((locale, index: number) => {
                        return (
                            (locale !== router.locale) &&
                            <Link href={router.asPath} locale={locale} passHref key={`${locale}-${index}`}>
                                <a className="block hover:opacity-80" href="#">{t(locale)}</a>
                            </Link>
                        )
                    })
                }
            </div>

            <div>
                {
                    (darkMode) ? 
                    <SunIcon onClick={handleThemeChange} className="cursor-pointer hover:opacity-80" width={24} height={24} /> : 
                    <MoonIcon onClick={handleThemeChange} className="cursor-pointer hover:opacity-80" width={24} height={24} />
                }
            </div>
        </header>
    )
};