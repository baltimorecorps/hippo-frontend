import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';

import {
  getSubmittedContacts,
  getApprovedContacts,
  approveNewContactsStatus,
} from 'state/contacts';

const mapStateToProps = state => {
  const approvedApplicants = state.contacts['approved'] || [];
  const submittedApplicants = state.contacts['submitted'] || [];

  return {
    submittedApplicants,
    approvedApplicants,
  };
};

const mapDispatchToProps = dispatch => ({
  getSubmittedContacts: () => getSubmittedContacts(dispatch),
  getApprovedContacts: () => getApprovedContacts(dispatch),
  approveNewContactsStatus: applicantIds =>
    approveNewContactsStatus(applicantIds)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
