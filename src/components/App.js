import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';

import ErrorBoundary from '../atoms/ErrorBoundary';

import Home from './Other/Home.js';
import TalentProfile from './Profile/TalentProfile.js';
import Contacts from './Contacts/Contacts.container';
import theme from '../styles/theme';
import { Icon } from 'semantic-ui-react';

import GeneratedResumePage from '../pages/GeneratedResumePage';

const App = () => (
  <ErrorBoundary fileName="src/App.js">
    <MuiThemeProvider theme={theme}>
      <Router>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Link to="/">
                <MenuItem>
                  <Icon name="home" />
                </MenuItem>
              </Link>
              <Link to="/Resume">
                <MenuItem>Generated Resume</MenuItem>
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

            <Route exact path="/Resume" component={GeneratedResumePage} />
            <Route exact path="/Contacts" component={Contacts} />
            {/*<Route exact path='/TalentProfile' component={TalentProfile} />*/}
            <Route path="/Profile/:contactId" component={TalentProfile} />
          </Switch>
        </React.Fragment>
      </Router>
    </MuiThemeProvider>
  </ErrorBoundary>
);

export default App;
