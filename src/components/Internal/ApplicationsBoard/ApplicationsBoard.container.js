import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {
  getAllContactsPrograms,
  approveNewApplicants,
  approveNewApplicantsStatus,
  getAllApprovedApplicants,
} from 'state/opportunity';

const mapStateToProps = state => {
  const allApplicants = state.applicants['all_applicants'];
  const approvedApplicants = state.applicants['approved_applicants'];
  const unapprovedApplicants =
    allApplicants &&
    allApplicants.filter(app => {
      const isApproved = app.programs.filter(program => {
        return program.is_approved === false;
      });
      return isApproved.length > 0;
    });

  return {
    allApplicants,
    unapprovedApplicants,
    approvedApplicants,
    approveNewApplicantsStatus,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllContactsPrograms: () => getAllContactsPrograms(dispatch),
  getAllApprovedApplicants: () => getAllApprovedApplicants(dispatch),
  approveNewApplicants: (programId, applicants) =>
    approveNewApplicants(programId, applicants)(dispatch),
  approveNewApplicantsStatus: applicantIds =>
    approveNewApplicantsStatus(applicantIds)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
