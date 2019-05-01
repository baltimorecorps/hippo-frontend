This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Structures:
All important components are put inside the src/components folder,
which consists the following subfolders:
1 Login 2 Profile 3SearchContact 4TalentHome 5 Other
For current milestone "ResumeBuilder", the relavant subfolder is the second one: Profile.

The src/components/Profile subfolder consists 13 js files /components, which can be organized into 
four groups, each group is focused on a certain function.
Group1: 
Experience.js
ExperienceForm.js
ExperienceItem.js
ExperienceUpdateForm.js

These four components are built around the aim of implementing functions for users to check/add/revise/delete
any of their exprience items.This group is the only relevant group for our current SPRINT.


Group2:
Education.js
EducationForm.js
EducationItem.js

Group3:
Skill.js
SkillForm.js
SkillItem.js

Group4:
TalentProfile.js
TalentBasicInfo.js

Note: PastExperience.js is a component used for previous sprints but not useful for current or future sprints.


## Packages used (with justification)

TODO: Go back over dependencies from Brown team and list key ones here with justifications

We'll use Redux to manage application state, since it provides a clean
framework for doing so (and it's basically an industry standard at this point)

https://redux.js.org/introduction/motivation
See also: https://react-redux.js.org/

`redux-starter-kit` is used to manage state with Redux. We're not doing anything
too fancy so we'll make use of the opinionated defaults provided by this package

https://redux-starter-kit.js.org/introduction/quick-start

Note: There are a bunch of patterns/libraries included in this package. Here's
some supplementary reading to understand where they come from and why
https://github.com/erikras/ducks-modular-redux
https://github.com/immerjs/immer
https://github.com/reduxjs/reselect


`fetch-action-creator` is used to link Redux actions to our API. We were already
using the Fetch API so this is a clean extension of that

https://medium.com/@Charles_Stover/the-fetch-api-and-asynchronous-redux-state-203270a540d4
See also: https://github.com/reduxjs/redux-thunk

`jest` is used for unit testing. Since we're a bit less familiar with React
testing frameworks, we'll go with what Facebook suggests. Also as a test runner
the interface seems pretty simple, and it includes Expect

https://jestjs.io/

`fetch-mock` is used to do unit testing of the Redux action creators which
need to call out to the API to do their thing. 

http://www.wheresrhys.co.uk/fetch-mock/


Maybe:
https://github.com/paularmstrong/normalizr

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
