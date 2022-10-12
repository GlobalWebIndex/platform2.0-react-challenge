import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

const Home: NextPage = () => {
    const { t } = useTranslation("common");

    return (
        <div className="w-full h-screen pointer-events-none flex items-center justify-center">
            <h1 className="text-8xl">{t("greeting")}</h1>
        </div>
    )
}

export default Home
