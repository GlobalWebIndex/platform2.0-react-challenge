import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

class Cats {
  static getCats(params) {
    return axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/images/search',
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });
  }

  static getBreeds() {
    return axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/breeds',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static getFavourites() {
    return axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/favourites',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
  }

  static saveFavourite(imageId) {
    return axios({
      method: 'post',
      url: 'https://api.thecatapi.com/v1/favourites',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      data: {
        image_id: imageId,
        sub_id: 'vissarion',
      },
    });
  }

  static deleteFavourite(favouriteId) {
    return axios({
      method: 'delete',
      url: `https://api.thecatapi.com/v1/favourites/${favouriteId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
  }
}

export default Cats;
