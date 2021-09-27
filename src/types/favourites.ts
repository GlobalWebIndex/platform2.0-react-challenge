export type FavouriteSaveResponseType = {
  id: string;
  message: string;
};

export type FavouriteImageType = {
  id: string;
  url: string;
};

export type FavouriteType = {
  id: string;
  image_id: string;
  sub_id: string;
  user_id: string;
  created_at: string;
  image: FavouriteImageType;
};
