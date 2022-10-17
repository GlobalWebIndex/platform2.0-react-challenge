import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import Breeds from "pages/breeds";

export default Breeds;
export const getServerSideProps = async () => {
    return fetchData({ endpoint: `${endpoints.getAllBreeds}`, method: "get", serverSideProp: "data" });
};