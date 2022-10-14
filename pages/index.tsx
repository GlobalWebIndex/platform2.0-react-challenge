import { Button } from "components/elements/Button";
import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { PageData } from "interfaces/general/PageData";
import { CatList } from "interfaces/pages/Index";
import { useContext, useEffect, useState } from "react";
import { ContextProps } from "interfaces/context/Context";
import { AppContext } from "context/AppProvider";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

const Cats = ({ data }: PageData<CatList>) => {
    const { t } = useTranslation("common");
    const [cats, setCats] = useState(data);
    const [page, setPage] = useState(0);
    const { setLoading } = useContext<ContextProps>(AppContext);

    const loadMoreButton = {
        label: t("loadmore"), 
        href: ""
    };

    //when page is updated, fetch new data, and append to state, updating the UI
    useEffect(() => {
        const loadMoreCats = async () => {
            const data = await fetchData({endpoint: `${endpoints.getAllCats}?order=RANDOM&limit=10&size=thumb&page=${page}`, onStart: () => setLoading(true), onEnd:  () => setLoading(false), method: "get"});    
            setCats([...cats, ...data]);
        };

        if(page > 0)
            loadMoreCats();
    }, [page]);

    return (
        <>
            <div className="mx-auto">
                <div className="sm:columns-2 md:columns-3 lg:columns-4 gap-8">
                    {
                        cats.map((cat) => {
                            return (
                                (cat?.url) &&
                                <div className="mb-8 shadow hover:cursor-pointer" key={cat.id}>
                                    <Image 
                                        placeholder="blur" 
                                        blurDataURL={cat.url}
                                        className="hover:opacity-60 transition-opacity"
                                        layout="responsive" 
                                        objectFit="cover" 
                                        width={cat.width} 
                                        height={cat.height} 
                                        src={cat.url} 
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="fixed w-screen bottom-4 md:bottom-12 flex justify-center">
                <Button link={loadMoreButton} onClick={() => setPage(page + 1)} />
            </div>
        </>
    )
};

export default Cats;

export const getServerSideProps = async () => {
    return fetchData({endpoint: `${endpoints.getAllCats}?order=RANDOM&limit=10&size=thumb&page=0`, method: "get", serverSideProp: "data"});
};