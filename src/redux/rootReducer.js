import { combineReducers } from "redux";
import { reducer as searchReducer } from "../modules/search/ducks";
import { reducer as breedsReducer } from "../modules/breeds/ducks";
import { reducer as favouritesReducer } from "../modules/favourites/ducks";

export default combineReducers({
  searchReducer,
  breedsReducer,
  favouritesReducer
});
