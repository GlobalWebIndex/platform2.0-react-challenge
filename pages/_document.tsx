import { Html, Head, Main, NextScript } from 'next/document'

const CatLoverDocument = () => {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <body className="overflow-x-hidden">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
};

export default CatLoverDocument;