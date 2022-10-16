import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { Breed, BreedsList } from "interfaces/pages/Breeds";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DetailsPopup } from "components/elements/popup/DetailsPopup";
import Link from "next/link";

const Breeds = ({ data }: BreedsList) => {
    const [details, setDetails] = useState<Breed | undefined>(undefined);
    const router = useRouter();
    const azList = {};

    //get all breeds, then create an alphabetic index
    data.forEach((breed) => {
        const firstLetter = breed.name[0];

        if (typeof azList[firstLetter]?.items === "undefined")
            azList[firstLetter] = { items: [breed] };
        else
            azList[firstLetter]?.items.push(breed);
    });

    //clear popup and data
    const handleClosePopup = () => {
        router.push("/breeds", "/breeds", { shallow: true });
    };

    //check if route contains 'details' query, and pass to modal
    useEffect(() => {
        const { details } = router.query;
        const name = Array.isArray(details) ? details?.[0] : details;

        setDetails(data.find((item) => item.id === name));
    }, [router.query]);

    return (
        <>
            <section className="container px-4 py-4 mx-auto md:my-12">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                    {
                        Object.keys(azList).map((azItem, index: number) => {
                            return (
                                <article className="mb-8" key={azItem + index}>
                                    <h3 className="text-lg border-b-[1px] border-b-gray-300 dark:border-b-gray-800 mb-8 pb-4">{azItem}</h3>
                                    {
                                        azList[azItem].items.map((breed: Breed) => {
                                            return (
                                                <div className="my-2" key={breed.id}>
                                                    <Link as={`/details/${breed.id}`} href={`?details=${breed.id}`} shallow passHref>
                                                        <a className="hover:opacity-80 transition-opacity">{breed.name}</a>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </article>
                            )
                        })
                    }
                </div>
            </section>

            <DetailsPopup {...{ details }} onClose={handleClosePopup} />
        </>
    )
};

export default Breeds;
export const getServerSideProps = async () => {
    return fetchData({ endpoint: `${endpoints.getAllBreeds}`, method: "get", serverSideProp: "data" });
};
