import { AppContext } from "context/AppProvider";
import { ContextProps } from "interfaces/context/Context";
import { useContext } from "react";
import Image from "next/image";

export const Loader = () => {
    const { loading } = useContext<ContextProps>(AppContext);

    return (
        <>
            {
                (loading) && 
                <div className={`fixed inset-0 flex justify-center items-center`}>
                    <Image width={64} height={64} src="/icons/loader.png" />
                </div>
            }
        </>
    )
};