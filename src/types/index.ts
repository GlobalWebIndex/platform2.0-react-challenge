namespace Cat {
  export type Image = {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: Breed[];
  };

  export type Breed = {
    id: string;
    name: string;
    origin: string;
    description: string;
    temperament: string;
    image: Image;
    life_span: string;
  };

  export type FavouriteImage = {
    id: string;
    image: Pick<Image, 'id' | 'url'>;
  };
}

export default Cat;
