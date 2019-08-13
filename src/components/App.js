import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';

import ErrorBoundary from 'atoms/ErrorBoundary';

import Home from './Other/Home.js';
import TalentProfile from './Profile/TalentProfile.container';
import Contacts from './Contacts/Contacts.container';
import theme from 'styles/theme';

import GeneratedResumePage from 'pages/GeneratedResumePage/GeneratedResumePage.container';
import CreateResumePage from 'pages/CreateResumePage';

const App = () => (
  <ErrorBoundary fileName="src/App.js">
    <MuiThemeProvider theme={theme}>
      <Router>
        <React.Fragment>

          <AppBar position="static">
            <Toolbar>
              <Link to="/">
                <MenuItem>
                  <Icon>home</Icon>
                </MenuItem>
              </Link>
              {/* TODO change all urls to lowercase */}
              <Link to="/Resume">
                <MenuItem>Generated Resume</MenuItem>
              </Link>
              <Link to="/create-resume">
                <MenuItem>Create Resume</MenuItem>
              </Link>
              <Link to="/Contacts">
                <MenuItem>Contacts</MenuItem>
              </Link>
            </Toolbar>
          </AppBar>

          <Switch>
            {/*<Route path="/" component={AuthPage} />*/}
            {/*<Route exact path='/' component={AuthPage} />*/}
            <Route exact path="/" component={Home} />

            <Route exact path="/Contacts/:contactId/Resume/:resumeId" component={GeneratedResumePage} />
            <Route exact path="/Contacts" component={Contacts} />
            {/*<Route exact path='/TalentProfile' component={TalentProfile} />*/}
            <Route path="/Profile/:contactId" component={TalentProfile} />
            <Route exact path="/Contacts/:contactId/create-resume" component={CreateResumePage} />
            <Route exact path="/Contacts/:contactId/create-resume/:resumeId" component={CreateResumePage} />
          </Switch>

        </React.Fragment>
      </Router>
    </MuiThemeProvider>
  </ErrorBoundary>
);

export default App;
