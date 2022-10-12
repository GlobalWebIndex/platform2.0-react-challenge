import { Layout } from 'components/layout/Layout';
import { AppProps } from 'next/app';
import { AppProvider } from 'context/AppProvider';
import { AppContext } from "context/AppProvider";
import { ContextProps } from "interfaces/context/Context";
import { useContext } from "react";
import Router from "next/router";
import Meta from 'components/layout/meta/Meta';
import '../styles/globals.css';

const CatLover = ({ Component, pageProps }: AppProps) => {
    const { setLoading } = useContext<ContextProps>(AppContext);

    //on route change, show loader
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));

    return (
        <AppProvider>
            <Meta />
            <Layout>
                <Component {...pageProps} />   
            </Layout>
        </AppProvider>
        
    )
}

export default CatLover;
