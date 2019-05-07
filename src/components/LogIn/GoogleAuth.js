import React from 'react';
import Button from '@material-ui/core/Button';
import { BrowserRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: false,
  };
  componentDidMount() {
    window.gapi.load('client: auth2', () => {
      window.gapi.client
        .init({
          clientId: '603681871778-8rigkcemr16r90hgmfjmapse6fj7bf77.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };
  onSignIn = () => {
    this.auth.signIn();
  };
  onSignOut = () => {
    this.auth.signOut();
  };
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return null;
    } else {
      var styleHome = {
        fontSize: 18,
        padding: '5px 0px',
      };
      return (
        <BrowserRouter>
          <div>
            <Navbar>
              <Nav className="mr-auto">
                <Nav.Link href="/ContactForm" style={styleHome}>
                  <Button
                    onClick={this.onSignIn}
                    type="submit"
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                  >
                    Log in with Google
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar>
          </div>
        </BrowserRouter>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
export default GoogleAuth;
