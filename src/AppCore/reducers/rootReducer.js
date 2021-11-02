import { combineReducers } from 'redux-immutable';
import catLoversReducers from '../../reducers/catLoversReducers';
import { CAT_LOVERS } from '../common/constants';
import { createRootReducer } from '../../Redux/createRootReducer';

/**
 * Root reducer of the application, combining all the slice reducers.
 *
 * @see https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic
 * @see https://redux.js.org/api/combinereducers
 */
const rootReducer = createRootReducer(
  {
      [CAT_LOVERS]: catLoversReducers
  },
  combineReducers
);

export default rootReducer;
