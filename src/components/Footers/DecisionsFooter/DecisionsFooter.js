import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {createAButton, createClickTracking} from 'lib/helperFunctions/helpers';
import {useHistory} from 'react-router-dom';
import EmployerFeedbackFormDialog from '../../Employer/EmployerFeedback/EmployerFeedbackFormDialog';
import Button from '@material-ui/core/Button';

import DecisionsMenu from './DecisionsMenu.container';

const StickyFooter = ({
  classes,
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

  const backButton = createAButton('Back', back, false, classes.buttons);
  const nextButton = createAButton('Next', handleNext, true, classes.buttons);
  const submitButton = createAButton('Submit', submit, true, classes.buttons);

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

  const toMyProfileButton = createAButton(
    'Edit Profile',
    onClickEditProfile,
    false,
    classes.buttons
  );

  const toOpportunitiesButton = createAButton(
    'View More Opportunities',
    onClickViewMoreOpportunities,
    true,
    classes.buttons
  );

  let leftButton, rightButton;
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
  }

  const [isOpenStaffMenu, setIsOpenStaffMenu] = React.useState(false);
  const [isOpenEmployerMenu, setIsOpenEmployerMenu] = React.useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = React.useState(false);

  return (
    <Paper
      className={classes.stickyFooter}
      style={
        page === 'resume'
          ? {width: 'calc(100vw+400px)', left: '400px'}
          : {width: '100vw'}
      }
      data-testid="decisions_footer"
    >
      <div className={classes.buttonContainer}>
        {page === 'employer-review-application' ? (
          <Button
            aria-controls={isOpenStaffMenu ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={() => setIsFeedbackDialogOpen(true)}
            style={{
              color: '#000000',
              backgroundColor: '#ff91da',
              padding: '7px 15px',
            }}
          >
            Give Feedback
          </Button>
        ) : page === 'staff-review-application' ? (
          <DecisionsMenu
            page={page}
            menuName="Staff Decisions"
            isOpen={isOpenStaffMenu}
            setIsOpen={setIsOpenStaffMenu}
            application={application}
          />
        ) : (
          <span data-testid="left_button">{leftButton}</span>
        )}

        <div className={classes.printButton} />

        {page === 'employer-review-application' ||
        page === 'staff-review-application' ? (
          <DecisionsMenu
            page={page}
            menuName="Employer Decisions"
            isOpen={isOpenEmployerMenu}
            setIsOpen={setIsOpenEmployerMenu}
            application={application}
          />
        ) : (
          <span data-testid="right_button">{rightButton}</span>
        )}
      </div>
      {isFeedbackDialogOpen && (
        <EmployerFeedbackFormDialog
          isOpen={isFeedbackDialogOpen}
          closeDialog={() => setIsFeedbackDialogOpen(false)}
        />
      )}
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
