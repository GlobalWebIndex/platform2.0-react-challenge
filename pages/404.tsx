import useTranslation from "next-translate/useTranslation";

const NotFoundPage = () => {
    const { t } = useTranslation("404");
    
    return (
        <>
            <div className="container mx-auto flex justify-center min-h-screen">
                <h1 className="text-3xl mt-10">{t("title")}</h1>
            </div>
        </>
    )
};

export default NotFoundPage;