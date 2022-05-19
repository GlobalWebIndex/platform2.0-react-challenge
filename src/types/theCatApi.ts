type FetchCatImagesParams = {
  limit?: string;
  size?: 'full' | 'med' | 'small' | 'thumb';
  page?: number;
  breed_ids?: string;
  order?: 'RANDOM' | 'ASC' | 'DESC';
  mime_types?: string;
  format?: 'json' | 'src';
};

interface Category {
  id: number;
  name: string;
}

interface Weight {
  imperial: string;
  metric: string;
}

interface Breed {
  weight: Weight;
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
}

interface FavouriteCat {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}

type ImageGalleryResponse = {
  breeds: Breed[];
  height: number;
  width: number;
  id: string;
  url: string;
}[];

type CatDetails = {
  breeds: Breed[];
  height: number;
  width: number;
  id: string;
  url: string;
};

export type {
  Breed,
  Weight,
  Category,
  CatDetails,
  FetchCatImagesParams,
  ImageGalleryResponse,
  FavouriteCat,
};
