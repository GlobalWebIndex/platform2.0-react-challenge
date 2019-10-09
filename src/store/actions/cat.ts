import apiBase from "../config";
import { Store } from "use-global-hook";
import { AppState, AssociatedActions} from '../index'
import * as models from '../../constants/models'


export const fetchCats = (
    store: Store<AppState, AssociatedActions>,
    cats:  models.ApiListResult<models.ICat>
) => {

    cats = {...store.state.cats};
    cats.status = models.StatusEnum.REQUESTED;
    const rq = async () => {
        const res = await apiBase('/v1/images/search?limit=10');
        cats.data = res.data as models.ICat[];
        cats.status = models.StatusEnum.SUCCESS;
        store.setState( {...store.state, cats })
    }
    rq();
};
export const fetchMoreCats = (
    store: Store<AppState, AssociatedActions>,
    cats:  models.ApiListResult<models.ICat>
) => {
    cats = {...store.state.cats};
    cats.status = models.StatusEnum.REQUESTED;
    const rq = async () => {
        const res = await apiBase('/v1/images/search?limit=10');
        (cats.data).push( ...res.data as models.ICat[]);
        cats.status = models.StatusEnum.SUCCESS;
        store.setState( {...store.state, cats });
    }
    rq();
};

export const addCat = (
    store: Store<AppState, AssociatedActions>,
    cat:  models.ApiListResult<models.ICat>
) => {
    const newCats = {...store.state.cats, status: models.StatusEnum.SUCCESS}
    newCats.data.push(...cat.data);
    // store.setState( {...store.state.cats, newCats });
};


export const fetchCatsForBreed = (
    id: string
) => {
    const rq = async () => { 
        return await apiBase('/v1/images/search?limit=10&breed_id=' + id); 
    }
    return rq();
};

export const fetchCat = (
    id: string
) => {
    const rq = async () => { 
        return await apiBase('/v1/images/'+ id); 
    }
    return rq();
};