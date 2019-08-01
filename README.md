# GWI Elm

We have 3 Pages : Page 1, Page 2 and Page 3 according to the challenge description.
The Decoders and Contracts modules are used to create Decoders for Json responses as well as Model types 
Ports is used for local storage to persist favorite cats data

In order to build the app you have to run the following
`elm make src/Main.elm --output elm.js`

In order to constantly updating current view you have to run the following
`elm-live src/Main.elm --open -- --output=elm.js`

To save the favorites, a state module is responsible for saving in a Dict structure

Used bootstrap (but non overdid it)

Modal was implemented using Tesk9 package

To run the example you have to run on top folder
`elm reactor`
and go to http://localhost:8000/index.html to see the application live

### ---Disclaimer--- 
1. Normally I would split even further the code to Views,Updates,Models,Messages but due to time constraint I was not able to achieve it. 
2. Internationalization missing
3. On saving as favorite the following would happen normally:
   - Initialize the app with actual favorite data from server
   - Send a post request to server
4. On second page I believe it is for the better to actually reopen the familiar first page instead of opening a modal on top of the modal
   - Thus the breedId in Page1 to filter out only cats by breed
5. Tried not to overengineer but also tried to create a good application architecture infrastructure
6. Pagination missing
