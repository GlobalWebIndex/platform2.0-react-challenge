import { CatImage } from './CatImage';

export interface Favourite {
    'id': number;
    'user_id': string;
    'image_id': string;
    'sub_id': string;
    'created_at': string;
    'image': Pick<CatImage, 'id' | 'url'>;
}
