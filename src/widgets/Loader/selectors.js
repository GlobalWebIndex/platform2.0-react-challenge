import { catLoversSelector } from '../../selectors/catLoversSelectors';

/**
 * Selects the slice of the redux state that holds the loading indicator
 * under uiState.
 *
 * @param state the redux state
 */
export const loadingSelector = state => catLoversSelector(state).get('loading');
