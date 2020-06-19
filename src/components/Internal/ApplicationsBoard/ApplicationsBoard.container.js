import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {getAllContactsPrograms, approveNewApplicants} from 'state/opportunity';

const mapStateToProps = state => {
  const allApplicants = Object.values(state.applicants);
  const approvedApplicants = allApplicants.filter(app => {
    const isApproved = app.programs.filter(
      program => program.is_approved === true
    );
    return isApproved.length > 0;
  });

  return {
    allApplicants,
    approvedApplicants,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllContactsPrograms: () => getAllContactsPrograms(dispatch),
  approveNewApplicants: (programId, applicants) =>
    approveNewApplicants(programId, applicants)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
