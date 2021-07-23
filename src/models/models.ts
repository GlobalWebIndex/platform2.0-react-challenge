export interface ICatData {
  breeds: ICatBreed[];
  height: number;
  id: string;
  url: string;
  categories?: ICatCategory[];
}
export interface ICatBreed {
  weight: ICatWeight;
  id: string;
  name: string;
  vetstreet_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
  image: IImage;
}

export interface IFavorites {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: IImage;
  user_id: string;
}

export interface IImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface ICatWeight {
  imperial: string;
  metric: string;
}

export interface ICatCategory {
  id: number;
  name: string;
}
export class HTTPMethods {
  public static GET: string = "GET";
  public static POST: string = "POST";
  public static PUT: string = "PUT";
  public static DELETE: string = "DELETE";
  public static PATCH: string = "PATCH";
}

export interface IPagination {
  page: number;
  limit: number;
}
