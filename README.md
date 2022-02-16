# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
### `npm test`
### `npm run build`
### `npm run eject`

# Libraries Used

### React Router

React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.

### Axios

Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.

### Material UI

Material-UI is simply a library that allows us to import and use different components to create a user interface in our React applications. This saves a significant amount of time since the developers do not need to write everything from scratch.

### Emotion

Emotion is a high performance, flexible, and performant CSS-in-JS library. Emotion helps us to style our application in a faster way, with a decent and consistent CSS composition.

### Facepaint

While defining media queries in constants is much easier than rewriting media queries each time, they’re still quite verbose since you usually want to change the same property at different breakpoints. facepaint makes this easier by allowing you to define what each css property should be at each media query as an array.

### Lodash

Lodash is a JavaScript library that provides utility functions for common programming tasks using a functional programming paradigm; it builds upon the older underscore. js library. Lodash has several built-in utility functions that make coding in JavaScript easier and cleaner.

### Improvements that could be made (lack of more time)

Originally, due to low complexity of the pages(not much prop drilling), I thought that using state management like Redux would be unnecessary pain to install. Although, I think that using react context and reducers for the favourite cats could be a nice improvement. 
Another improvement would be the caching of the cats in the home page, so as we would not have unnecessary fetching every time the user went to the home page. This could be made maybe with react-query or SWR but I have never used them before.
Also, I would like to refactor some pieces of code that are used in many places / break code in smaller pieces (utils folder perhaps) and remove some "any" in typescript.
Finally, if I hod more time i would make more tests and storybook for every component.

If you have any other questions please do not hesitate to reach out.