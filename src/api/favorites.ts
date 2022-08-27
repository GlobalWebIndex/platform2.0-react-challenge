import { AxiosResponse } from 'axios';
import { Favorite } from '../utils/models';
import { axiosInstance } from './axios';

export const getFavorites = async (): Promise<Favorite[] | undefined> => {
    try {
        const response: AxiosResponse = await axiosInstance.get('/favourites');
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const postFavorites = async (id: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(
            '/favourites',
            JSON.stringify({ image_id: id })
        );
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteFavorite = async (id: number) => {
    try {
        const response: AxiosResponse = await axiosInstance.delete(
            `/favourites/${id}`
        );
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
