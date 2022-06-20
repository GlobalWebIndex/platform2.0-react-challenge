import {
  mapDispatchToProps as BreedsMapDispatchToProps,
  mapStateToProps as BreedsMapStateToProps,
} from './screens/Breeds';

import {
  mapDispatchToProps as BreedDetailsModalMapDispatchToProps,
  mapStateToProps as BreedDetailsMapStateToProps,
} from './screens/Breeds/BreedDetailsModal';

export type IBreedsScreen = {} & ReturnType<typeof BreedsMapDispatchToProps> &
  ReturnType<typeof BreedsMapStateToProps>;

export type IBreedDetailsModal = {} & ReturnType<
  typeof BreedDetailsModalMapDispatchToProps
> &
  ReturnType<typeof BreedDetailsMapStateToProps>;

export interface IBreed {
  alt_names: string;
  experimental: number;
  hairless: number;
  hypoallergenic: number;
  id: string;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id: null;
  rex: number;
  short_legs: number;
  suppressed_tail: number;
  temperament: string;
  weight_imperial: string;
  wikipedia_url: string;
  description: string;
  image: {
    height?: number;
    id: string;
    url: string;
    width?: number;
  };
}
