import axios, { AxiosResponse } from 'axios'
import { BreedType } from '../types/Breed.type'
import { FavoriteType } from '../types/Favorite.type'
import { ImageType } from '../types/Image.type'
import { SortingOrder } from '../types/Sorting-order.type'

export default class CatsApi {
  private static readonly domain: string = 'https://api.thecatapi.com/v1'

  private static readonly API_KEY = 'aa796a19-0f88-4237-87b7-73df20400b6b'

  static getImages(limit: number, page: number, order: SortingOrder): Promise<AxiosResponse<ImageType[]>> {
    return axios.get<ImageType[]>(`${this.domain}/images/search?limit=${limit}&page=${page}&order=${order}`)
  }

  // TODO: set the API key in constants file
  // TODO: set the header via an interceptor
  static getImage(imageId: string): Promise<AxiosResponse<ImageType>> {
    return axios.get<ImageType>(`${this.domain}/images/${imageId}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    })
  }

  static getBreeds(limit: number, page: number): Promise<AxiosResponse<BreedType[]>> {
    return axios.get<BreedType[]>(`${this.domain}/breeds?limit=${limit}&page=${page}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    })
  }

  static getImagesByBreed(breedId: string, limit: number, page: number): Promise<AxiosResponse<ImageType[]>> {
    return axios.get<ImageType[]>(`${this.domain}/images/search?breed_ids=${breedId}&include_breeds=1&limit=${limit}&page=${page}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    })
  }

  static getFavorites(): Promise<AxiosResponse<FavoriteType[]>> {
    return axios.get<FavoriteType[]>(`${this.domain}/favourites/`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    })
  }

  static getFavoriteById(favoriteId: number): Promise<AxiosResponse<FavoriteType>> {
    return axios.get<FavoriteType>(`${this.domain}/favourites/?${favoriteId}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    })
  }

  /**
   *
   * @param favoriteId the unique id of the favorite entity
   * @returns message=SUCCESS
   */
  static deleteFavoriteById(favoriteId: number): Promise<
    AxiosResponse<{
      message: string
    }>
  > {
    return axios.delete<{ message: string }>(`${this.domain}/favourites/${favoriteId}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    })
  }

  /**
   * This method sends a POST verb message with two fields:
   * "image_id" and "sub_id"
   *
   * In the "sub_id" field I keep the "image_id" so that I can query, later, a favorite entity by searching with "image_id".
   * The method that does this is the getFavoriteByImageId()
   * @param imageId
   * @returns
   */
  static saveFavorite(imageId: string): Promise<
    AxiosResponse<{
      message: string
      id: number
    }>
  > {
    return axios.post<{ message: string; id: number }>(
      `${this.domain}/favourites`,
      { image_id: imageId, sub_id: imageId },
      {
        headers: {
          'x-api-key': this.API_KEY,
        },
      }
    )
  }

  static getFavoriteByImageId(imageId: string): Promise<AxiosResponse<FavoriteType[]>> {
    return axios.get<FavoriteType[]>(`${this.domain}/favourites/?sub_id=${imageId}`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    })
  }
}
