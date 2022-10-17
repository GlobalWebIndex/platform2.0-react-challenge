import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const Meta = () => {
    const { t } = useTranslation("common");

    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{t("title")}</title>
            <meta name="description" content={t("description")} />
            <meta name="keywords" content={t("keywords")} />
            <meta name="author" content={t("author")} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <link rel="apple-touch-icon" sizes="180x180" href="/icons/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/icons/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/icons/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/icons/favicon/favicon.ico" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-config" content="/icons/favicon/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
};

export default Meta;
