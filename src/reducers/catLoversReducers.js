import { Map } from 'immutable';
import {
  SET_BREED_BY_ID,
  SET_BREEDS,
  SET_FAVORITES_CATS,
  SET_RANDOM_CATS,
  SET_UI_STATE,
  CLEAR_BY_BREED
} from '../common/constants';
import { createSliceReducer } from '../Redux/createSliceReducer';

/**
 * Initial {@link CAT_LOVERS} state.
 *
 * @type {Immutable.Map}
 */
const INITIAL_CAT_LOVERS_STATE = Map();

/**
 * Handles setting random cats to state.
 *
 * @see setRandomCatsAction
 *
 * @param {Immutable.Map} state - The randomCats state slice.
 * @param {Object.<String, *>} action - An action of type {@link SET_RANDOM_CATS}.
 * @returns {Immutable.Map}.
 */
export const setRandomCatsCaseHandler = (state, action) => {
  const { randomCats } = action.payload;
  return state.set('randomCats', randomCats);
};

/**
 * Handles setting breeds to state.
 *
 * @see setBreedsAction
 *
 * @param {Immutable.Map} state - The breeds state slice.
 * @param {Object.<String, *>} action - An action of type {@link SET_BREEDS}.
 * @returns {Immutable.Map}.
 */
export const setBreedsCaseHandler = (state, action) => {
  const { breeds } = action.payload;
  return state.set('breeds', breeds);
};

/**
 * Handles setting favorite cats to state.
 *
 * @see setFavoritesCatsAction
 *
 * @param {Immutable.Map} state - The favoriteCats state slice.
 * @param {Object.<String, *>} action - An action of type {@link SET_FAVORITES_CATS}.
 * @returns {Immutable.Map}.
 */
export const setFavoritesCatsCaseHandler = (state, action) => {
  const { favoriteCats } = action.payload;
  return state.set('favoriteCats', favoriteCats);
};

/**
 * Handles setting breed by id to state.
 *
 * @see setCustomerSelectedPartsAction
 *
 * @param {Immutable.Map} state - The {@link breedById} state slice.
 * @param {Object.<String, *>} action - An action of type {@link SET_BREED_BY_ID}.
 * @returns {Immutable.Map}.
 */
export const setBreedByIdCaseHandler = (state, action) => {
  const { breedById } = action.payload;
  return state.set('breedById', breedById);
};

/**
 * Handles clearing breed id from the state.
 *
 * @see clearByBreedIdAction
 *
 * @param {Immutable.Map} state - The {@link breedById} state slice.
 * @returns {Immutable.Map}.
 */
export const clearBreedByIdCaseHandler = state => (
  state.delete('breedById')
);

export const setUIStateCaseHandler = (state, action) => {
  if (Array.isArray(action.payload.attr)) {
    return state.setIn(
        action.payload.attr,
        action.payload.val
    );
  }
  return state.set(
      action.payload.attr,
      action.payload.val
  );
};

/**
 * Reducer for managing {@link CAT_LOVERS} state slice.
 *
 * @type {Function}
 */
export default createSliceReducer(INITIAL_CAT_LOVERS_STATE, {
  [SET_RANDOM_CATS]: setRandomCatsCaseHandler,
  [SET_BREEDS]: setBreedsCaseHandler,
  [SET_UI_STATE]: setUIStateCaseHandler,
  [SET_BREED_BY_ID]: setBreedByIdCaseHandler,
  [SET_FAVORITES_CATS]: setFavoritesCatsCaseHandler,
  [CLEAR_BY_BREED]: clearBreedByIdCaseHandler
});
