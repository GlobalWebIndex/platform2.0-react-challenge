import { setUIState } from '../../actions/catLoversActions';

/**
 * Action creator for blocking the UI with the global loader.
 */
export const blockUIAction = () => (setUIState('loading', true));

/**
 * Action creator for unblocking the UI (remove the global loader).
 */
export const unblockUIAction = () => (setUIState('loading', false));