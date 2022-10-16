import { BreedPopupProps } from "interfaces/elements/popup/BreedPopup";
import { Popup } from "components/elements/popup/Popup";
import { useEffect, useState } from "react";
import { CatImage } from "interfaces/pages/Index";
import { fetchData } from "helpers/net/fetchData";
import { endpoints } from "configuration/endpoints";
import { Button } from "components/elements/Button";
import { Favorite } from "components/elements/Favorite";
import { Description } from "components/elements/Description";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export const BreedPopup = ({ name, onClose }: BreedPopupProps) => {
    const [data, setData] = useState<CatImage | null>(null);
    const { t } = useTranslation("breed");

    //on name change, fetch data and update UI
    useEffect(() => {
        const getData = async () => {
            const breedDetails: CatImage = await fetchData({ endpoint: endpoints.getImage + name, method: "get" });
            setData(breedDetails);
        };

        if (name)
            getData();
    }, [name]);

    //handle popup close; call provided callback, and remove data
    const handleClosePopup = () => {
        setData(null);

        if (typeof onClose === "function")
            onClose();
    };

    return (
        <>
            {
                (name) &&
                <Popup onClose={handleClosePopup}>
                    {
                        (data) ?
                            <div className={`overflow-y-auto h-full md:grid ${(data?.breeds?.length > 0) ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                                <div className={`relative ${(data?.breeds?.length > 0) && "h-[300px] md:h-auto"} h-full`}>
                                    <Image objectFit="cover" layout="fill" src={data.url} loading="lazy" blurDataURL={data.url} alt={data.id} />
                                    <Favorite imageId={data.id} />
                                </div>
                                {
                                    (data?.breeds?.length > 0) &&
                                    <div className="p-6 md:p-12">
                                        <h3 className="text-2xl md:text-4xl mb-4 md:mb-8">{t("index:breeds")}</h3>
                                        <section className="border-t-[1px] pt-4 md:pt-8 border-t-gray-300 dark:border-t-gray-800">
                                            {
                                                data?.breeds?.map((breed) => {
                                                    return (
                                                        <article className="text-base" key={breed.id}>
                                                            <h3 className="text-xl mb-4"><Link href={`/breeds/${breed.id}`}>{breed.name}</Link></h3>
                                                            <Description description={breed.description} alt_names={breed.alt_names} life_span={breed.life_span} temperament={breed.temperament} />
                                                            <Link href={`/details/${breed.id}`}><Button className="mt-8" link={{ label: t("index:showmore"), href: "" }} /></Link>
                                                        </article>
                                                    )
                                                })
                                            }
                                        </section>
                                    </div>
                                }
                            </div> :
                            <div className="h-full flex items-center justify-center"><Image src="/icons/loader.png" width={48} height={48} loading="eager" alt="loader" /></div>
                    }
                </Popup>
            }
        </>
    )
};