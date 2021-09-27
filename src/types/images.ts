export type BreedType = {
  id: string;
  name: string;
  description: string;
};

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
