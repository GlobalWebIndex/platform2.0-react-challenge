# GlobalWebIndex Engineering Challenge

## Considerations

### Unit tests

The application doesn't have an increased code coverage. It has the very basic unit tests.

### E2E tests

The application doesn't have an increased code coverage of e2e tests. It has the very basic e2e tests. To run them, use the following command

**To run the tests in a browser**

    `yarn run cypress:open`

**To run the tests headless**

    `yarn run cypress:run`

### Redux

The application size is small enough to accommodate a redux pattern. I have a WIP branch where I can present it upon request.

## Exercise: CatLover

Create an Elm or React application for cat lovers which is going to build upon thecatapi.com and will have 3 views.

**The first view** displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the url of the modal and send it to your friends - they should see the same image as you can see.

**The second view** displays a list of cat breeds. Each breed opens a modal again with a list of cat images of that breed. Each of those images must be a link to the image detail from the previous point.

**The third view** allows you do the following things:

- Display your favourite cats
- Remove an image from your favourites (use any UX option you like)

You can find the API documentation here: https://docs.thecatapi.com/
We give you a lot of freedom in technologies and ways of doing things. We only insist on you using React.js or the Elm language. Note that we have omitted a lot of details in this description which we hope you will fill in and thus prove to us that you are aware of industry best practices and that you also follow them. Get creative as much as you want, we WILL appreciate it. You will not be evaluated based on how well you follow these instructions, but based on how sensible your solution will be. In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.

## Submission

Just a make a PR to the current repo!
Good luck, potential colleague!
