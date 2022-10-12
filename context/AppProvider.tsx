import { ContextProps } from "interfaces/Context/Context";
import { WithChildrenProps } from "interfaces/General/WithChildren";
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