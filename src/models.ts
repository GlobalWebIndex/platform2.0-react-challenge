export interface IState {
  catlist?: [IRandomCat]|any;
  pageNumber: number;
  selectedCat: [];
  selectedBreed: string;
  favoriteList:any;
  dataLoaded: boolean;
  catIdLoaded: string;
  breedsList?: [ICatBreed]|any;
  state?:any;
  setstate?:any;
}
export interface ICatBreedWeight {
  imperial: string
  metric: string
}

export interface ICatCategory {
  id: number
  name: string
}
export interface ICatBreed {
  weight: ICatBreedWeight
  id: string
  name: string
  cfa_url: string
  vetstreet_url: string
  vcahospitals_url: string
  temperament: string
  origin: string
  country_codes: string
  country_code: string
  description: string
  life_span: string
  indoor: number
  lap: number
  alt_names: string
  adaptability: number
  affection_level: number
  child_friendly: number
  dog_friendly: number
  energy_level: number
  grooming: number
  health_issues: number
  intelligence: number
  shedding_level: number
  social_needs: number
  stranger_friendly: number
  vocalisation: number
  experimental: number
  hairless: number
  natural: number
  rare: number
  rex: number
  suppressed_tail: number
  short_legs: number
  wikipedia_url: string
  hypoallergenic: number
  cat_friendly?: number
  bidability?: number
  
}

export interface ICatList{
  [index:number]:{
    breeds?: ICatBreed[];
    height?: number;
    id?: string;
    url?: string;
    width?: number;
  }
}

export interface IBreedList{
  [index:number]:{
    weight: ICatBreedWeight
    id: string
    name: string
    cfa_url: string
    vetstreet_url: string
    vcahospitals_url: string
    temperament: string
    origin: string
    country_codes: string
    country_code: string
    description: string
    life_span: string
    indoor: number
    lap: number
    alt_names: string
    adaptability: number
    affection_level: number
    child_friendly: number
    dog_friendly: number
    energy_level: number
    grooming: number
    health_issues: number
    intelligence: number
    shedding_level: number
    social_needs: number
    stranger_friendly: number
    vocalisation: number
    experimental: number
    hairless: number
    natural: number
    rare: number
    rex: number
    suppressed_tail: number
    short_legs: number
    wikipedia_url: string
    hypoallergenic: number
    cat_friendly?: number
    bidability?: number
    
  }
}

export interface IRandomCatList{
  [index:number]:{
    
    breeds?: ICatBreed[];
    height?: number;
    id?: string;
    url?: string;
    width?: number;
  }
}

export interface IRandomCat {
  breeds?: ICatBreed[];
  height?: number;
  id?: string;
  url?: string;
  width?: number;
}

export interface ICatFavouriteList {
  [index: number]:{ created_at: string;
  id: number;
  image: { id: string; url: string };
  image_id: string;
  sub_id: string;
  user_id: string;}
}

export interface ICatFavouriteListItem {
  created_at: string;
  id: number;
  image: { id: string; url: string };
  image_id: string;
  sub_id: string;
  user_id: string;
}

export interface ApiCatListResult<T> {
  data: T[]
}

export interface IServerResponse{
  message:string 
}