import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {approveNewApplicants} from 'state/opportunity';
import {getAllContactsPrograms} from 'state/opportunity';

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
  getAllContactsPrograms: () => getAllContactsPrograms(dispatch),
  approveNewApplicants: (programId, applicants) =>
    approveNewApplicants(programId, applicants)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
