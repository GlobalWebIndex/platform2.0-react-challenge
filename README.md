# GlobalWebIndex Engineering Challenge

## Used contributed libraries/dependencies

- "@ant-design/icons": Package that provides Ant Design SVG icons - Used in various buttons in the app
- "axios": Promise based HTTP client. Helped on the required API requests to the external API.
- "react-router-dom": Helped on defining the application routing configuration and handling.
- "react-jss": CSS in JS library - Used for styling all the reusable components.
- "react-scripts": React create app was used to help with defining the development toolchain and easily setup the environment.

## Features 2 be added (left out due to time restrictions)

Due to time constraints unfortunately there were a couple of things that were not but soon will be implemented!

- Caching of requests. Maybe using React context or localstorage items (ie: for favourite ids) would be great. Examples:
  - We could easily use React.createContext() for the breeds list (/breeds route) so we don't have to request the same data on rerouting
  - Think about adding the favourite ids (the request performed in '/favourites' API endpoint) in localstorage and update them upon addition/removal from favourites button - could help on reducing the /favourites requests
- It's not a huge app but maybe it would make sense to use a mini design system/style guide/theme config (at least to have a structure of the different colors/box shadows/borders/font rules in a central place)
- Add tests for every component - now only basic/demo tests are added.
- Super extensive and more robust handling of API response data. (Eg: what happens if response attribs do not exist?)
- Prevent state changes on a component that has been unmounted. Probably extend useAsync hook for this reason.

## Exercise: CatLover - That's what was implemented :)

Create an Elm or React application for cat lovers which is going to build upon thecatapi.com and will have 3 views.
The first view displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the url of the modal and send it to your friends - they should see the same image as you can see.

The second view displays a list of cat breeds. Each breed opens a modal again with a list of cat images of that breed. Each of those images must be a link to the image detail from the previous point.

The third view allows you do the following things:

- Display your favourite cats
- Remove an image from your favourites (use any UX option you like)

You can find the API documentation here: https://docs.thecatapi.com/
We give you a lot of freedom in technologies and ways of doing things. We only insist on you using React.js or the Elm language. Note that we have omitted a lot of details in this description which we hope you will fill in and thus prove to us that you are aware of industry best practices and that you also follow them. Get creative as much as you want, we WILL appreciate it. You will not be evaluated based on how well you follow these instructions, but based on how sensible your solution will be. In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.
