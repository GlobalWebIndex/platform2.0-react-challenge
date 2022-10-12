import { Layout } from 'components/Layout/Layout';
import { AppProps } from 'next/app';
import { AppProvider } from 'context/AppProvider';
import Meta from 'components/Layout/Meta/Meta';
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
