import React from "react";
import globalHook from "use-global-hook";


import * as act from "./actions";
import * as models from '../constants/models'

export type AppState = {
    breeds: models.ApiListResult<models.ICatBreed>
    selectedBreed: models.ApiResult<models.ICatBreed>
    
    cats: models.ApiListResult<models.ICat>
    selectedCat :models.ApiResult<models.ICat>

    favorites: models.ApiListResult<models.IFavorite>,
}


const initialBreeds: models.ApiListResult<models.ICatBreed> = { data: [], status: models.StatusEnum.INITIAL };
export const initialBreed: models.ApiResult<models.ICatBreed> = { data: undefined, status: models.StatusEnum.INITIAL };
export const initialCats: models.ApiListResult<models.ICat> = { data: [], status: models.StatusEnum.INITIAL };
export const initialCat: models.ApiResult<models.ICat> = { data: undefined, status: models.StatusEnum.INITIAL };
const initialFavorites: models.ApiListResult<models.IFavorite> = { data: [], status: models.StatusEnum.INITIAL };

const initialState = { 
    breeds: initialBreeds,
    selectedBreed : initialBreed,
    cats: initialCats,
    selectedCat: initialCat,
    favorites: initialFavorites,
};

// Associated actions are what's expected to be returned from globalHook
export type AssociatedActions = {
    fetchCats: () => models.ApiListResult<models.ICat>;
    addCat: () => models.ApiListResult<models.ICat>
    // fetchCat: (image_id: string) => models.ApiResult<models.ICat>;
    fetchMoreCats: () => models.ApiResult<models.ICat>;
    fetchBreeds: () => models.ApiResult<models.ICatBreed>;
    fetchFavorites: () => models.ApiResult<models.IFavorite>;
};

const stateActions = {
    fetchBreeds: act.Breed.fetchBreeds,
    addCat: act.Cat.addCat,
    fetchCats: act.Cat.fetchCats,
    fetchMoreCats: act.Cat.fetchMoreCats,
    fetchFavorites: act.Favotite.fetchFavorites,
};

export const statelessActions = { 
    addFavorite: act.Favotite.addFavorite,
    removeFavorite : act.Favotite.removeFavorite,
    fetchCatsForBreed: act.Cat.fetchCatsForBreed,
    fetchCat: act.Cat.fetchCat
};


export const useGlobal = globalHook<AppState, AssociatedActions>(React, initialState, stateActions);
export default useGlobal;

