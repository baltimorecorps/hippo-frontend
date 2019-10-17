import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";

import ErrorBoundary from "atoms/ErrorBoundary";
import GeneratedResumePage from "pages/GeneratedResumePage";
import CreateResumePage from "pages/CreateResumePage";
import ProfilePage from "pages/ProfilePage";
import theme from "styles/theme";

/* TODO remove these or move to pages folder */
import Home from "components/Other/Home.js";
import Contacts from "components/Contacts/Contacts.container";
import SearchContact from "components/SearchContact/SearchContact";
import ResumeTemplate from "components/Other/ResumeTemplate";
import TalentHome from "components/TalentHome/TalentHome";

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
              <Link to="/resume">
                <MenuItem>Generated Resume</MenuItem>
              </Link>
              <Link to="/create-resume">
                <MenuItem>Create Resume</MenuItem>
              </Link>
              <Link to="/contacts">
                <MenuItem>Contacts</MenuItem>
              </Link>
            </Toolbar>
          </AppBar>
          <Toolbar /> {/* for automatic padding of AppBar */}
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/search-contact" component={SearchContact} />

            <Route exact path="/resume-template" component={ResumeTemplate} />
            <Route exact path="/talent-home" component={TalentHome} />

            <Route exact path="/profile/:contactId" component={ProfilePage} />

            <Route
              exact
              path="/contacts/:contactId/Resume/:resumeId"
              component={GeneratedResumePage}
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

const styles = ({breakpoints, palette, spacing}) => ({
  page: {
    backgroundColor: "hsl(216, 18%, 89%)",
    paddingBottom: spacing(5),
  },
});

export default withStyles(styles)(App);
