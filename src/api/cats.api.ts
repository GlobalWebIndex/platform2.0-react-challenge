import axios from 'axios'
import { CatType } from '../types/cat.type'
import { SortingOrder } from '../types/Sorting-order.type'

export default class CatsApi {
  private static readonly domain: string = 'https://api.thecatapi.com/v1'

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
          'x-api-key': 'aa796a19-0f88-4237-87b7-73df20400b6b',
        },
      })
      .then(response => cb(response.data))
  }
}
