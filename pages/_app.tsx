import { Layout } from 'components/layout/Layout';
import { AppProps } from 'next/app';
import { AppProvider } from 'context/AppProvider';
import Meta from 'components/layout/meta/Meta';
import '../styles/globals.css';

const CatLover = ({ Component, pageProps }: AppProps) => {
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
