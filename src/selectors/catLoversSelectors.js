/**
 * Selects the slice of the redux state that holds the cat lovers state
 * @param state the redux state
 */
export const catLoversSelector = state => state.get('catLovers');

/**
 * Selects the slice of the redux state that holds the random cats
 * under state.
 *
 * @param state the redux state
 */
export const catLoversRandomCatsSelector = state => catLoversSelector(state).get('randomCats') || [];

/**
 * Selects the slice of the redux state that holds the breeds
 * under state.
 *
 * @param state the redux state
 */
export const catLoversBreedsSelector = state => catLoversSelector(state).get('breeds') || [];

/**
 * Selects the slice of the redux state that holds the breed id
 * under state.
 *
 * @param state the redux state
 */
export const catLoversBreedByIdSelector = state => catLoversSelector(state).get('breedById') || [];

/**
 * Selects the slice of the redux state that holds the favorite cats
 * under state.
 *
 * @param state the redux state
 */
export const catLoversFavoritesCatsSelector = state => catLoversSelector(state).get('favoriteCats') || [];

