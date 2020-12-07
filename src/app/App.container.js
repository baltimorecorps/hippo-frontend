import {connect} from 'react-redux';
import {getSession, createSession, deleteSession} from 'state/auth/auth.actions.js';
import App from './App';

export const mapStateToProps = state => {
  return {
    hasSession: state.auth.has_session || false,
    contact: state.auth.contact || null,
  };
};

export const mapDispatchToProps = dispatch => ({
  getSession: () => getSession()(dispatch),
  createSession: fetchToken => createSession(fetchToken)(dispatch),
  deleteSession: () => deleteSession()(dispatch),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
