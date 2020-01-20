import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

import HomeIcon from '@material-ui/icons/Home';

import ErrorBoundary from 'atoms/ErrorBoundary';
import Resume from 'modules/Resume';
import CreateResumePage from 'pages/CreateResumePage';
import {ProfileAuth, ProfileStaff} from 'pages/ProfilePage';
import theme from 'styles/theme';

import {useAuth0} from 'lib/auth0';

/* TODO remove these or move to pages folder */
import Home from 'components/Other/Home.js';
import Contacts from 'components/Contacts/Contacts.container';
import SearchContact from 'components/SearchContact/SearchContact';
import TalentHome from 'components/TalentHome/TalentHome';

import NavBarIcons from './components/NavigationBar/NavBarIcons';

const App = ({classes}) => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

  return (
    <ErrorBoundary fileName="src/App.js">
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={classes.page}>
            <AppBar position="fixed">
              <Toolbar>
                <Link to="/">
                  <MenuItem>
                    <HomeIcon className={classes.homeIcon} />
                  </MenuItem>
                </Link>
                <div className={classes.grow} />
                {!isAuthenticated && (
                  <Button color="inherit" onClick={() => loginWithRedirect({})}>
                    Log in / Sign up
                  </Button>
                )}
                {isAuthenticated && (
                  <NavBarIcons
                    logout={() =>
                      logout({
                        returnTo: window.location.origin,
                      })
                    }
                  />
                )}
              </Toolbar>
            </AppBar>
            <Toolbar /> {/* for automatic padding of AppBar */}
            <Switch>
              <Route exact path="/" component={Home} />

              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/search-contact" component={SearchContact} />

              <Route exact path="/resume/:gdocId" component={Resume} />
              <Route exact path="/talent-home" component={TalentHome} />

              <Route exact path="/profile/" component={ProfileAuth} />
              <Route
                exact
                path="/profile/:contactId"
                component={ProfileStaff}
              />

              <Route
                exact
                path="/profile/:contactId/resume/:resumeId"
                component={Resume}
              />
              <Route
                exact
                path="/contacts/:contactId/resume/:resumeId"
                component={Resume}
              />
              <Route
                exact
                path="/contacts/:contactId/create-resume"
                component={CreateResumePage}
              />
              <Route
                exact
                path="/contacts/:contactId/create-resume/:resumeId"
                component={CreateResumePage}
              />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  grow: {
    flexGrow: 1,
  },
  page: {
    backgroundColor: 'hsl(216, 18%, 89%)',
    paddingBottom: spacing(5),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  homeIcon: {fontSize: '35px'},
});

export default withStyles(styles)(App);
