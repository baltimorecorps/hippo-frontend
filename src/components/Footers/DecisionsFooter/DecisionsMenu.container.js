import {connect} from 'react-redux';
import DecisionsMenu from './DecisionsMenu';
import {updateApplicationStatus} from 'state/opportunity';

const mapDispatchToProps = dispatch => ({
  updateApplicationStatus: (application, payload) =>
    updateApplicationStatus(application, payload)(dispatch),
});

export default connect(null, mapDispatchToProps)(DecisionsMenu);
