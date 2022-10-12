import { ContextProps } from "interfaces/context/Context";
import { WithChildrenProps } from "interfaces/general/WithChildren";
import { createContext, useState } from "react";

export const AppContext = createContext<ContextProps>({});
export const AppProvider = ({ children }: WithChildrenProps) => {
    const [loading, setLoading] = useState(false);

    return (
        <AppContext.Provider value={{ loading, setLoading }}>
            {children}
        </AppContext.Provider>
    )
};