import { ADD_FAVORITE } from "../constants/action-types";

const initialState = {
  favorites: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_FAVORITE) {
    return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;