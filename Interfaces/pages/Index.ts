import { Breeds } from "./Breeds";

export interface Cat {
    id: string,
    url: string,
    width: number,
    height: number
};

export type CatList = Cat[];

export interface CatImage extends Cat {
    categories: [
        {
            id: number,
            name: string
        }
    ],
    breeds: Breeds[]
};