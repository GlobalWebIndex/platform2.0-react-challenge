// Needed for generating containers seamlessly
import { BreedsSliceState } from 'store/breeds/types';
import { CatSliceState } from 'store/cats/types';

export interface RootState {
  cats?: CatSliceState;
  breeds?: BreedsSliceState;
  // Needed for generating containers seamlessly
}
