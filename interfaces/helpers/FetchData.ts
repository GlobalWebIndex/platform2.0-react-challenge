type fetchMethods = "get" | "post" | "delete" | "put";

type fetchConfigurationProps = {
    "credentials"?: "include" | undefined;
    "body"?: string | undefined;
    "method": fetchMethods;
    "headers": {
        "Authorization"?: string | undefined;
        "Content-Type": string;
        "X-Requested-With": string;
        "Accept-Language": string;
        [key: string]: any
    }
};

export type FetchDataProps = (props: FetchProps) => any;

export interface FetchProps {
    /**
    * Fetch method, get, post, delete supported
    */
    method: fetchMethods;

    /**
    * Data to send to API
    */
    data?: {
        [key: string]: any;
    };

    /**
    * Client stored user token
    */
    accessToken?: string | false;

    /**
    * Client currect locale (e.g. el-GR)
    */
    locale?: string;

    /**
    * The url of the API to call
    */
    endpoint: string;

    /**
    * The prop within the data will be stored, used in ServerSideProps; if set, a props object will be returned
    */
    serverSideProp?: string | null | undefined;

    /**
    * A callback function to be executed, on fetch start
    */
    onStart?: () => void;

    /**
    * A callback function to be executed, on fetch end
    */
    onEnd?: (responseData: Response | Error) => void;

    /**
    * Should the full screen loader be displayed?
    */
    showLoader?: boolean;

    /**
    * Api key, if needed
    */
    apikey?: string;

    /**
    * Override the entire configuration object
    */
    customConfiguration?: fetchConfigurationProps
};
