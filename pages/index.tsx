import type { NextPage } from 'next';
import { useContext } from 'react';
import { ContextProps } from 'Interfaces/Context/Context';
import useTranslation from 'next-translate/useTranslation';
import { AppContext } from 'context/AppProvider';

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
