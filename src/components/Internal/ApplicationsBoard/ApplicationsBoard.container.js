import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {
  approveNewApplicants,
  approveNewApplicantsStatus,
  getAllApprovedApplicants,
  getAllNotApprovedApplicants,
} from 'state/opportunity';

const mapStateToProps = state => {
  const approvedApplicants = state.applicants['approved_applicants'];
  const unapprovedApplicants = state.applicants['not_approved_applicants'];

  return {
    unapprovedApplicants,
    approvedApplicants,
    approveNewApplicantsStatus,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllApprovedApplicants: () => getAllApprovedApplicants(dispatch),
  getAllNotApprovedApplicants: () => getAllNotApprovedApplicants(dispatch),
  approveNewApplicants: (programId, applicants) =>
    approveNewApplicants(programId, applicants)(dispatch),
  approveNewApplicantsStatus: applicantIds =>
    approveNewApplicantsStatus(applicantIds)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
