/**
 * Action type for opening a modal.
 */
export const OPEN_MODAL = 'OPEN_MODAL';

/**
 * Action type for closing a modal.
 */
export const CLOSE_MODAL = 'CLOSE_MODAL';

/**
 * Action for opening a modal.
 *
 * @param modalIdentifier the id of the modal to open
 * @param modalProps the props of the modal
 * @param openCallback the function to be executed when the modal opens
 * @param openCallbackArgs array of the arguments of the aforementioned function
 */
export const openModalAction = (modalIdentifier, modalProps, openCallback, openCallbackArgs) => ({
  type: OPEN_MODAL,
  payload: {
    modalIdentifier,
    modalProps,
    openCallback,
    openCallbackArgs
  }
});

/**
 * Action for closing a modal.
 *
 * @param modalIdentifier the id of the modal to close
 * @param closeCallback the function to be executed when the modal closes
 * @param closeCallbackArgs array of the arguments of the aforementioned function
 */
export const closeModalAction = (modalIdentifier, closeCallback, closeCallbackArgs) => ({
  type: CLOSE_MODAL,
  payload: {
    modalIdentifier,
    closeCallback,
    closeCallbackArgs
  }
});


