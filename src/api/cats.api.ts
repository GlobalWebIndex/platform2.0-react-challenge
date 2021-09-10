import axios from 'axios'
import { BreedType } from '../types/Breed.type'
import { FavoriteType } from '../types/Favorite.type'
import { ImageType } from '../types/Image.type'
import { SortingOrder } from '../types/Sorting-order.type'

export default class CatsApi {
  private static readonly domain: string = 'https://api.thecatapi.com/v1'

  private static readonly API_KEY = 'aa796a19-0f88-4237-87b7-73df20400b6b'

  static getImages(
    limit: number,
    page: number,
    order: SortingOrder,
    cb: (data: ImageType[]) => void
  ) {
    return axios
      .get<ImageType[]>(
        `${this.domain}/images/search?limit=${limit}&page=${page}&order=${order}`
      )
      .then(response => cb(response.data))
  }

  // TODO: set the API key in constants file
  // TODO: set the header via an interceptor
  static getImage(imageId: string, cb: (data: ImageType) => void) {
    return axios
      .get<ImageType>(`${this.domain}/images/${imageId}`, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => cb(response.data))
  }

  static getBreeds(
    limit: number,
    page: number,
    cb: (data: BreedType[]) => void
  ) {
    return axios
      .get<BreedType[]>(`${this.domain}/breeds?limit=${limit}&page=${page}`, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => cb(response.data))
  }

  static getImagesByBreed(
    breedId: string,
    limit: number,
    page: number,
    cb: (data: ImageType[]) => void
  ) {
    return axios
      .get<ImageType[]>(
        `${this.domain}/images/search?breed_ids=${breedId}&include_breeds=1&limit=${limit}&page=${page}`,
        {
          headers: {
            'x-api-key': this.API_KEY,
          },
        }
      )
      .then(response => cb(response.data))
  }

  static getFavorites(cb: (data: FavoriteType[]) => void) {
    return axios
      .get<FavoriteType[]>(`${this.domain}/favourites/`, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => cb(response.data))
  }

  static getFavoriteById(favoriteId: number, cb: (data: FavoriteType) => void) {
    return axios
      .get<FavoriteType>(`${this.domain}/favourites/?${favoriteId}`, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => cb(response.data))
  }

  static deleteFavoriteById(
    favoriteId: number,
    cb: (data: { message: string }) => void
  ) {
    return axios
      .delete<{ message: string }>(`${this.domain}/favourites/${favoriteId}`, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => cb(response.data))
  }

  static saveFavorite(
    imageId: string,
    cb: (data: { message: string; id: number }) => void
  ) {
    return axios
      .post<{ message: string; id: number }>(
        `${this.domain}/favourites`,
        { image_id: imageId, sub_id: imageId },
        {
          headers: {
            'x-api-key': this.API_KEY,
          },
        }
      )
      .then(response => cb(response.data))
  }

  static getFavoriteByImageId(
    imageId: string,
    cb: (data: FavoriteType[]) => void
  ) {
    return axios
      .get<FavoriteType[]>(`${this.domain}/favourites/?sub_id=${imageId}`, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => cb(response.data))
  }
}
