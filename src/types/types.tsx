export interface Breed {
  affection_level: number;
  alt_names: string;
  child_friendly: number;
  description: string;
  dog_friendly: number;
  energy_level: number;
  id: string;
  intelligence: number;
  life_span: string;
  name: string;
  origin: string;
  stranger_friendly: number;
  temperament: string;
  weight: { metric: string; imperial: string };
}

export interface Cat {
  breeds?: Breed[];
  id: string;
  url: string;
}
export interface Context {
  breeds: Breed[];
  favourites: Favourite[];
  loading: boolean;
  randomCats: Cat[];
  selectedCat: Cat | null;
  selectedBreed: Breed | null;
  setFavourites: (favoriteCats: Favourite[]) => void;
  setLoading: (loading: boolean) => void;
  setRandomCats: (cats: Cat[]) => void;
  setSelectedBreed: (breed: Breed | null) => void;
  setSelectedCat: (cat: Cat | null) => void;
}

export interface Favourite {
  id: string;
  image: {
    id: string;
    url: string;
  };
}
