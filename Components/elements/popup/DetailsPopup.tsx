import { DetailsPopupProps } from "interfaces/elements/DetailsPopup";
import { Popup } from "components/elements/popup/Popup";
import { useEffect, useState } from "react";
import { fetchData } from "helpers/net/fetchData";
import { endpoints } from "configuration/endpoints";
import { constants } from "configuration/constants";
import { CatImage } from "interfaces/pages/Index";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

export const DetailsPopup = ({ details, onClose }: DetailsPopupProps) => {
    const [images, setImages] = useState<CatImage[] | undefined>();
    const { t } = useTranslation("breed");

    //handle popup close; call provided callback, and remove data
    const handleClosePopup = () => {
        setImages(undefined);

        if (typeof onClose === "function")
            onClose();
    };

    //get images from that breed and update UI
    useEffect(() => {
        const getImages = async () => {
            if(details){
                const data = await fetchData({ endpoint: `${endpoints.getAllCats}?breed_id=${details.id}&size=${constants.size}&limit=4` + name, method: "get", apikey: constants.apikey });
                setImages(data);
                console.log(data);
            }
        };

        getImages();
    }, [details]);

    return (
        <>
            {
                (details) &&
                <Popup onClose={handleClosePopup}>
                    <div className={`overflow-y-auto h-full"}`}>
                        <div className="p-6 md:p-12">
                            <h3 className="text-2xl md:text-4xl mb-4 md:mb-8">{details.name}</h3>
                            <section className="border-t-[1px] pt-4 md:pt-8 border-t-gray-300 dark:border-t-gray-800">
                                <article className="text-base" key={details.id}>
                                    {
                                        (details.alt_names) &&
                                        <div className="mb-4 text-sm text-gray-400">
                                            <p>{t("alsoknownas")}</p>
                                            <p>{details.alt_names}</p>
                                        </div>
                                    }
                                    {
                                        (details.temperament) &&
                                        <div className="mb-8 text-sm text-gray-400">
                                            <p>{t("temperament")}</p>
                                            <p>{details.temperament}</p>
                                        </div>
                                    }
                                    {
                                        (details.life_span) &&
                                        <div className="mb-4 text-sm text-gray-400">
                                            <p>{t("lifespan")}</p>
                                            <p>{details.life_span} {t("years")}</p>
                                        </div>
                                    }

                                    <p>{details.description}</p>
                                </article>
                            </section>

                            <section className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {
                                    (images) &&
                                    images.map((image) => {
                                        return (
                                            <article key={image.id} className="shadow hover:cursor-pointer aspect-square w-full relative overflow-hidden">
                                                <Link href={`/breed/${image.id}`}>
                                                    <Image placeholder="blur" src={image.url} layout="fill" objectFit="cover" blurDataURL={image.url} loading="lazy" />
                                                </Link>
                                            </article>
                                        )
                                    })
                                }
                            </section>
                        </div>
                    </div>
                </Popup>
            }
        </>
    )
};