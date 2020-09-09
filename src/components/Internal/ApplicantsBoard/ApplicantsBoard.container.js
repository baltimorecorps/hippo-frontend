import {connect} from 'react-redux';
import ApplicantsOverview from './ApplicantsBoard';
import {
  getSubmittedContacts,
  approveNewContactsStatus,
  addContactsFilters,
  getAllFilteredContacts,
} from 'state/contacts';
import {formData} from './defaultValues';

const mapStateToProps = state => {
  const submittedApplicants = state.contacts['submitted'] || [];
  const filteredContacts = state.contacts['filtered'];
  const allFilteredContacts = state.contacts['all_filtered_contacts'];
  const filterFormData = state.contacts['filter_form_data'] || formData;

  return {
    submittedApplicants,
    allFilteredContacts,
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
  getAllFilteredContacts: (filtersPayload, filterFormData) =>
    getAllFilteredContacts(filtersPayload, filterFormData)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsOverview);
