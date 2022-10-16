import { BreedPopup } from "components/elements/popup/BreedPopup";
import { Favorite } from "components/elements/Favorite";
import { constants } from "configuration/constants";
import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { PageData } from "interfaces/general/PageData";
import { FavoritesList } from "interfaces/pages/Favorites";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

const Favorites = ({ data }: PageData<FavoritesList>) => {
    const [breed, setBreed] = useState<null | undefined | string | string[]>(null);
    const { t } = useTranslation();
    const router = useRouter();

    //clear popup and data
    const handleClosePopup = () => {
        router.push("/favorites", "/favorites", { shallow: true });
    };

    //check if route contains 'breed' query, and pass to modal
    useEffect(() => {
        const { breed } = router.query;
        setBreed(breed);
    }, [router.query]);

    return (
        <>
            <div className="container mx-auto md:my-12">
                <section className="sm:border-b-[1px] sm:border-b-gray-300 sm:dark:border-b-gray-800 mb-12 px-4 py-4">
                    <h1 className="text-3xl mb-4">{t("favorites:title")}</h1>
                    <p className="max-w-[800px]">{t("favorites:description")}</p>
                </section>

                {
                    (data?.length > 0) ?
                        <section className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 md:gap-8">
                            {
                                data.map((favorite) => {
                                    return (
                                        (favorite?.image?.url) &&
                                        <article className="shadow hover:cursor-pointer aspect-square w-full relative overflow-hidden" key={favorite.id}>
                                            <Favorite imageId={String(favorite?.image.id)} />
                                            <Link as={`/breed/${String(favorite?.image.id)}`} href={`?breed=${String(favorite?.image.id)}`} shallow passHref>
                                                <a>
                                                    <Image placeholder="blur" blurDataURL={favorite.image.url} loading="lazy" className="hover:opacity-60 transition-opacity" layout="fill" objectFit="cover" src={favorite.image.url} alt={favorite.image_id} />
                                                </a>
                                            </Link>
                                        </article>
                                    )
                                })
                            }
                        </section> :
                        <section>
                            <h2 className="text-2xl mb-4">{t("index:nocatsfound")}</h2>
                            <p className="text-xl">{t("favorites:pleaseadd")}</p>
                        </section>
                }
            </div>

            <BreedPopup name={breed} onClose={handleClosePopup} />
        </>
    )
};

export default Favorites;
export const getServerSideProps = async () => {
    return fetchData({ endpoint: endpoints.favorite, method: "get", serverSideProp: "data", apikey: constants.apikey });
};