import React, {useEffect, useRef} from 'react';
import ReactGA from 'react-ga';
import {createClickTracking} from 'lib/helperFunctions/helpers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

import MainFooter from 'components/footerComponents/MainFooter';


import ErrorBoundary from 'lib/atoms/ErrorBoundary';

import UserProfilePage from "../pages/userPages/userProfilePage";

import ProfileAuth from '../pages/utilityPages/authProfileLoader'

import theme from 'styles/theme';

import {useAuth0} from 'lib/Auth0/auth0';

import Contacts from 'pages/adminPages/adminContactsPage/Contacts.container';

import CandidateOpportunitiesPage from 'pages/userPages/userOpportunitiesPage';
import InternalOpportunitiesPage from 'pages/adminPages/adminAddOrEditOpportunitiesPage';
import ApplicationForm from 'pages/userPages/userApplicationProcessPage';
import ConfirmationPage from 'components/applicationProcessComponents/ConfirmationPage';
import InternalOpportunitiesBoard from 'pages/adminPages/adminOpportunitiesBoardPage';
import StaffViewApplication from 'pages/adminPages/adminViewApplicationPage/StaffViewApplication.container';
import PartnershipsPage from 'pages/adminPages/adminPartnershipPage';
import EmployerPage from 'pages/employerPages/employerPage';
import EmployerViewApplication from 'pages/employerPages/employerViewApplicationPage';
import FAQPage from 'pages/utilityPages/faqPage';
import ApplicantsBoard from 'pages/adminPages/adminApplicantsBoardPage';
import ApplicantPage from 'pages/adminPages/adminApplicantPage';
import Error404Page from 'pages/utilityPages/error404Page';
import LandingPage from 'pages/utilityPages/homePage/landingPage';

import MainNav from '../components/navbarComponents/mainNav'
import CrelateTransition from 'components/opportunitiesComponents/crelateTransition';

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
          await createSession(getTokenSilently);
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
    <ErrorBoundary fileName="src/app/App.js">
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={classes.page}>
          
            <MainNav classes={classes} hasSession= {hasSession} isAuthenticated={isAuthenticated} onClickOpportunities={onClickOpportunities} onClickLogInHandler={onClickLogInHandler}  onClickLogOutHandler={onClickLogOutHandler}/>
            
            <Toolbar /> {/* for automatic padding of AppBar */}
            <Switch>
              <Route exact path="/" component={LandingPage} />

              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/profile/" component={ProfileAuth} />

              {/* <Route
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
                exact
                path="/opportunities/fellowship"
                component={() => (
                  <CandidateOpportunitiesPage page="Fellowship" />
                )}
              /> */}
              <Route
                exact
                path="/opportunities"
                component={CrelateTransition}
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
                exact
                path="/profile/:contactId"
                component={UserProfilePage}
              />

              {/* Employer Pages */}
              <Route
                path="/org/opportunity/:opportunityId/"
                component={EmployerPage}
              />
              <Route path="*" component={Error404Page} />
              
            </Switch>
            <MainFooter />
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
