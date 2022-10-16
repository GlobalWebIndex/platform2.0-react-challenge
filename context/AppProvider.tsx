import { constants } from 'configuration/constants';
import { initialContext } from 'configuration/dummy';
import { endpoints } from 'configuration/endpoints';
import { getCookie } from 'cookies-next';
import { fetchData } from 'helpers/net/fetchData';
import { ContextProps, FavoriteItemProps } from "interfaces/context/Context";
import { WithChildrenProps } from "interfaces/general/WithChildren";
import { createContext, useEffect, useState } from "react";

//create the context
export const AppContext = createContext<ContextProps>(initialContext);

//export the provider
export const AppProvider = ({ children }: WithChildrenProps) => {
    const [loading, setLoading] = useState(initialContext.loading);
    const [darkMode, setDarkMode] = useState(initialContext.darkMode);
    const [favorites, setFavorites] = useState<FavoriteItemProps[]>(initialContext.favorites);

    //add an image to favorites
    const addToFavorites = (favorite: FavoriteItemProps) => {
        const index = favorites.findIndex(element => favorite.favoriteId === element.favoriteId);

        if (index === -1) {
            const items = [...favorites, favorite];
            setFavorites(items);
        }
    };

    //remove the image from favorites
    const removeFromFavorites = (favorite: FavoriteItemProps) => {
        const found = favorites.find(element => favorite.favoriteId === element.favoriteId);

        if (found) {
            const items = favorites.filter((item) => found !== item);
            setFavorites(items);
        }
    };

    //fill data, on mount
    useEffect(() => {
        const getData = async () => {
            const data = await fetchData({ endpoint: endpoints.favorite, method: "get", apikey: constants.apikey });
            const favoritesData = data?.map((item: any) => {
                return {
                    imageId: item.image_id,
                    favoriteId: item.id
                }
            });

            setFavorites(favoritesData);
        };

        //get theme, from user cookie
        const getTheme = async () => {
            const darkMode = await getCookie("darkmode");

            setDarkMode(Boolean(darkMode));
        };

        getData();
        getTheme();
    }, []);

    return (
        <AppContext.Provider value={{ loading, setLoading, darkMode, setDarkMode, favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </AppContext.Provider>
    )
};