import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { AppContext } from "context/AppProvider";
import { setCookie } from "cookies-next";
import { ContextProps } from "interfaces/context/Context";
import { useContext } from "react";

export const ThemeSwitcher = () => {
    const { darkMode, setDarkMode } = useContext<ContextProps>(AppContext);

    //toggle and save to cookies
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        setCookie("darkmode", !darkMode);
    };

    return (
        <div>
            {
                (darkMode) ?
                    <SunIcon onClick={toggleTheme} className="cursor-pointer hover:opacity-80 transition-opacity" width={24} height={24} /> :
                    <MoonIcon onClick={toggleTheme} className="cursor-pointer hover:opacity-80 transition-opacity" width={24} height={24} />
            }
        </div>
    )
};