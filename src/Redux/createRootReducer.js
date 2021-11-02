/**
 * Creates a redux root reducer from the given reducers tree, using the given function for
 * combining it to a single reducing function.
 *
 * @see https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic
 *
 * @param {Object.<String, Function>} reducersTree - The tree of reducers to combine.
 * @param {Function} combineReducersFunction - The function to use for combining the reducers tree.
 * @returns {Function}
 */
export const createRootReducer =(reducersTree, combineReducersFunction) => {
  // Combine the reducers tree to a single reducing function.
  const combinedReducer = combineReducersFunction(reducersTree);
  // Create and return the root reducer.
  return (state, action) => combinedReducer(state, action);
};
