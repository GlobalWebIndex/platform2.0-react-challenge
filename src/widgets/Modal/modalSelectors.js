/**
 * Selects the indication about whether the specified modal (stateIdentifier) is open or not.
 * @param state
 * @param stateIdentifier
 */
export const isModalOpenSelector = (state, stateIdentifier) =>
    state.getIn(['catLovers', 'modal', stateIdentifier]) || false;

/**
 * Selects the properties of the current modal
 * @param state
 * @param stateIdentifier
 */
export const modalPropsSelector = (state, stateIdentifier) =>
    (state.getIn(['catLovers', 'modal', 'modalProps', stateIdentifier]) || {});