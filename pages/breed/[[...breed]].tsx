import { endpoints } from "configuration/endpoints";
import { fetchData } from "helpers/net/fetchData";
import { constants } from "configuration/constants";
import Cats from "pages";

export default Cats;
export const getServerSideProps = async () => {
    return fetchData({endpoint: `${endpoints.getAllCats}?order=${constants.order}&limit=${constants.limit}&size=${constants.size}&page=0&include_favourite=1`, method: "get", serverSideProp: "data"});
};