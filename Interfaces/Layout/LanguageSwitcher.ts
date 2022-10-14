import { Dispatch, SetStateAction } from "react";

export interface LanguageSwitcherProps {
    showLanguages: boolean, 
    setShowLanguages: Dispatch<SetStateAction<boolean>>
};