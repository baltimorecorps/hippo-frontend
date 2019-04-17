import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';

import ErrorBoundary from '../atoms/ErrorBoundary';
import AuthPage from './LogIn/AuthPage';

import Home from "./Other/Home.js";
import LogInSignUp from "./LogIn/LogInSignUp.js";
import ContactForm from './LogIn/ContactForm.js';
import ContactInfo from './Other/ContactInfo.js';
import TalentHome from './TalentHome/TalentHome.js';
import TalentProfile from './Profile/TalentProfile.js';
import SearchContact from './SearchContact/SearchContact.js';
import SearchContact2 from './SearchContact/SearchContact2.js';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import theme from '../styles/theme';
import ResumeOne from './Profile/ResumeOne.js';
import { Icon } from 'semantic-ui-react';


const App = () => (
  <ErrorBoundary fileName="src/App.js">
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <div>
            <Navbar bg="dark" variant="dark">
                    {/*<Navbar.Brand href="/ContactInfo">Profile</Navbar.Brand>*/}

                    <Nav className="mr-auto">

                    {/*<Nav.Link to={{pathname: '/ContactForm'}}> Contact-Form</Nav.Link>*/}
                    <Nav.Link href="/"> <Icon name='home' /></Nav.Link>
                    
                    <Nav.Link href="/SignUp"> Sign Up</Nav.Link>
                    <Nav.Link href="/ContactForm">Contact Form</Nav.Link>
                    <Nav.Link href="/Talent"> Talent</Nav.Link>
                    <Nav.Link href="/ContactInfo"> Profile</Nav.Link>
                    <Nav.Link href="/TalentProfile"> TalentProfile</Nav.Link>
                    <Nav.Link href="/SearchContact">Search Contact</Nav.Link>
                    <Nav.Link href="/SearchContact2">Search Contact2</Nav.Link>



                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
          </div>
          <Switch>
            {/*<Route path="/" component={AuthPage} />*/}
              {/*<Route exact path='/' component={AuthPage} />*/}
              <Route exact path='/' component={Home} />
              
              <Route exact path='/SignUp' component={AuthPage} />
              <Route exact path='/ContactInfo' component={ContactInfo} />
              <Route exact path='/Talent' component={TalentHome} />
              <Route exact path='/TalentProfile' component={TalentProfile} />
              <Route exact path='/ContactForm' component={ContactForm} />
              <Route exact path='/SearchContact' component={SearchContact} />
              <Route exact path='/SearchContact2' component={SearchContact2} />
              <Route exact path='/Resume' component={ResumeOne} />




          </Switch>
        </div>

      </Router>
    </MuiThemeProvider>
  </ErrorBoundary>
);

export default App;
