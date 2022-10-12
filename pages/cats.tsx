import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { PageData } from "interfaces/general/PageData";
import { CatList } from "interfaces/pages/cats";
import Image from "next/image";

const Cats = ({ data }: PageData<CatList>) => {
    return (
        <div className="container mx-auto">
            <div className="sm:columns-2 md:columns-3 lg:columns-3 gap-8">
                {
                    data.map((cat) => {
                        return (
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
    )
};

export default Cats;

export const getServerSideProps = async () => {
    return fetchData({endpoint: `${endpoints.getAllCats}?order=RANDOM&limit=10&size=thumb`, method: "get", serverSideProp: "data"});
};