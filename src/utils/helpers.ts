import { Breed, Cat, CatInfo, Favorite } from './models';

export const getCatInfo = (breed: Breed): CatInfo => {
    return {
        name: breed.name,
        description: breed.description,
        stats: [
            { name: 'Dog friendly', value: breed.dog_friendly },
            { name: 'Energy level', value: breed.energy_level },
            { name: 'Intelligence', value: breed.intelligence },
            { name: 'Adaptability', value: breed.adaptability },
            { name: 'Health issues', value: breed.health_issues },
            { name: 'Social needs', value: breed.social_needs },
        ],
    };
};

export const catExistsInFavorites = (cat: Cat, list: { id: number; imageId: string }[]) => {
    return list.map((item) => item.imageId).includes(cat.id);
};
