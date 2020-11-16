import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import DecisionsFooter from 'components/Footers/DecisionsFooter';
import {createAButton} from 'lib/helperFunctions/helpers';
import ViewFullApplication from 'components/ViewFullApplication';

const EmployerViewApplication = ({
  classes,
  application,
  contactId,
  opportunityId,
  getApplication,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!application || application.length === 0) {
      getApplication(contactId, opportunityId);
    }
  }, [application, getApplication, contactId, opportunityId]);

  if (!application) {
    return <div>Loading...</div>;
  }

  const toEmployerBoard = () => {
    history.push(`/org/opportunity/${opportunityId}/`);
  };

  const toEmployerBoardButton = createAButton(
    "To Employer's Page",
    toEmployerBoard,
    true,
    classes.buttons
  );

  return (
    <div className={classes.container} data-testid="employer_view_app_page">
      {toEmployerBoardButton}
      <ViewFullApplication application={application} />
      <DecisionsFooter
        application={application}
        page="employer-review-application"
        back={toEmployerBoard}
        applicantId={application && application.contact.id}
        opportunityId={opportunityId}
      />
    </div>
  );
};

EmployerViewApplication.propTypes = {
  application: PropTypes.shape({
    interview_date: PropTypes.string,
    interview_time: PropTypes.string,
    resume: PropTypes.object,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    interview_completed: PropTypes.bool.isRequired,
    interest_statement: PropTypes.string,
    contact: PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }),
    is_active: PropTypes.bool.isRequired,
    opportunity: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      program_id: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      short_description: PropTypes.string.isRequired,
      gdoc_link: PropTypes.string.isRequired,
      org_name: PropTypes.string.isRequired,
    }),
  }),
  contactId: PropTypes.number.isRequired,
  opportunityId: PropTypes.string.isRequired,
  getApplication: PropTypes.func.isRequired,
  employerInterviewApplication: PropTypes.func.isRequired,
  employerNotAFitApplication: PropTypes.func.isRequired,
  employerFinalistsApplication: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(2),
    marginBottom: spacing(3),
  },
  buttons: {
    marginBottom: spacing(1.5),
  },
});

export default withStyles(styles)(EmployerViewApplication);
