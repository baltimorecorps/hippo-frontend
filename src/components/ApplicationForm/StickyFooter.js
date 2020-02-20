import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {createAButton} from 'lib/helperFunctions/helpers';
import {useHistory} from 'react-router-dom';

const StickyFooter = ({
  classes,
  startText,
  back,
  handleNext,
  submit,
  toOpportunities,
  opportunity,
  application,
  page,
}) => {
  let history = useHistory();
  const toProfile = opportunity_id => {
    history.push('/profile');
  };
  const backButton = createAButton('Back', back, false, classes.buttons);
  const nextButton = createAButton('Next', handleNext, true, classes.buttons);
  const toOpportunitiesButton = createAButton(
    'View More Opportunities',
    toOpportunities,
    true,
    classes.buttons
  );
  const submitButton = createAButton('Submit', submit, true, classes.buttons);
  const profileButton = createAButton(
    'Edit Profile',
    toProfile,
    false,
    classes.buttons
  );

  return (
    <Paper
      className={classes.stickyFooter}
      style={
        page === 'addResume'
          ? {width: 'calc(100vw+400px)', left: '400px'}
          : {width: '100vw'}
      }
    >
      <div className={classes.buttonContainer}>
        {application.status === 'submitted' ? profileButton : backButton}
        {page !== 'review'
          ? nextButton
          : application.status === 'submitted'
          ? toOpportunitiesButton
          : submitButton}
      </div>
    </Paper>
  );
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
  buttons: {
    margin: spacing(0, 2),
  },
});

export default withStyles(styles)(StickyFooter);
