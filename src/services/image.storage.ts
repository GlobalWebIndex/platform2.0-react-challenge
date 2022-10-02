import axios from "axios"

export interface IPhoto {
    id: string;
    url?: string;
    width?: number;
    height?: number;
}

export interface ICatPhoto extends IPhoto {
    breeds: any[];
    favourite: boolean;
    cols: number;
    rows: number;
}

export interface IFavouritePhoto extends IPhoto {
    created_at: string;
    id: string;
    image: IPhoto;
    image_id: string;
    sub_id?: string
    user_id: string;
}

export interface ICatBreed {

    id: string;
    name: string;
    temperament: string;
    origin: string;
    description: string;
    wikipedia_url: string;
    image: IPhoto

}

const API_KEY = process.env.REACT_APP_API_KEY || ""
const API_URL = "https://api.thecatapi.com/v1"

export const getImages = async (breedId?: string): Promise<ICatPhoto[]> => {
    try {
        const result = await axios.get(API_URL + "/images/search", { headers: { 'x-api-key': API_KEY }, params: { limit: 10, breed_ids: breedId } })
        return result.data.map(fromDto);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting images")
    }
}

export const getImage = async (imageId: string): Promise<ICatPhoto> => {
    try {
        const result = await axios.get(API_URL + "/images/" + imageId, { headers: { 'x-api-key': API_KEY } })
        return fromDto(result.data);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting image")

    }
}

export const getFavourites = async (): Promise<IFavouritePhoto[]> => {
    try {
        const result = await axios.get(API_URL + "/favourites/", { headers: { 'x-api-key': API_KEY } })
        return result.data.map(fromFavouriteDto);
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving favourite cat photos")
    }
}

export const favouriteImage = async (imageId: string): Promise<void> => {
    try {
        const data = JSON.stringify({
            "image_id": imageId,
        })

        const headers = {
            'x-api-key': API_KEY, "Content-Type": "application/json"

        }
        await axios.post('https://api.thecatapi.com/v1/favourites', data, { headers: headers })

    } catch (error) {
        console.error(error);
    }
}

export const unfavouriteImage = async (id: string): Promise<void> => {
    try {
        await axios.delete(API_URL + "/favourites/" + id, { headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' } })
    } catch (error) {
        console.error(error);
        throw new Error("Error removing favourite")
    }
}

export const getBreeds = async (): Promise<ICatBreed[]> => {
    try {
        const result = await axios.get(API_URL + "/breeds/", { headers: { 'Content-Type': "application/json" } })

        return result.data.map(fromCatBreedDto)
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving breeds")
    }
}

const fromFavouriteDto = (dto: any): IFavouritePhoto => {
    return {
        created_at: dto.created_at,
        id: dto.id,
        image: dto.image,
        image_id: dto.image_id,
        sub_id: dto.sub_id,
        user_id: dto.user_id
    }
}

const fromCatBreedDto = (dto: any): ICatBreed => {
    return {
        ...dto,
        image: dto.image ? dto.image : { url: "https://image.shutterstock.com/image-vector/silhouette-missing-person-stamp-600w-752963539.jpg" }

    }
}

const fromDto = (x: any): ICatPhoto => {
    return {
        id: x.id,
        url: x.url,
        width: x.width,
        height: x.height,
        breeds: x.breeds,
        favourite: false,
        cols: 1,
        rows: 1
    }
}
