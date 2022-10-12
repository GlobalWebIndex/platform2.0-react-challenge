import { FetchDataProps, FetchProps } from "interfaces/helpers/FetchData";

export const fetchData: FetchDataProps = async ({method = "get", locale = "el-GR", accessToken = false, endpoint, data, serverSideProp, onStart, onEnd, customConfiguration}: FetchProps) => {    
    //configuration object - can be overriden by the prop
    const config = (customConfiguration) ? customConfiguration : {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept-Language": locale,
            ...((accessToken) && { "Authorization": `Bearer ${accessToken}` })
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

        //the user is not authorized, redirect to logout
        if(response?.status !== 200) {
            return { 
                redirect: {
                    destination: '/error',
                    data: response,
                    permanent: false
                } 
            }
        }

        //call the callback function, if provided
        if(typeof onEnd === "function") 
            onEnd(data);

        //return the response, server side, or client side, based on prop
        return (serverSideProp) ? {
            props: {
                [serverSideProp]: data || {}
            }
        }: data
    }
    catch (error: any | ErrorEvent) {
        //call the callback function, if provided
        if(typeof onEnd === "function") 
            onEnd(error);
        
        //return the object, server side, or client side, based on prop
        return (serverSideProp) ? {
            props: {
                [serverSideProp]: error || {}
            }
        }: error;
    }
};
