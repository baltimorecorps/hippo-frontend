import {connect} from 'react-redux';
import FilterApplicantsForm from './FilterApplicantsForm';
import {addContactsFilters, resetFilterCount} from 'state/contacts';
import {formData} from './defaultValues';

const mapStateToProps = state => {
  const filterCount = state.contacts['filter_count'];
  const filterFormData = state.contacts['filter_form_data'] || formData;

  return {
    filterFormData,
    filterCount,
  };
};

const mapDispatchToProps = dispatch => ({
  addContactsFilters: (filtersPayload, filterFormData, filterCount) =>
    addContactsFilters(filtersPayload, filterFormData, filterCount)(dispatch),
  resetFilterCount: () => resetFilterCount(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterApplicantsForm);
