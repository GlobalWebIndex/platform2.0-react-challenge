import { ErrorProps } from "interfaces/pages/Error";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import useTranslation from "next-translate/useTranslation";

const ErrorPage = ({ status }: ErrorProps) => {
    const { t } = useTranslation("common");

    return (
        <>
            <div className="container mx-auto justify-center">
                <h1 className="text-3xl mb-4">{status || "Error"}</h1>
                <p>{t("error")}</p>
            </div>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({query}: GetServerSidePropsContext) => {    
    return {
        props: {
            status: query.status
        }
    }
};


export default ErrorPage;