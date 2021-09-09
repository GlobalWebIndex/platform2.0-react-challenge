import { Breed } from './Breed';

export interface CatImage {
    id: string,
    url: string,
    width: number,
    height: number,
    breeds?: Breed[],
}
