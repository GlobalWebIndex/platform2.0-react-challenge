import axios from "axios";

const apiKey: string = "4e8c676c-80e9-4bee-8391-b861cbaad6ce";

const sub_id: string = "my_cat_list_seb_5555";

const getTenRandomCats = async () => {
  try {
    axios.defaults.headers.common["x-api-key"] = apiKey; // Replace this with your API Key

    let query_params = {
      limit: 10,
      order: "Rand",
      mime_types: "png"
    };

    let response = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
      { params: query_params }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const loadMoreCats = async (pageNumer: number) => {
  try {
    axios.defaults.headers.common["x-api-key"] = apiKey; // Replace this with your API Key

    let query_params = {
      limit: 20,
      order: "Acs",
      page: pageNumer
    };

    let response = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
      { params: query_params }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getCAtById = async (id: string) => {
  try {
    axios.defaults.headers.common["x-api-key"] = apiKey; // Replace this with your API Key

    let query_params = {
      limit: 10,
      order: "Rand",
      mime_types: "png"
    };

    let response = await axios.get(
      `https://api.thecatapi.com/v1/images/${id}`,
      { params: query_params }
    );

    console.log("getCAtById", response);
    return [response.data];
  } catch (err) {
    console.log(err);
  }
};
//??
const getFavouritesList = async () => {
  try {
    axios.defaults.headers.common["x-api-key"] = apiKey; // Replace this with your API Key
    let query_params = {
      limit: 10,
      order: "DESC",
      page: 0
    };
    let response = await axios.get("https://api.thecatapi.com/v1/favourites", {
      params: query_params
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const setCatAsFavorite = async (id: string) => {
  try {
    axios.defaults.headers.common["x-api-key"] = apiKey; // Replace this with your API Key

    let post_body = {
      image_id: id,
      sub_id: sub_id
    };
    return await axios
      .post("https://api.thecatapi.com/v1/favourites", post_body)
      .then(async response => {
        console.log("FAV CAT", response);
        if (response.status === 200) {
          return await catApis.getFavouritesList().then(response => {
            console.log(response.data);
            return response;
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
const deleteFromFavorites = async (id: number) => {
  try {
    return await axios
      .delete("https://api.thecatapi.com/v1/favourites/" + id)
      .then(async response => {
        // if (response.data.message === "SUCCESS") {
        return await catApis.getFavouritesList().then(response => {
          return response;
        });
        // }
      });
  } catch (err) {
    return err;
    console.log(err);
  }
};
const catApis = {
  getTenRandomCats: getTenRandomCats,
  loadMoreCats: loadMoreCats,
  getCAtById: getCAtById,
  setCatAsFavorite: setCatAsFavorite,
  getFavouritesList: getFavouritesList,
  deleteFromFavorites: deleteFromFavorites
};

export default catApis;
