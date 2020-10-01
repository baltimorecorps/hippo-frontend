import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {createAButton, createClickTracking} from 'lib/helperFunctions/helpers';
import {useHistory} from 'react-router-dom';

const StickyFooter = ({
  classes,
  recommend,
  notAFit,
  employerNotAFit,
  employerReconsiderFinalists,
  employerReconsiderNotAFit,
  reopen,
  interviewScheduled,
  interviewCompleted,
  back,
  handleNext,
  submit,
  toOpportunities,
  application,
  page,
}) => {
  let history = useHistory();
  const toMyProfile = opportunity_id => {
    history.push('/profile');
  };
  const toApplicantProfile = contact_id => {
    history.push(`/profile/${contact_id}`);
  };

  const toViewStaffOpportunities = () => {
    history.push('/internal/opportunities-board');
  };

  const backButton = createAButton('Back', back, false, classes.buttons);
  const nextButton = createAButton('Next', handleNext, true, classes.buttons);
  const submitButton = createAButton('Submit', submit, true, classes.buttons);
  const recommendButton = createAButton(
    'Recommend',
    recommend,
    true,
    classes.greenButtons
  );
  const notAFitButton = createAButton(
    'Not a Fit',
    notAFit,
    true,
    classes.redButtons
  );

  const reopenButton = createAButton('Reopen', reopen, false, classes.buttons);

  const interviewScheduledButton = createAButton(
    'Interview Scheduled',
    interviewScheduled,
    true,
    classes.blueButtons
  );
  const interviewRescheduledButton = createAButton(
    'Interview Rescheduled',
    interviewScheduled,
    true,
    classes.purpleButtons
  );
  const reconsiderFinalistsButton = createAButton(
    'Reconsider for Finalists',
    employerReconsiderFinalists,
    true,
    classes.greenButtons
  );
  const reconsiderNotAFitButton = createAButton(
    'Reconsider for Not a Fit',
    employerReconsiderNotAFit,
    true,
    classes.redButtons
  );
  const interviewCompletedButton = createAButton(
    'Interview Completed',
    interviewCompleted,
    true,
    classes.blueButtons
  );

  //TODO: add GA trackings on decision buttons
  // fix /profile error

  const onClickEditProfile = () => {
    createClickTracking(
      'View Application',
      'Click Edit Profile',
      'Click Edit Profile'
    );
    toMyProfile();
  };

  const onClickViewMoreOpportunities = () => {
    createClickTracking(
      'View Application',
      'Click View More Opportunities',
      'Click View More Opportunities'
    );
    toOpportunities();
  };

  const onClickSeeProfile = () => {
    createClickTracking(
      'Staff Review Application',
      'Click to See Applicant Profile',
      'Click to See Applicant Profile'
    );
    toApplicantProfile(application.contact.id);
  };
  const onClickViewStaffOpportunities = () => {
    createClickTracking(
      'Staff Review Application',
      'Click View Staff Opportunities',
      'Click View Staff Opportunities'
    );
    toViewStaffOpportunities();
  };

  const toMyProfileButton = createAButton(
    'Edit Profile',
    onClickEditProfile,
    false,
    classes.buttons
  );
  const toApplicantProfileButton = createAButton(
    'See Profile',
    onClickSeeProfile,
    false,
    classes.blueButtons
  );
  const toOpportunitiesButton = createAButton(
    'View More Opportunities',
    onClickViewMoreOpportunities,
    true,
    classes.buttons
  );
  const toStaffOpportunitiesButton = createAButton(
    'Opportunities',
    onClickViewStaffOpportunities,
    false,
    classes.buttons
  );
  const employerNotAFitButton = createAButton(
    'Not a Fit',
    employerNotAFit,
    true,
    classes.redButtons
  );

  let leftButton, rightButton, middleLeftButton, middleRightButton;
  if (page === 'interest' || page === 'resume') {
    leftButton = backButton;
    rightButton = nextButton;
  } else if (page === 'review') {
    if (application.status === 'draft') {
      leftButton = backButton;
      rightButton = submitButton;
    } else {
      leftButton = toMyProfileButton;
      rightButton = toOpportunitiesButton;
    }
  } else if (page === 'staff-review-application') {
    if (application.status === 'submitted' && application.is_active === true) {
      leftButton = reopenButton;
      middleLeftButton = toApplicantProfileButton;
      middleRightButton = notAFitButton;
      rightButton = recommendButton;
    } else {
      leftButton = toStaffOpportunitiesButton;
      rightButton = toApplicantProfileButton;
    }
  } else if (page === 'employer-review-application') {
    if (
      application.status === 'recommended' &&
      application.is_active === true
    ) {
      leftButton = employerNotAFitButton;
      rightButton = interviewScheduledButton;
    } else if (
      application.status === 'interviewed' &&
      application.is_active === true
    ) {
      leftButton = interviewRescheduledButton;
      rightButton = interviewCompletedButton;
    } else if (
      application.status === 'recommended' &&
      application.is_active === false
    ) {
      leftButton = backButton;

      rightButton = interviewScheduledButton;
    } else if (
      application.status === 'interviewed' &&
      application.is_active === false
    ) {
      leftButton = interviewRescheduledButton;
      rightButton = reconsiderFinalistsButton;
    } else if (
      application.status === 'considered_for_role' &&
      application.is_active === true
    ) {
      leftButton = backButton;
      rightButton = reconsiderNotAFitButton;
    } else if (
      application.status === 'considered_for_role' &&
      application.is_active === false
    ) {
      leftButton = backButton;
      rightButton = reconsiderFinalistsButton;
    } else {
      leftButton = backButton;
    }
  }

  return (
    <Paper
      className={classes.stickyFooter}
      style={
        page === 'resume'
          ? {width: 'calc(100vw+400px)', left: '400px'}
          : {width: '100vw'}
      }
      data-testid="buttons-footer"
    >
      <div className={classes.buttonContainer}>
        {leftButton}
        {middleLeftButton || null}
        <div className={classes.printButton} />
        {middleRightButton || null}
        {rightButton}
      </div>
    </Paper>
  );
};

StickyFooter.propTypes = {
  recommend: PropTypes.func,
  notAFit: PropTypes.func,
  employerNotAFit: PropTypes.func,
  employerReconsider: PropTypes.func,
  reopen: PropTypes.func,
  interviewScheduled: PropTypes.func,
  interviewCompleted: PropTypes.func,
  back: PropTypes.func,
  handleNext: PropTypes.func,
  submit: PropTypes.func,
  toOpportunities: PropTypes.func,
  page: PropTypes.string.isRequired,
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
};

const styles = ({breakpoints, palette, spacing}) => ({
  stickyFooter: {
    display: 'flex',
    justifyContent: 'center',

    position: 'fixed',
    right: 0,
    bottom: 0,
    backgroundColor: palette.primary.almostBlack,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0 ',
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
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
  },
  buttons: {},
  printButton: {
    width: '132px',
  },
  greenButtons: {
    backgroundColor: '#00bf1d',
  },
  redButtons: {
    backgroundColor: '#ff3c26',
  },
  blueButtons: {
    backgroundColor: '#59aaff',
  },
  purpleButtons: {
    backgroundColor: '#cb78ff',
  },
});

export default withStyles(styles)(StickyFooter);
