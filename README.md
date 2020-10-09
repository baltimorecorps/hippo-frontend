# Baltimore Corps Hippo Web App

## Frontend File Structure

- app
- components
  - AboutMe
  - ApplicationForm
  - CandidateOpportunitiesPage
  - CapabilityScores
  - Contacts
  - DynamicInstructions
  - Employer
    - EmployerPage
    - EmployerViewApplication
  - Experiences
  - FAQPage
  - Footers
    - DecisionsFooter
    - MainFooter
  - Home
  - Internal
    - AddOrEditOpportunitiesPage
    - ApplicantPage
    - ApplicantsBoard
    - Cards
    - OpportunitiesBoard
    - PartnershipsPage
    - StaffViewApplication
  - NavigationBar
  - Profile Page
  - ResumeCreator
  - SideBarDrawer
  - Skills
  - ViewFullApplication
- lib
- state
- styles

### app

This is where we keep App.js

### components

Large components that correspond to entities represented in the database.

These are built with `atoms` and existing Material UI components.

### lib

Various utilities and globally (or semi-globally) used functions.

### state

Redux related actions and reducers to manage application state belong here.

### styles

Currently contains the theme for Material UI.

## Packages used (with justification)

### Redux

- Manage application state
- https://redux.js.org/introduction/motivation
- https://react-redux.js.org/

### Redux Starter Kit

- https://redux-starter-kit.js.org/introduction/quick-start
- Includes various patterns/libraries so here is some supplementary reading to understand them
  - https://github.com/erikras/ducks-modular-redux
  - https://github.com/immerjs/immer
  - https://github.com/reduxjs/reselect

### Fetch Action Creator

- Links Redux actions to our API.
- https://medium.com/@Charles_Stover/the-fetch-api-and-asynchronous-redux-state-203270a540d4

### Jest

- Unit testing
- https://jestjs.io/

### Fetch mock

- Unit testing of the Redux action creators which call the API
- http://www.wheresrhys.co.uk/fetch-mock/

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
