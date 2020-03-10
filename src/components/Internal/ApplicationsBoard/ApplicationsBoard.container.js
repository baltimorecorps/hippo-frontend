import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {getAllContactsShort} from 'state/contacts';
import {approveNewApplicants} from 'state/opportunity';
import {getAllInternalApplicants} from 'state/opportunity';

const mapStateToProps = state => {
  const contacts = Object.values(state.contacts);

  const applicants = Object.values(state.applicants);
  return {
    contacts,
    applicants,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllContactsShort: () => getAllContactsShort(dispatch),
  getAllInternalApplicants: () => getAllInternalApplicants(dispatch),
  approveNewApplicants: (programId, applicants) =>
    approveNewApplicants(programId, applicants)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
