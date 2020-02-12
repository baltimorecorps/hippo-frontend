import {connect} from '../../node_modules/react-redux';
import {getSession, createSession, deleteSession} from '../state/contacts';
import App from './App';

export const mapStateToProps = state => {
  const keys = Object.keys(state.programs);
  return {
    hasSession: state.accounts.has_session || false,
    contact: state.accounts.contact || null,
  };
};

export const mapDispatchToProps = dispatch => ({
  getSession: () => getSession()(dispatch),
  createSession: fetchToken => createSession(fetchToken)(dispatch),
  deleteSession: () => deleteSession()(dispatch),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
