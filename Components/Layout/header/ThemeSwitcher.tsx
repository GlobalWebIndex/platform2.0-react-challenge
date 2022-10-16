import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { AppContext } from "context/AppProvider";
import { ContextProps } from "interfaces/context/Context";
import { useContext } from "react";

export const ThemeSwitcher = () => {
    const { darkMode, setDarkMode } = useContext<ContextProps>(AppContext);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
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