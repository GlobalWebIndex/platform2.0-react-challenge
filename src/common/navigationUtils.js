import { hashHistory } from 'react-router';

/**
 * Navigates to the provided url. If state is provided the navigation is
 * this state will be available in the target component under
 * props.location.state.
 *
 * @param url the target location
 * @param state the state to provide to the target component
 * @param elementId the element's id to scroll into after navigating to new page
 */
export const navigate = (url, state) => {
  const navigationPath = url.startsWith('/') ? url : `/${url}`;
  if (state) {
    hashHistory.push(
        {
          pathname: navigationPath,
          state
        }
    );
  } else {
    hashHistory.push(navigationPath);
  }
};
