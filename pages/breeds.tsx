import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { Breed, BreedsList } from "interfaces/pages/Breeds";
import Link from "next/link";

const Breeds = ({ data }: BreedsList) => {
    const azList = {};

    //get all breeds, then create an alphabetic index
    data.forEach((breed) => {
        const firstLetter = breed.name[0];

        if (typeof azList[firstLetter]?.items === "undefined")
            azList[firstLetter] = { items: [breed] };
        else
            azList[firstLetter]?.items.push(breed);
    });

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
                                                    <Link href="/" passHref><a>{breed.name}</a></Link>
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
        </>
    )
};

export default Breeds;
export const getServerSideProps = async () => {
    return fetchData({ endpoint: `${endpoints.getAllBreeds}`, method: "get", serverSideProp: "data" });
};
