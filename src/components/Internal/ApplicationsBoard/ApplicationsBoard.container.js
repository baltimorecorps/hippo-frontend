import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {getAllContactsPrograms, approveNewApplicants} from 'state/opportunity';

const mapStateToProps = state => {
  const allApplicants = Object.values(state.applicants);
  const haveNotApprovedApplicants = [];

  const approvedApplicants = allApplicants.filter(app => {
    const isApproved = app.programs.filter(
      program => program.is_approved === true
    );
    if (isApproved.length > 0) {
      return isApproved.length > 0;
    } else {
      haveNotApprovedApplicants.push(app);
    }
  });

  return {
    allApplicants,
    approvedApplicants,
    haveNotApprovedApplicants,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllContactsPrograms: () => getAllContactsPrograms(dispatch),
  approveNewApplicants: (programId, applicants) =>
    approveNewApplicants(programId, applicants)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
