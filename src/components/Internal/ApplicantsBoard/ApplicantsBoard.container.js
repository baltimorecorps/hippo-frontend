import {connect} from 'react-redux';
import ApplicantsOverview from './ApplicantsBoard';
import {
  getSubmittedContacts,
  approveNewContactsStatus,
  addContactsFilters,
  getAllFilteredContacts,
  resetFilterCount,
} from 'state/contacts';
import {formData} from './defaultValues';

const mapStateToProps = state => {
  const submittedApplicants = state.contacts['submitted'] || [];
  const filteredContacts = state.contacts['filtered'];
  const filterCount = state.contacts['filter_count'];
  const allFilteredContacts = state.contacts['all_filtered_contacts'];
  const filterFormData = state.contacts['filter_form_data'] || formData;

  return {
    submittedApplicants,
    allFilteredContacts,
    filteredContacts,
    filterFormData,
    filterCount,
  };
};

const mapDispatchToProps = dispatch => ({
  getSubmittedContacts: () => getSubmittedContacts(dispatch),
  approveNewContactsStatus: applicantIds =>
    approveNewContactsStatus(applicantIds)(dispatch),
  addContactsFilters: (filtersPayload, filterFormData, filterCount) =>
    addContactsFilters(filtersPayload, filterFormData, filterCount)(dispatch),
  getAllFilteredContacts: filterFormData =>
    getAllFilteredContacts(filterFormData)(dispatch),
  resetFilterCount: () => resetFilterCount(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsOverview);
