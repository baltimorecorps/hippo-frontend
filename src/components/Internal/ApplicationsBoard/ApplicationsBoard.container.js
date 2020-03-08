import {connect} from 'react-redux';
import ApplicationsBoard from './ApplicationsBoard';
import {getAllContactsShort} from 'state/contacts';
import {approveNewApplicants} from 'state/opportunity';

const mapStateToProps = state => {
  const contacts = Object.values(state.contacts);
  return {
    contacts,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllContactsShort: () => getAllContactsShort(dispatch),
  approveNewApplicants: applicants =>
    approveNewApplicants(applicants)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsBoard);
