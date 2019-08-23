import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

import ErrorBoundary from 'atoms/ErrorBoundary';

import Home from 'components/Other/Home.js';
import TalentProfile from 'components/Profile/TalentProfile.container';
import Contacts from 'components/Contacts/Contacts.container';
import theme from 'styles/theme';

import GeneratedResumePage from 'pages/GeneratedResumePage/GeneratedResumePage.container';
import CreateResumePage from 'pages/CreateResumePage';

const App = ({classes}) => (
  <ErrorBoundary fileName="src/App.js">
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={classes.page}>

          <AppBar position="fixed">
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
          <Toolbar />

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

        </div>
      </Router>
    </MuiThemeProvider>
  </ErrorBoundary>
);

const styles = ({ breakpoints, palette, spacing }) => ({
  page: {
    backgroundColor: 'hsl(216, 18%, 89%)',
    paddingBottom: `${spacing.unit * 5}px`,
  },
});

export default withStyles(styles)(App);
