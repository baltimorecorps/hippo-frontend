import {connect} from 'react-redux';
import ApplicationsCard from './ApplicationsCard';
import {getContactApplications} from 'state/opportunity';
import {getContact} from 'state/contacts';

const mapStateToProps = (state, props) => {
  const {contactId} = props.match.params;

  const applications = Object.values(state.applications);
  const applicant = Object.values(state.contacts).filter(
    contact => contact.id == contactId
  );

  return {
    applications: applications[0],
    applicant: applicant[0],
    contactId: Number(contactId),
  };
};

const mapDispatchToProps = dispatch => ({
  getContactApplications: contactId =>
    getContactApplications(contactId)(dispatch),
  getContact: contactId => getContact(contactId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsCard);
