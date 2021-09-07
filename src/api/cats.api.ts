import axios from 'axios';

export class CatsApi {
  private static readonly domain: string = 'https://api.thecatapi.com/v1'

  static getCats<T>(limit: number, page: number, order: 'Asc' | 'Desc', cb: (data: T[]) => void) {
    return axios
    .get<T[]>(`${this.domain}/images/search?limit=${limit}&page=${page}&order=${order}`)
    .then((response) => cb(response.data))
  }
}