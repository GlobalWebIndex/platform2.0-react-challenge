# CatLover App

## Technology used and dependencies

This is an application initialized with the create-react-app.
The JSS library has been used for styling and the Testing Library (@testing-library/react)
for the UI testing.

Other 3rd party dependencies used on this application:

- React Router, for defining the application routes,
- Axios, for making external HTTP requests,
- Localforage, for storing and retrieving data from the indexDB,
- React Responsive Carousel, for displaying a carousel on the breed modal,
- Body Scroll Lock, for disabling the scrolling when the modal is open.

## Uncompleted work (due to time constraints)

Next steps in terms of completion of this application:

- Handle the "Not Found" scenarios. Those include the following cases:
  -- Invalid urls that aren't included on the app's routes,
  -- Valid urls with invalid parameters. Redirection to a "Not Found" page when the requests for "/images/[id]" or "/breed/[id]" aren't successful.

- Extend Testing in the rest of the components:
  -- Favourites functionality, including empty state, adding/removing items on both modal and route (UI Testing),
  -- Extensive UI testing on all nested sub-components to verify that all the available information is in place,
  -- Unit testing on exported functions of the "src/util/async.js" file
