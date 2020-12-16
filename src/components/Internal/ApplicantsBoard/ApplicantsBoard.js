import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import PartnershipsNavBar from '../../navbarComponents/partnershipNav/PartnershipsNavBar';
import ApplicantsTable from './ApplicantsTable';
import FilterApplicantsForm from './FilterApplicantsForm';

const ApplicantsBoard = ({
  classes,
  getFilteredContactsSubmitted,
  approveNewContactsStatus,
  submittedApplicants,
  addContactsFilters,
  allFilteredContacts,
  getAllFilteredContacts,
  filteredContacts,
  filterFormData,
  filterCount,
  resetFilterCount,
}) => {
  useEffect(() => {
    if (!allFilteredContacts || allFilteredContacts.length === 0)
      getAllFilteredContacts(filterFormData);
  }, [getAllFilteredContacts, filterFormData, allFilteredContacts]);

  useEffect(() => {
    if (filteredContacts) {
      setPresentApplicants(filteredContacts);
      setSearchableApplicants(filteredContacts);
    } else {
      setPresentApplicants(allFilteredContacts);
      setSearchableApplicants(allFilteredContacts);
    }
  }, [filteredContacts, allFilteredContacts]);

  const [showApproveForm, setShowApproveForm] = useState(false);
  const [presentApplicants, setPresentApplicants] = useState(
    allFilteredContacts
  );
  const [openFilterForm, setOpenFilterForm] = useState(false);
  const [searchableApplicants, setSearchableApplicants] = useState(
    allFilteredContacts
  );

  if (!presentApplicants) {
    return <div>...Loading</div>;
  }
  return (
    <div className={classes.container}>
      <PartnershipsNavBar />

      <ApplicantsTable
        presentApplicants={presentApplicants}
        handleClickOpenFilterForm={() => setOpenFilterForm(true)}
        filterCount={filterCount}
        allFilteredContacts={allFilteredContacts}
        setShowApproveForm={setShowApproveForm}
        showApproveForm={showApproveForm}
        searchableApplicants={searchableApplicants}
        setPresentApplicants={setPresentApplicants}
        getFilteredContactsSubmitted={getFilteredContactsSubmitted}
        approveNewContactsStatus={approveNewContactsStatus}
        submittedApplicants={submittedApplicants}
        resetFilterCount={resetFilterCount}
      />
      {openFilterForm && (
        <FilterApplicantsForm
          isOpen={openFilterForm}
          handleClose={() => setOpenFilterForm(false)}
          addContactsFilters={addContactsFilters}
          filterFormData={filterFormData}
        />
      )}
    </div>
  );
};

ApplicantsBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  approveNewContactsStatus: PropTypes.func.isRequired,
  submittedApplicants: PropTypes.array,
  filterFormData: PropTypes.object,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default withStyles(styles)(ApplicantsBoard);
