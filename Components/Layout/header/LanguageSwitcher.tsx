import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { LanguageSwitcherProps } from "interfaces/layout/LanguageSwitcher";
import { setCookie } from "cookies-next";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export const LanguageSwitcher = ({ showLanguages, setShowLanguages }: LanguageSwitcherProps) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    //save change to language to cookie
    const handleLanguageChange = (locale: string) => {
        setCookie("language", locale);
    };

    return (
        <div className="flex relative">
            <div>
                <GlobeEuropeAfricaIcon onClick={() => setShowLanguages(!showLanguages)} className="cursor-pointer hover:opacity-80 transition-opacity mr-4" width={24} height={24} />
            </div>
            {
                (typeof router?.locales !== "undefined" && Array.isArray(router?.locales) && showLanguages) &&
                <div className={`absolute left-[40px] whitespace-nowrap border-l-[1px] dark:border-l-gray-700 border-l-gray-400 pl-4 ${(showLanguages) && "w-screen md:w-[200px]"}`}>
                    {
                        router.locales.map((locale, index: number) => {
                            return (
                                (locale !== router.locale) &&
                                <Link scroll={false} href={router.asPath} locale={locale} passHref key={`${locale}-${index}`}>
                                    <a className="mr-4 hover:opacity-80" href="#" onClick={() => handleLanguageChange(locale)}>{t(locale)}</a>
                                </Link>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
};