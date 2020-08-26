import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {
  approveNewApplicantsStatus,
  getAllApprovedApplicants,
  getAllNotApprovedApplicants,
} from 'state/opportunity';

const mapStateToProps = state => {
  const approvedApplicants = state.applicants['approved_applicants'] || [];
  const unapprovedApplicants =
    state.applicants['not_approved_applicants'] || [];

  return {
    unapprovedApplicants,
    approvedApplicants,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllApprovedApplicants: () => getAllApprovedApplicants(dispatch),
  getAllNotApprovedApplicants: () => getAllNotApprovedApplicants(dispatch),
  approveNewApplicantsStatus: applicantIds =>
    approveNewApplicantsStatus(applicantIds)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
