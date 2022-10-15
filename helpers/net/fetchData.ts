import { FetchDataProps, FetchProps } from "interfaces/helpers/FetchData";

export const fetchData: FetchDataProps = async ({method = "get", locale = "el-GR", accessToken = false, endpoint, data, serverSideProp, apikey, onStart, onEnd, customConfiguration}: FetchProps) => {    
    const clientSide = (typeof window);

    //configuration object - can be overriden by the prop
    const config = (customConfiguration) ? customConfiguration : {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept-Language": locale,
            ...((accessToken) && { "Authorization": `Bearer ${accessToken}` }),
            ...((apikey) && { "x-api-key": apikey })
        },
        ...((data) && { body: JSON.stringify(data) }),
    };

    try {
        //call the callback function, if provided
        if(typeof onStart === "function") 
            onStart();

        const response = await fetch(endpoint, config);
        const contentType = response.headers.get("content-type");
        const isJSON = contentType && contentType.indexOf("application/json") !== -1;
        const data = (isJSON) ? await response.json() : response;

        //throw error on every response but a successful one
        if(response?.status !== 200) {
            throw Error(response?.status.toString())
        }

        //call the callback function, if provided
        if(typeof onEnd === "function") 
            onEnd(data);

        //return the response, server side, or client side, based on prop
        return (serverSideProp) ? {
            props: {
                [serverSideProp]: data || {}
            }
        } : data
    }
    catch (error: any | ErrorEvent) {      
        //call the callback function, if provided
        if(typeof onEnd === "function") 
            onEnd(error);

        //redirect to error page
        if (clientSide)
            window.location.href = `/error/${error || ""}`;
        else
            return {
                redirect: {
                    destination: `/error/${error || ""}`,
                    permanent: false
                } 
            }
    }
};
