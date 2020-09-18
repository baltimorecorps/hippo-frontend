import React, {useEffect, useRef} from 'react';
import ReactGA from 'react-ga';
import {createClickTracking} from 'lib/helperFunctions/helpers';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Footer from 'components/Footer';
import NavBarIcons from 'components/NavigationBar/NavBarIcons';
import HomeIcon from '@material-ui/icons/Home';

import ErrorBoundary from 'lib/atoms/ErrorBoundary';
import Resume from 'components/Resume/Resume';

import {ProfileAuth, ProfileStaff} from 'components/ProfilePage';
import theme from 'styles/theme';

import {useAuth0} from 'lib/Auth0/auth0';

import Home from 'components/Home/Home';
import Contacts from 'components/Contacts/Contacts.container';
import ResumeView from 'components/Resume/ResumeView';

import CandidateOpportunitiesPage from 'components/CandidateOpportunitiesPage';
import InternalOpportunitiesPage from 'components/Internal/AddOrEditOpportunitiesPage';
import ApplicationForm from 'components/ApplicationForm';
import ConfirmationPage from 'components/ApplicationForm/ConfirmationPage';
import InternalOpportunitiesBoard from 'components/Internal/OpportunitiesBoard';
import StaffViewApplication from 'components/Internal/StaffViewApplication/StaffViewApplication.container';
import StaffConfirmationPage from 'components/Internal/OpportunitiesBoard/StaffConfirmationPage';
import PartnershipsPage from 'components/Internal/PartnershipsPage/';
import EmployerPage from 'components/Employer/EmployerPage';
import EmployerViewApplication from 'components/Employer/EmployerViewApplication/';
import FAQPage from 'components/FAQPage';
import Questionnaire from 'components/Questionnaire';
import ApplicantsBoard from 'components/Internal/ApplicantsBoard';
import ApplicantPage from 'components/Internal/ApplicantPage';

const App = ({
  hasSession,
  getSession,
  createSession,
  deleteSession,
  classes,
}) => {
  const {
    isAuthenticated,
    getTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const loadingSession = useRef(false);
  const creatingSession = useRef(false);

  // Attempts to load the session if we don't currently have one
  useEffect(() => {
    const loadSession = async () => {
      if (hasSession) {
        return;
      }

      if (!loadingSession.current) {
        loadingSession.current = true;
        const response = await getSession();
        if (response.statusCode === 200) {
          return;
        }
      }
    };
    loadSession();
  }, [hasSession, getSession]);

  // Tries to create a new session if we land from authentication
  useEffect(() => {
    const getNewSession = async () => {
      if (hasSession || !isAuthenticated) {
        return;
      }

      if (!creatingSession.current) {
        creatingSession.current = true;

        try {
          const result = await createSession(getTokenSilently);
        } catch (error) {
          console.error(error);
        }
        creatingSession.current = false;
      }
    };
    getNewSession();
  }, [
    isAuthenticated,
    getSession,
    hasSession,
    createSession,
    getTokenSilently,
  ]);

  useEffect(() => {
    ReactGA.initialize('UA-156685867-1');
    // to report page view
    ReactGA.set({page: window.location.pathname});

    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const onClickLogInHandler = () => {
    createClickTracking(
      'Navigation Bar',
      'Click Log In/Sign Up',
      'Click Log In/Sign Up Button'
    );
    loginWithRedirect({});
  };

  const onClickLogOutHandler = () => {
    createClickTracking(
      'Navigation Bar',
      'Click Log Out',
      'Click Log Out Button'
    );
    (async () => {
      await deleteSession();
      logout({
        returnTo: window.location.origin,
      });
    })();
  };

  const onClickOpportunities = () => {
    createClickTracking(
      'Navigation Bar',
      'Click Opportunities',
      'Click Opportunities Link'
    );
  };

  return (
    <ErrorBoundary fileName="src/App.js">
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={classes.page}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Link to="/">
                  <MenuItem>
                    <HomeIcon className={classes.homeIcon} />
                  </MenuItem>
                </Link>

                {(hasSession || isAuthenticated) && (
                  <Link
                    to="/opportunities"
                    onClick={onClickOpportunities}
                    className={classes.links}
                  >
                    <Typography>Opportunities</Typography>
                  </Link>
                )}

                <div className={classes.grow} />

                {!hasSession && !isAuthenticated && (
                  <Button color="inherit" onClick={onClickLogInHandler}>
                    <Typography>Log in / Sign up</Typography>
                  </Button>
                )}
                {(hasSession || isAuthenticated) && (
                  <NavBarIcons logout={onClickLogOutHandler} />
                )}
              </Toolbar>
            </AppBar>
            <Toolbar /> {/* for automatic padding of AppBar */}
            <Switch>
              <Route exact path="/" component={Home} />

              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/questionnaire" component={Questionnaire} />

              <Route exact path="/resume/:contactId" component={ResumeView} />
              <Route exact path="/resume/:gdocId" component={Resume} />

              <Route exact path="/profile/" component={ProfileAuth} />
              <Route
                exact
                path="/opportunities/"
                component={() => <CandidateOpportunitiesPage page="main" />}
              />
              <Route
                exact
                path="/opportunities/mayoral-fellowship"
                component={() => (
                  <CandidateOpportunitiesPage page="Mayoral Fellowship" />
                )}
              />
              <Route
                path="/application/:opportunityId"
                component={ApplicationForm}
              />
              <Route path="/confirmation-page" component={ConfirmationPage} />
              <Route path="/faq" component={FAQPage} />

              {/* Internal Pages */}
              <Route
                path="/internal/partnerships"
                component={PartnershipsPage}
              />
              <Route
                exact
                path="/internal/add-or-edit-opportunities/"
                component={InternalOpportunitiesPage}
              />
              <Route
                exact
                path="/internal/opportunities-board"
                component={InternalOpportunitiesBoard}
              />
              <Route
                exact
                path="/internal/applicants/:contactId"
                component={ApplicantPage}
              />
              <Route
                exact
                path="/internal/applicants-board"
                component={ApplicantsBoard}
              />
              <Route
                path="/opportunities/:opportunityId/contacts/:contactId/internal-review"
                component={StaffViewApplication}
              />
              <Route
                path="/opportunities/:opportunityId/contacts/:contactId/employer-review"
                component={EmployerViewApplication}
              />

              <Route
                path="/staff-confirmation-page"
                component={StaffConfirmationPage}
              />
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
              {/* Employer Pages */}
              <Route
                path="/org/opportunity/:opportunityId/"
                component={EmployerPage}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
};

const styles = ({breakpoints, palette, spacing, zIndex}) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: zIndex.drawer + 1,
  },

  page: {
    backgroundColor: 'hsl(216, 18%, 89%)',
    paddingBottom: spacing(6),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: `100vh`,
    position: 'relative',
  },
  homeIcon: {fontSize: '35px'},
  links: {
    marginLeft: spacing(2),
  },
});

export default withStyles(styles)(App);
