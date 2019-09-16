# CAT

To run the project, start in a terminal the following commands in sequence:
 
 -  `yarn`
 - `yarn start`

## What is done
The application implements everything that was mentioned in the requirements.

## What is missing

There are no unit tests :(. While I believe that unit tests are very important and part of industry best practices, I have not added any due to time reason.

The CSS is very basic, most of the CSS relies on Bootsrap.

A strong typing system such as Typescript would be beneficial is the project is meant to grow.


## What can be improved

There is some boilerplate related to redux that can be removed. This is a team decision, personally it does not bother me.

While Prettier has been used for the indentation, it would have been better to add a hook on pre-commit to do it automatically.

The CSS will not scale as it is, a solution such as CSS-in-JS woudld be preferable.

A redux middleware could be added to simplify and enforce consistency when ajax calls are made.

The error message is generic, it would be nicer to be customized in relation of the action of the user.

