import {
  mapDispatchToProps as FavoritesMapDispatchToProps,
  mapStateToProps as FavoritesMapStateToProps,
} from './screens/Favorites';

export type IFavoritesScreen = {} & ReturnType<
  typeof FavoritesMapDispatchToProps
> &
  ReturnType<typeof FavoritesMapStateToProps>;

export interface IFavorite {
  id: string;
  user_id: string;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}
