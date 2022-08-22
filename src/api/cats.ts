import axios, { AxiosResponse } from 'axios';
import { Cat } from '../utils/models';

export const getCats = async (page: number = 1): Promise<Cat[]> => {
    try {
        const response: AxiosResponse = await axios.get(
            `${process.env.BASE_URL}/images/search?limit=10&page=${page}&order=DESC`,
        );
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
