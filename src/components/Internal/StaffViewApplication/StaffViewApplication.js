import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import DecisionsFooter from 'components/Footers/DecisionsFooter';
import {createAButton} from 'lib/helperFunctions/helpers';
import ViewFullApplication from 'components/ViewFullApplication';

const StaffViewApplication = ({
  classes,
  application,
  contactId,
  opportunityId,
  back,
  getApplication,
}) => {
  let history = useHistory();

  useEffect(() => {
    getApplication(contactId, opportunityId);
  }, [getApplication, contactId, opportunityId]);

  if (!application) {
    return <div>Loading...</div>;
  }

  const toInternalOpportunitiesBoard = () => {
    history.push('/internal/opportunities-board');
  };
  const toInternalApplicationsBoard = () => {
    history.push('/internal/applicants-board');
  };
  const toApplicantApplicationsCard = () => {
    history.push(`/internal/applicants/${contactId}`);
  };

  const toApplicantApplicationsProfile = () => {
    history.push(`/profile/${contactId}`);
  };

  const toInternalOpportunitiesButton = createAButton(
    '< Opportunities Board',
    toInternalOpportunitiesBoard,
    true,
    classes.buttons
  );
  const toInternalApplicationsButton = createAButton(
    'Applicants Board >',
    toInternalApplicationsBoard,
    true,
    classes.buttons
  );
  const toApplicantApplicationsCardButton = createAButton(
    "This Applicant's Page",
    toApplicantApplicationsCard,
    true,
    classes.buttons
  );

  const seeProfileButton = createAButton(
    'See Profile',
    toApplicantApplicationsProfile,
    true,
    classes.profileButton
  );

  const openFeedback = () => {
    console.log('open employer feedback');
  };
  const EmployerFeedbackButton = createAButton(
    "Employer's Feedback",
    openFeedback,
    true,
    classes.feedbackButton
  );

  return (
    <div className={classes.container} data-testid="staff_view_app_page">
      <div className={classes.headerButtonContainer}>
        {toInternalOpportunitiesButton}
        {toApplicantApplicationsCardButton}
        {toInternalApplicationsButton}
      </div>
      <div className={classes.headerButtonContainer2}>
        {seeProfileButton}
        {EmployerFeedbackButton}
      </div>
      <ViewFullApplication application={application} />
      <DecisionsFooter
        page="staff-review-application"
        back={back}
        application={application}
        opportunityId={opportunityId}
      />
    </div>
  );
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
  headerButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    padding: spacing(2, 3, 3),
  },
  buttons: {
    marginBottom: spacing(1.5),
    marginRight: '20px',
  },
  profileButton: {
    marginBottom: spacing(1.5),
    marginRight: '20px',
    backgroundColor: '#ff8af3',
    '&:hover': {
      backgroundColor: '#fc62ed',
    },
  },
  headerButtonContainer2: {
    width: '63%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  feedbackButton: {
    marginBottom: spacing(1.5),
    marginRight: '20px',
    backgroundColor: '#ff8af3',
    '&:hover': {
      backgroundColor: '#fc62ed',
    },
  },
  applicantPageButton: {
    marginBottom: spacing(1.5),
    marginRight: '20px',
    backgroundColor: '#ff8d4f',
    '&:hover': {
      backgroundColor: '#a95eff',
    },
  },
});

export default withStyles(styles)(StaffViewApplication);
