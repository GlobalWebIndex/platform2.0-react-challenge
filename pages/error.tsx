import { ErrorProps } from "interfaces/pages/Error";
import useTranslation from "next-translate/useTranslation";

const ErrorPage = ({ status }: ErrorProps) => {
    const { t } = useTranslation("common");

    return (
        <>
            <div className="container mx-auto justify-center">
                <h1 className="text-3xl mb-4">{`Error ${status || ""}`}</h1>
                <p>{t("error")}</p>
            </div>
        </>
    )
};

export default ErrorPage;