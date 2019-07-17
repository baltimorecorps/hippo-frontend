import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import Resumes from './Resumes';
import { refreshResumes } from '../../actions/resume';

const mapStateToProps = (state, props) => {
  const {contactId} = props.match.params;
  const resumes = Object.values(state.resume);
  return {
    contactId,
    resumes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  refreshResumes: (contactId) => refreshResumes(contactId)(dispatch),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resumes));
