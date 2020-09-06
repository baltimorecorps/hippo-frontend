import {connect} from 'react-redux';
import ApplicantsOverview from './ApplicantsBoard';
import {
  getSubmittedContacts,
  approveNewContactsStatus,
  addContactsFilters,
} from 'state/contacts';

const mapStateToProps = state => {
  const submittedApplicants = state.contacts['submitted'] || [];
  const filteredContacts = state.contacts['filtered'] || [];

  return {
    submittedApplicants,
    filteredContacts,
  };
};

const mapDispatchToProps = dispatch => ({
  getSubmittedContacts: () => getSubmittedContacts(dispatch),
  approveNewContactsStatus: applicantIds =>
    approveNewContactsStatus(applicantIds)(dispatch),
  addContactsFilters: filters => addContactsFilters(filters)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsOverview);
