import { CookieValueTypes } from "cookies-next";

export interface ContextProps {
    loading: boolean,
    darkMode: boolean,
    favorites: FavoriteItemProps[] | CookieValueTypes,
    addToFavorites: (arg: FavoriteItemProps) => void, 
    removeFromFavorites: (arg: FavoriteItemProps) => void,
    setDarkMode: (arg: boolean) => void,
    setLoading: (arg: boolean) => void
};

export interface FavoriteItemProps {
    imageId: string,
    favoriteId: string
};