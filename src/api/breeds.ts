import { AxiosResponse } from 'axios';
import { Breed, BreedListItem, Cat } from '../utils/models';
import { axiosInstance } from './axios';

export const getBreeds = async (): Promise<Breed> => {
    try {
        const response: AxiosResponse = await axiosInstance.get('breeds');
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getBreed = async (id: string): Promise<Cat[]> => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`images/search?breed_ids=${id}&limit=10`);
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
