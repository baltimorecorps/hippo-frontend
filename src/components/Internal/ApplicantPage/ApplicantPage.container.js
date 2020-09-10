import {connect} from 'react-redux';
import ApplicantPage from './ApplicantPage';
import {getContactApplications} from 'state/opportunity';
import {getContact} from 'state/contacts';

const mapStateToProps = (state, props) => {
  const {contactId} = props.match.params;

  const applications = state.applications[contactId];
  const applicant = state.contacts[contactId];

  return {
    applications,
    applicant,
    contactId: Number(contactId),
  };
};

const mapDispatchToProps = dispatch => ({
  getContactApplications: contactId =>
    getContactApplications(contactId)(dispatch),
  getContact: contactId => getContact(contactId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantPage);
