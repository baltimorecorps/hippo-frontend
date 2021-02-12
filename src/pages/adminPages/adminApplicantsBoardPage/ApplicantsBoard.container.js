import {connect} from 'react-redux';
import ApplicantsBoard from './ApplicantsBoard';
import {
  getFilteredContactsSubmitted,
  approveNewContactsStatus,
  addContactsFilters,
  getAllFilteredContacts,
  resetFilterCount,
} from 'state/contacts/contacts.actions';
import {formData} from '../../../components/adminApplicantsBoardComponents/defaultValues';

const mapStateToProps = state => {
  const submittedApplicants = state.contacts['filtered_submitted'] || [];
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
  getFilteredContactsSubmitted: () => getFilteredContactsSubmitted()(dispatch),
  approveNewContactsStatus: applicantIds =>
    approveNewContactsStatus(applicantIds)(dispatch),
  addContactsFilters: (filtersPayload, filterFormData, filterCount) =>
    addContactsFilters(filtersPayload, filterFormData, filterCount)(dispatch),
  getAllFilteredContacts: filterFormData =>
    getAllFilteredContacts(filterFormData)(dispatch),
  resetFilterCount: () => resetFilterCount(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsBoard);
