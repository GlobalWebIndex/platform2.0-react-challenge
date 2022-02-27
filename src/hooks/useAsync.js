import React from "react";

/**
 * Default async callback statuses
 */
const AsyncStatus = Object.freeze({
  IDLE: "idle",
  PENDING: "pending",
  REJECTED: "rejected",
  RESOLVED: "resolved",
});

function asyncReducer(state, action) {
  switch (action.type) {
    case AsyncStatus.PENDING: {
      return {
        status: AsyncStatus.PENDING,
        data: action.existingData?.length > 0 ? action.existingData : null,
        error: null,
      };
    }
    case AsyncStatus.RESOLVED: {
      return { status: AsyncStatus.RESOLVED, data: action.data, error: null };
    }
    case AsyncStatus.REJECTED: {
      return { status: AsyncStatus.REJECTED, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/**
 * useAsync utility hook.
 *
 * Used to perform async (promise based) requests.
 * Can be run in a React component like this:
 *
 * const { data, status, error, run } = useAsync();
 * useEffect(() => {
 *   const callback = yourAsyncCallback()
 *   run(callback);
 * }, [run]);
 *
 * @param {*} initialState
 * @returns
 *   error: Possible returned async request error,
 *   status: IDLE/PENDING/REJECTED/RESOLVED,
 *   data: Async response data
 *   run: Async callback to run,
 */
function useAsync(initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: AsyncStatus.IDLE,
    data: null,
    error: null,
    // We may want to override the default reducer state
    // when making an async request.
    ...initialState,
  });

  const { data, error, status } = state;

  const run = React.useCallback(
    // existing data (dataToAppend) are used in load more functionality
    (promise, dataToAppend = []) => {
      dispatch({ type: AsyncStatus.PENDING, existingData: dataToAppend });
      promise.then(
        (data) => {
          dispatch({
            type: AsyncStatus.RESOLVED,
            data: dataToAppend?.length > 0 ? [...dataToAppend, ...data] : data,
          });
        },
        (error) => {
          dispatch({ type: AsyncStatus.REJECTED, error });
        }
      );
    },
    [dispatch]
  );

  return {
    // Possible returned async request error
    error,
    // One of the AsyncStatus array (see above) elements
    status,
    // Async response data
    data,
    // Async callback to run
    run,
  };
}

export { useAsync, AsyncStatus };
