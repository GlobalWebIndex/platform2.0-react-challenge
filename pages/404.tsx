import { Button } from "components/elements/Button";
import useTranslation from "next-translate/useTranslation";

const NotFoundPage = () => {
    const { t } = useTranslation("404");
    
    return (
        <>
            <div className="container mx-auto justify-center">
                <h1 className="text-3xl mb-4">404</h1>
                <p>{t("title")}</p>

                <Button className="mt-8" link={{href: "/", label: t("button")}} />
            </div>
        </>
    )
};

export default NotFoundPage;