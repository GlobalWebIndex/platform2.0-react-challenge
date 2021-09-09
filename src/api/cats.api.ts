import axios from 'axios'
import { BreedType } from '../types/Breed.type'
import { CatType } from '../types/cat.type'
import { SortingOrder } from '../types/Sorting-order.type'

export default class CatsApi {
  private static readonly domain: string = 'https://api.thecatapi.com/v1'

  private static readonly API_KEY = 'aa796a19-0f88-4237-87b7-73df20400b6b'

  // TODO: change to getImages
  static getCats(
    limit: number,
    page: number,
    order: SortingOrder,
    cb: (data: CatType[]) => void
  ) {
    return axios
      .get<CatType[]>(
        `${this.domain}/images/search?limit=${limit}&page=${page}&order=${order}`
      )
      .then(response => cb(response.data))
  }

  // TODO: set the API key in constants file
  // TODO: set the header via an interceptor
  static getImage(imageId: string, cb: (data: CatType) => void) {
    return axios
      .get<CatType>(`${this.domain}/images/${imageId}`, {
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

  static getBreed(breedId: string, cb: (data: BreedType[]) => void) {
    return axios
      .get<BreedType[]>(`${this.domain}/images/search?breed_id=${breedId}`, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => cb(response.data))
  }
}
