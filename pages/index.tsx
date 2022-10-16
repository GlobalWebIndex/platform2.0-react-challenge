import { Button } from "components/elements/Button";
import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { PageData } from "interfaces/general/PageData";
import { CatList } from "interfaces/pages/Index";
import { useContext, useEffect, useState } from "react";
import { ContextProps } from "interfaces/context/Context";
import { AppContext } from "context/AppProvider";
import { useRouter } from "next/router";
import { constants } from "configuration/constants";
import { BreedPopup } from "components/elements/popup/BreedPopup";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { Favorite } from "components/elements/Favorite";

const Cats = ({ data }: PageData<CatList>) => {
    const { t } = useTranslation();
    const [breed, setBreed] = useState<null | undefined | string | string[]>(null);
    const [cats, setCats] = useState(data);
    const [page, setPage] = useState(0);
    const { loading, setLoading } = useContext<ContextProps>(AppContext);
    const router = useRouter();

    //when page is updated, fetch new data, and append to state, updating the UI
    useEffect(() => {
        const loadMoreCats = async () => {
            const data = await fetchData({ endpoint: `${endpoints.getAllCats}?order=${constants.order}&limit=${constants.limit}&size=${constants.size}&page=${page}`, onEnd: () => setLoading(false), method: "get" });
            setCats([...data, ...cats]);
        };

        if (page > 0)
            loadMoreCats();
    }, [page]);

    //increase page, therefore triggering call, and blocking multiple presses
    const handleAddMoreCats = () => {
        setPage(page + 1);
        setLoading(true);
    };

    //clear popup and data
    const handleClosePopup = () => {
        router.push("/", "/", { shallow: true });
    };

    //check if route contains 'breed' query, and pass to modal
    useEffect(() => {
        const { breed } = router.query;
        setBreed(breed);
    }, [router.query]);

    return (
        <>
            <div className="container mx-auto md:my-12">
                <div className="sm:border-b-[1px] sm:border-b-gray-300 sm:dark:border-b-gray-800 mb-12 px-4 py-4">
                    <h1 className="text-3xl mb-4">{t("index:title")}</h1>
                    <p className="max-w-[800px]">{t("index:description")}</p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 md:gap-8">
                    {
                        (cats?.length > 0) ?
                            cats.map((cat) => {
                                return (
                                    (cat?.url) &&
                                    <div className="aspect-square shadow hover:cursor-pointer w-full relative" key={cat.id}>
                                        <Favorite imageId={cat.id} />
                                        <Link as={`/breed/${cat.id}`} href={`?breed=${cat.id}`} shallow passHref>
                                            <a>
                                                <Image placeholder="blur" blurDataURL={cat.url} loading="lazy" className="hover:opacity-60 transition-opacity" layout="fill" objectFit="cover" src={cat.url} alt={cat.id} />
                                            </a>
                                        </Link>
                                    </div>
                                )
                            }) :
                            <div>
                                <h2 className="text-2xl mb-4">{t("index:nocatsfound")}</h2>
                                <p className="text-xl">{t("common:error")}</p>
                            </div>
                    }
                </div>
            </div>
            <div className="fixed w-screen bottom-4 md:bottom-12 flex justify-center z-20">
                <Button disabled={loading} link={{ label: t("common:loadmore"), href: "" }} onClick={handleAddMoreCats} />
            </div>

            <BreedPopup name={breed} onClose={handleClosePopup} />
        </>
    )
};

export default Cats;
export const getServerSideProps = async () => {
    return fetchData({ endpoint: `${endpoints.getAllCats}?order=${constants.order}&limit=${constants.limit}&size=${constants.size}&page=0`, method: "get", serverSideProp: "data" });
};