import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {getAllContactsShort} from 'state/contacts';
import {approveNewApplicants} from 'state/opportunity';
import {
  getAllInternalApplicants,
  getAllContactsPrograms,
} from 'state/opportunity';

const mapStateToProps = state => {
  const contacts = Object.values(state.contacts);

  const applicants = Object.values(state.applicants);
  const approvedApplicants = applicants.filter(app => {
    const isApproved = app.programs.filter(
      program => program.is_approved === true
    );
    return isApproved.length > 0;
  });

  return {
    contacts,
    applicants,
    approvedApplicants,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllContactsShort: () => getAllContactsShort(dispatch),
  getAllContactsPrograms: () => getAllContactsPrograms(dispatch),
  getAllInternalApplicants: () => getAllInternalApplicants(dispatch),
  approveNewApplicants: (programId, applicants) =>
    approveNewApplicants(programId, applicants)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
