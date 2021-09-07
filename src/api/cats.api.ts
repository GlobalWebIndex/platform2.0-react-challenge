import axios from 'axios'
import { SortingOrder } from '../types/Sorting-order.type'

export default class CatsApi {
  private static readonly domain: string = 'https://api.thecatapi.com/v1'

  static getCats<T>(
    limit: number,
    page: number,
    order: SortingOrder,
    cb: (data: T[]) => void
  ) {
    return axios
      .get<T[]>(
        `${this.domain}/images/search?limit=${limit}&page=${page}&order=${order}`
      )
      .then(response => cb(response.data))
  }
}
