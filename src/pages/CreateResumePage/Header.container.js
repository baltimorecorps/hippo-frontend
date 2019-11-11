import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {refreshResume} from 'actions/resume';
import Header from './Header';

export const mapStateToProps = (state, props) => {
  const {contactId, resumeId} = props.match ? props.match.params : props;
  const resume = state.resumes[resumeId];
  return {
    name: resume.name,
  };
};

const mapDispatchToProps = dispatch => ({
  refreshResume: resumeId => refreshResume(resumeId)(dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
