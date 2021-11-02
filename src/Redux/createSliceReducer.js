/**
 * Creates a redux slice reducer.
 *
 * @see https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic
 *
 * @example
 * const INITIAL_TODO_STATE = Map();
 *
 * createSliceReducer(INITIAL_TODO_STATE, {
 *   [ADD_TODO]: addTodoCaseHandler,
 *   [REMOVE_TODO]: removeTodoCaseHandler,
 * }) //=> todoReducer
 *
 * @param {*} initialState - The initial state of the state slice that will be handled by the reducer.
 * @param {Object.<String, Function>} caseHandlers - Configuration object with action type - case handler pairs.
 * @returns {Function}
 */
export const createSliceReducer = (initialState, caseHandlers) => (state = initialState, action) => {
  const caseReducer = caseHandlers[action.type];
  return caseReducer ? caseReducer(state, action) : state;
};