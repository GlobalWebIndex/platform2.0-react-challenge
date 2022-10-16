import { DescriptionProps } from "interfaces/elements/Description";
import useTranslation from "next-translate/useTranslation";

export const Description = ({ alt_names, description, life_span, temperament }: DescriptionProps) => {
    const { t } = useTranslation("breed");

    return (
        <>
            <p className="mb-8">{description}</p>

            {
                (alt_names) &&
                <div className="mb-4 text-sm text-gray-400">
                    <p>{t("alsoknownas")}</p>
                    <p>{alt_names}</p>
                </div>
            }
            {
                (temperament) &&
                <div className="mb-4 text-sm text-gray-400">
                    <p>{t("temperament")}</p>
                    <p>{temperament}</p>
                </div>
            }
            {
                (life_span) &&
                <div className="mb-4 text-sm text-gray-400">
                    <p>{t("lifespan")}</p>
                    <p>{life_span} {t("years")}</p>
                </div>
            }
        </>
    )
};