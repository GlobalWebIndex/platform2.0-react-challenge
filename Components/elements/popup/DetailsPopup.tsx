import { DetailsPopupProps } from "interfaces/elements/popup/DetailsPopup";
import { Popup } from "components/elements/popup/Popup";
import { useEffect, useState } from "react";
import { fetchData } from "helpers/net/fetchData";
import { endpoints } from "configuration/endpoints";
import { constants } from "configuration/constants";
import { CatImage } from "interfaces/pages/Index";
import { Traits } from "components/elements/Traits";
import { Description } from "components/elements/Description";
import Image from "next/image";
import Link from "next/link";

export const DetailsPopup = ({ details, onClose }: DetailsPopupProps) => {
    const [images, setImages] = useState<CatImage[] | undefined>();

    //handle popup close; call provided callback, and remove data
    const handleClosePopup = () => {
        setImages(undefined);

        if (typeof onClose === "function")
            onClose();
    };

    //get images from that breed and update UI
    useEffect(() => {
        const getImages = async () => {
            if (details) {
                const data = await fetchData({ endpoint: `${endpoints.getAllCats}?breed_id=${details.id}&order=${constants.order}&size=${constants.size}&limit=6` + name, method: "get", apikey: constants.apikey });
                setImages(data);
            }
        };

        getImages();
    }, [details]);

    return (
        <>
            {
                (details) &&
                <Popup onClose={handleClosePopup}>
                    <div className={`overflow-y-auto h-full overflow-hidden"}`}>
                        <div className="p-6 md:p-12">
                            <h3 className="text-2xl md:text-4xl mb-4 md:mb-8">{details.name}</h3>
                            <section className="border-t-[1px] pt-4 md:pt-8 border-t-gray-300 dark:border-t-gray-800">
                                <Traits affection_level={details.affection_level} child_friendly={details.child_friendly} dog_friendly={details.dog_friendly} energy_level={details.energy_level} grooming={details.grooming} health_issues={details.health_issues} />
                                <article className="text-base" key={details.id}>
                                    <Description description={details.description} alt_names={details.alt_names} life_span={details.life_span} temperament={details.temperament} />
                                </article>
                            </section>

                            <section className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                                {
                                    (images) &&
                                    images.map((image) => {
                                        return (
                                            <article key={image.id} className="shadow hover:cursor-pointer aspect-square w-full relative overflow-hidden">
                                                <Link href={`/breed/${image.id}`} passHref>
                                                    <a>
                                                        <Image className="hover:opacity-60 transition-opacity" placeholder="blur" src={image.url} layout="fill" objectFit="cover" blurDataURL={image.url} loading="lazy" alt={image.id} />
                                                    </a>
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