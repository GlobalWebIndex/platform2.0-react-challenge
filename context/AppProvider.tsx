import { ContextProps } from "Interfaces/Context/Context";
import { WithChildrenProps } from "Interfaces/General/WithChildren";
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