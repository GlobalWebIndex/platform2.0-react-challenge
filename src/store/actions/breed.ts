import { Store } from "use-global-hook";
import * as models from '../../constants/models'
import { AppState, AssociatedActions} from '../index'
import apiBase from "../config";

export const fetchBreeds = (
    store: Store<AppState, AssociatedActions>,
    breeds:  models.ApiListResult<models.ICatBreed>
) => {

    breeds = {...store.state.breeds};
    breeds.status = models.StatusEnum.REQUESTED;
    const rq = async () => {
        const breedsRes = await apiBase('/v1/breeds');
        breeds.data = breedsRes.data as models.ICatBreed[];
        breeds.status = models.StatusEnum.SUCCESS;
        store.setState( {...store.state, breeds })
    }
    rq();
};