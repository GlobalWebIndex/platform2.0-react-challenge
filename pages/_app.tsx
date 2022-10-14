import { Layout } from 'components/layout/Layout';
import { AppProps } from 'next/app';
import { AppProvider } from 'context/AppProvider';
import Meta from 'components/layout/meta/Meta';
import NextNProgress from "nextjs-progressbar";
import '../styles/globals.css';

const CatLover = ({ Component, pageProps }: AppProps) => {
    return (
        <AppProvider>
            <Meta />
            <Layout>
                <NextNProgress color="#999" height={1} showOnShallow={false} options={{showSpinner: false, parent: '#nprogress-placeholder'}}/>
                <Component {...pageProps} />   
            </Layout>
        </AppProvider>
        
    )
};

export default CatLover;
