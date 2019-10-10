
# React Challenge

## Introduction, Concerns && Todos

This is implementation is based on use-global-hook as a SSOT for state management.
Some simple hooks where applied on components not part of main application state.
For avoiding heavy usage of `any` Typescript seems not suited for applying on existing projects.

Missing features

- Adding toaster component when user presses share link to copy to clipboard.
- Since ICat model contains image dimension some custom styling could be applied on modal cat details window to avoid showing the scrollbar.

## How to setup

```bash
npm install 

npm start
```

## UI Components Libraries

- [Blueprint](https://blueprintjs.com)
- [React Grid System](https://github.com/sealninja/react-grid-system)

## Challenge keypoints

- [x] `1st View` - displays a list of 10 random cat images and a button to load more
- [x] Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available
- [x] The modal should also contain a form to mark the image as your favourite (a part of the `3rd view` as well)
- [x] Make sure you can copy-paste the url of the modal and send it to your friends (history implementation)
- [x] `2nd View` -  displays a list of cat breeds
- [x] Each breed opens a modal again with a list of cat images of that breed
- [x] Each of those images must be a link to the image detail from the previous point.
- [x] `3rd View` allows you do the following - Display your favourite cats
- [x] `3rd View` allows you do the following - Mark a specific image as your favourite (*correction since it makes no sense)

## Documentation Pages

[React Router](https://reacttraining.com/react-router/web/guides/quick-start)

[Hooks](https://reactjs.org/docs/hooks-effect.html)

[Model management](https://reactjs.org/community/model-management.html)

[Cat API](https://docs.thecatapi.com/)

## Sources

[Challenge Details](https://github.com/GlobalWebIndex/platform2.0-elm-challenge)

[The 100% correct way to structure a React app (or why there’s no such thing)](https://medium.com/hackernoon/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)

[Container Components](https://medium.com/@learnreact/container-components-c0e67432e005)

[The React Cookbook: Advanced Recipes to Level Up Your Next App](https://www.youtube.com/watch?v=lG6Z0FQj_SI)

[React Pure Components](https://www.youtube.com/watch?v=PXXjkq4A-OU)

[Saga](https://www.youtube.com/watch?v=o3A9EvMspig)

[*GOTO 2015 • Applying the Saga Pattern • Caitie McCaffrey](https://www.youtube.com/watch?v=xDuwrtwYHu8)

[Typescript in React](https://www.youtube.com/watch?v=BnIhk4igd8I)

[React Router Typescript](https://www.pluralsight.com/guides/react-router-typescript)

[Thunk vs Saga](https://www.youtube.com/watch?v=BnIhk4igd8I)

[Undux - Dead simple React State](https://github.com/bcherny/undux-todomvc/tree/master/src)

[useGlobalHook Hooks State Management](https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8)

[*Differences between React Redux Thunk and Elm](https://morioh.com/p/2efd72bc499b)
