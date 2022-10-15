const version = 1;
const apiBasePath = "https://api.thecatapi.com";

export const endpoints = {
    getAllCats: `${apiBasePath}/v${version}/images/search`,
    getImage: `${apiBasePath}/v${version}/images/`,
    favorite: `${apiBasePath}/v${version}/favourites/`
};