export const getAllCats = (page = 1) => {
    return fetch(
      `${process.env.REACT_APP_CAT_API_URL_ALL_CATS}?limit=3&page=${page}&order=DESC`
    ).then((resp) => resp.json());
  };