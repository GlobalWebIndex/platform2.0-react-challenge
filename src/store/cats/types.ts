import { Breed } from 'store/breeds/types';

export interface CatImage {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds?: Breed[];
}

export interface FavouriteCatImage {
  created_at: string;
  id: string;
  image: Partial<CatImage>;
  image_id: string;
  sub_id: string | null;
  user_id: string;
}

export interface MarkFavoriteResponse {
  message: string;
  id: string;
}

export enum CatApiErrorType {
  RESPONSE_ERROR = 1,
  EMPTY_RESULTS = 2,
  API_TOKEN_EMPTY = 3,
  NOT_FOUND = 4,
}

export enum CatApiSuccessType {
  CAT_ADDED = 1,
  CAT_REMOVED = 2,
}

export interface CatSliceState {
  loading: boolean;
  error?: CatApiErrorType | null;
  success?: CatApiSuccessType | null;
  catImages: CatImage[];
  favouriteCatImages: FavouriteCatImage[];
  selectedCat: CatImage | null;
  onlyBreeds: boolean;
  selectedBreedId: string | null;
}

export enum CatApiOrder {
  RANDOM = 'Random',
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}

export enum CatApiSize {
  SMALL = 'small',
  MEDIUM = 'med',
  FULL = 'full',
}

export interface CatApiParameters {
  limit: number;
  order: CatApiOrder;
  size: CatApiSize;
  page: number;
  has_breeds?: number;
  breed_ids?: string;
}
