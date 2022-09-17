export interface Cat {
    id: string;
    url: string;
    width?: number;
    height?: number;
    breeds?: Breed[];
    categories?: Category[];
}

export interface Category {
    id?: string;
    name?: string;
}

export interface Breed {
    id: string;
    name: string;
    description: string;
    adaptability: number;
    dog_friendly: number;
    energy_level: number;
    health_issues: number;
    intelligence: number;
    social_needs: number;
    image?: {
        id: string;
        width: number;
        height: number;
        url: string;
    };
}

export interface SubBreed {
    name: string;
    id: string;
}

export interface BreedListItem {
    id: string;
    url: string;
}

export interface Favorite {
    id: number;
    image_id: string;
    sub_id: string;
    created_at: string;
    image: {
        id: string;
        url: string;
    };
}

export interface FavoriteIds {
    id: number;
    imageId: string;
}

export interface DeleteResponse {
    message: string;
}

export interface IconWithLabel {
    label: string;
    icon: JSX.Element;
}

export interface CatInfo {
    name: string;
    description: string;
    stats: { name: string; value: number }[];
}
