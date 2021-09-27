import { BreedType } from './breeds';

export type CategoriesType = {
  id: number;
  name: string;
};

export type ImageType = {
  id: string;
  url: string;
  breeds: BreedType[];
  categories: CategoriesType[];
};

export type ImageRequestType = {
  order?: 'RANDOM' | 'ASC' | 'DESC';
  limit?: number;
  page?: number;
  breed_id?: string;
};
