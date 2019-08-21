# GlobalWebIndex Elm CatLover

There are 2 pages developed inside this repository. 
The home page is the list with the 10 random images from the API. The second one is a breed page which includes a filtered list of the cats according to the breed in the url path.

The project structured initially with the https://github.com/halfzebra/create-elm-app in order to avoid the configuration and use the development server for the app.

In order to run the app you have to run the following after installing the create-elm-app
`elm-app start`

### ---Notes--- 
1. Due to the lack of time and the steep learning curve I did not implement the third view and the favourite cats functionality. Also the UI is too simple and I use the bootrstrap css  in order to use some css classes for a responsive image list and modal.
2. Also the second view is a list of the cats of the same breed and not a list of the breeds which will trigger a modal then with the cats list.
3. I tried to follow the one file approach except of my models. HTTP, routes, decoders are all in the same Main.elm file. 
