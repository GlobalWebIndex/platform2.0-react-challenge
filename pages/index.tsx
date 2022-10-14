import { Button } from "components/elements/Button";
import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { PageData } from "interfaces/general/PageData";
import { CatImage, CatList } from "interfaces/pages/Index";
import { useContext, useEffect, useState } from "react";
import { ContextProps } from "interfaces/context/Context";
import { AppContext } from "context/AppProvider";
import { useRouter } from "next/router";
import { Popup } from "components/elements/Popup";
import { constants } from "configuration/constants";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

const Cats = ({ data }: PageData<CatList>) => {
    const { t } = useTranslation();
    const [cats, setCats] = useState(data);
    const [page, setPage] = useState(0);
    const [popupMarkup, setPopupMarkup] = useState<JSX.Element | null>(null);
    const { loading, setLoading } = useContext<ContextProps>(AppContext);
    const router = useRouter();

    //clear popup and data
    const handleClosePopup = () => {
        router.push("/", "/", {shallow: true});
        setPopupMarkup(null);
    };

    //when page is updated, fetch new data, and append to state, updating the UI
    useEffect(() => {
        const loadMoreCats = async () => {
            const data = await fetchData({endpoint: `${endpoints.getAllCats}?order=${constants.order}&limit=${constants.limit}&size=${constants.size}&page=${page}`, onStart: () => setLoading(true), onEnd:  () => setLoading(false), method: "get"});    
            setCats([...data, ...cats]);
        };

        if(page > 0)
            loadMoreCats();
    }, [page]);

    //check if route contains 'cat' query, and show modal
    useEffect(() => {
        const { cat } = router.query;

        const showPopup = async () => {
            //set a loader, while we wait for data
            setPopupMarkup(<div className="h-full flex items-center justify-center"><Image src="/icons/loader.png" width={48} height={48} loading="eager" /></div>);

            const catDetails: CatImage = await fetchData({endpoint: endpoints.getImage + cat, method: "get"});
            const hasBreedInformation = catDetails?.breeds?.length > 0;

            const markup = (
                <div className={`h-full md:grid ${(hasBreedInformation) ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                    <div className="relative h-[300px] md:h-auto">
                        <Image objectFit="cover" layout="fill" src={catDetails.url} height={catDetails.height} width={catDetails.width} loading="lazy" blurDataURL={catDetails.url} />
                    </div>
                    {
                        (hasBreedInformation) && 
                        <div className="p-6 md:p-12">
                            <h3 className="text-2xl md:text-4xl mb-4 md:mb-8">{t("index:breeds")}</h3>
                            <ul className="border-t-[1px] pt-4 md:pt-8 border-t-gray-300 dark:border-t-gray-800">
                                {
                                    catDetails?.breeds?.map((breed) => {
                                        return (
                                            <li className="text-lg" key={breed.id}><Link href={`/breeds/${breed.id}`}>{breed.name}</Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                </div>
            );
            setPopupMarkup(markup);
        };

        if(cat) 
            showPopup();
    }, [router.query]);

    return (
        <>
            <div className="container mx-auto">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        (cats?.length > 0) ?
                            cats.map((cat) => {
                                return (
                                    (cat?.url && cat?.width && cat?.height) &&
                                    <div className="mb-8 shadow hover:cursor-pointer h-[400px] w-full relative" key={cat.id}>
                                        <Link 
                                            as={`/cat/${cat.id}`} 
                                            href={`?cat=${cat.id}`}
                                            shallow 
                                            passHref
                                        >
                                            <a>
                                                <Image 
                                                    placeholder="blur" 
                                                    blurDataURL={cat.url}
                                                    loading="lazy"
                                                    className="hover:opacity-60 transition-opacity"
                                                    layout="fill" 
                                                    objectFit="cover" 
                                                    width={cat.width} 
                                                    height={cat.height} 
                                                    src={cat.url} 
                                                />
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
            <div className="fixed w-screen bottom-4 md:bottom-12 flex justify-center">
                <Button disabled={loading} link={{label: t("common:loadmore"), href: ""}} onClick={() => setPage(page + 1)} />
            </div>

            {
                (popupMarkup) && 
                <Popup onClose={handleClosePopup}>{popupMarkup}</Popup>
            }
        </>
    )
};

export default Cats;
export const getServerSideProps = async () => {
    return fetchData({endpoint: `${endpoints.getAllCats}?order=${constants.order}&limit=${constants.limit}&size=${constants.size}&page=0`, method: "get", serverSideProp: "data"});
};