import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';

import ErrorBoundary from '../atoms/ErrorBoundary';
import AuthPage from './AuthPage';

import Home from "./Home.js";
import LogInSignUp from "./LogInSignUp.js";
import ContactForm from './ContactForm.js';
import ContactInfo from './ContactInfo.js';
import SearchContact from './SearchContact.js';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import theme from '../styles/theme';
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
                    <Nav.Link href="/LogInSignUp">LogIn/SignUp</Nav.Link>
                    <Nav.Link href="/SignUp"> Sign Up</Nav.Link>
                    <Nav.Link href="/ContactForm">Contact Form</Nav.Link>
                    <Nav.Link href="/ContactInfo"> Profile</Nav.Link>
                    <Nav.Link href="/SearchContact">Search Contact</Nav.Link>
                    
                    

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
              <Route exact path='/LogInSignUp' component={LogInSignUp} />
              <Route exact path='/SignUp' component={AuthPage} />
              <Route exact path='/ContactInfo' component={ContactInfo} /> 
              <Route exact path='/ContactForm' component={ContactForm} />
              <Route exact path='/SearchContact' component={SearchContact} />
              
              


          </Switch>
        </div>

      </Router>
    </MuiThemeProvider>
  </ErrorBoundary>
);

export default App;
