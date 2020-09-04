import {connect} from 'react-redux';
import ApplicantsOverview from './ApplicantsOverview';
import {
  getSubmittedContacts,
  getApprovedContacts,
  approveNewContactsStatus,
  addContactsFilters,
} from 'state/contacts';

const mapStateToProps = state => {
  const approvedApplicants = state.contacts['approved'] || [];
  const submittedApplicants = state.contacts['submitted'] || [];
  const filteredContacts = state.contacts['filtered'] || [];

  return {
    submittedApplicants,
    approvedApplicants,
    filteredContacts,
  };
};

const mapDispatchToProps = dispatch => ({
  getSubmittedContacts: () => getSubmittedContacts(dispatch),
  getApprovedContacts: () => getApprovedContacts(dispatch),
  approveNewContactsStatus: applicantIds =>
    approveNewContactsStatus(applicantIds)(dispatch),
  addContactsFilters: filters => addContactsFilters(filters)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsOverview);
