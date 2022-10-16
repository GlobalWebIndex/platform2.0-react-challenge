import { LanguageSwitcher } from 'components/layout/header/LanguageSwitcher';
import { Menu } from 'components/layout/header/Menu';
import { ThemeSwitcher } from 'components/layout/header/ThemeSwitcher';
import { menuData } from "configuration/dummy";
import { useState } from 'react';

export const Header = () => {
    const [showLanguages, setShowLanguages] = useState(false);

    return (
        <>
            <header className="fixed h-[60px] md:h-[80px] items-center w-full flex py-4 px-4 md:px-8 justify-between z-20 backdrop-blur-lg bg-white/80 dark:bg-black/80">
                <LanguageSwitcher {...{ showLanguages }} {...{ setShowLanguages }} />
                <Menu items={menuData.items} {...{ showLanguages }} />
                <ThemeSwitcher />
                <div className="absolute bottom-0 left-0">
                    <div id="nprogress-placeholder" className="bg-gray-200 dark:bg-gray-800 bottom-0 w-screen h-[1px] overflow-hidden opacity-30" />
                </div>
            </header>
        </>
    )
};