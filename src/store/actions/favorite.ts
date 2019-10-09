//  import axios from "axios";
import { Store } from "use-global-hook";
import * as models from '../../constants/models'
import { AppState, AssociatedActions} from '../index'

import apiBase from "../config";

export const fetchFavorites = (
    store: Store<AppState, AssociatedActions>,
    favorites:  models.ApiListResult<models.IFavorite>
) => {
    favorites = {...store.state.favorites};
    favorites.status = models.StatusEnum.REQUESTED;
    //store.setState( {...store.state, favorites })
    const rq = async () => {
        const res =  await apiBase.get('/v1/favourites');
        favorites.data = res.data as models.IFavorite[];
        favorites.status = models.StatusEnum.SUCCESS;
        store.setState( {...store.state, favorites });
    }
    rq();
    
};

export const addFavorite = (
    image_id : string
) => {
    const sub_id:string = process.env.REACT_APP_X_API_USER_ID ? process.env.REACT_APP_X_API_USER_ID : ''; 
    const postData: models.IFavoriteBody = { image_id : image_id, sub_id : sub_id };
    const rq = async () => {
        return await apiBase.post("/v1/favourites", postData);
    }
    return rq();
};

export const removeFavorite = (
    favorite_id: number
) => {
    const rq = async () => {
        return await apiBase.delete('/v1/favourites/' + favorite_id.toString(), );
    }
    return rq();
};