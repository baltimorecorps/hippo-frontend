import {connect} from 'react-redux';
import ApplicantsOverview from './ApplicantsBoard';
import {
  getSubmittedContacts,
  approveNewContactsStatus,
  addContactsFilters,
} from 'state/contacts';
import {formData} from './defaultValues';

const mapStateToProps = state => {
  const submittedApplicants = state.contacts['submitted'] || [];
  const filteredContacts = state.contacts['filtered'] || [];
  const filterFormData = state.contacts['filter_form_data'] || formData;

  return {
    submittedApplicants,
    filteredContacts,
    filterFormData,
  };
};

const mapDispatchToProps = dispatch => ({
  getSubmittedContacts: () => getSubmittedContacts(dispatch),
  approveNewContactsStatus: applicantIds =>
    approveNewContactsStatus(applicantIds)(dispatch),
  addContactsFilters: (filtersPayload, filterFormData) =>
    addContactsFilters(filtersPayload, filterFormData)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsOverview);
