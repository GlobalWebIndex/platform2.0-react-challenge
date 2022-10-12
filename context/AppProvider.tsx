import { ContextProps } from "interfaces/context/Context";
import { WithChildrenProps } from "interfaces/general/WithChildren";
import { createContext, useState } from "react";

//initialize context
const initialContext = {
    loading: false,
    darkMode: true,
    setLoading: () => {},
    setDarkMode: () => {}
};

//create the context
export const AppContext = createContext<ContextProps>(initialContext);

//export the provider
export const AppProvider = ({ children }: WithChildrenProps) => {
    const [loading, setLoading] = useState(initialContext.loading);
    const [darkMode, setDarkMode] = useState(initialContext.darkMode);

    return (
        <AppContext.Provider value={{ loading, setLoading, darkMode, setDarkMode }}>
            {children}
        </AppContext.Provider>
    )
};