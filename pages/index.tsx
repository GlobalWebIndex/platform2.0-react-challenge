import type { NextPage } from 'next';
import { useContext } from 'react';
import { ContextProps } from 'interfaces/Context/Context';
import { AppContext } from 'context/AppProvider';
import useTranslation from 'next-translate/useTranslation';

const Home: NextPage = () => {
    const { t } = useTranslation("common");
    const { loading } = useContext<ContextProps>(AppContext);

    return (
        <>
            <h1 className="text-3xl font-bold underline">{t("greeting")}</h1>
            <p>{(loading) && t("loading")}</p>
        </>
    )
}

export default Home
