import {connect} from "react-redux";
import {withRouter} from "react-router";
import {refreshResumes} from "actions/resume";
import ResumesList from "./ResumesList";

const mapStateToProps = (state, props) => {
  const {contactId} = props.match.params;
  const resumes = state.resume.resumes;
  return {
    contactId,
    resumes,
  };
};

const mapDispatchToProps = dispatch => ({
  refreshResumes: contactId => refreshResumes(contactId)(dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResumesList)
);
