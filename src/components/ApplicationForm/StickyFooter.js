import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {interestValidator} from '../../lib/formValidator';

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
  const createAButton = (content, handleClick, isPrimary) => {
    return (
      <Button
        onClick={handleClick}
        variant="contained"
        color={isPrimary ? 'primary' : ''}
        className={classes.buttons}
      >
        {content}
      </Button>
    );
  };

  const backButton = createAButton('Back', back, false);
  const nextButton = createAButton('Next', handleNext, true);
  const toOpportunitiesButton = createAButton(
    'View More Opportunities',
    toOpportunities,
    true
  );
  const submitButton = createAButton('Submit', submit, true);

  return (
    <Paper className={classes.stickyFooter}>
      <div className={classes.buttonContainer}>
        {backButton}
        {page === 'review'
          ? application && application.status === 'submitted'
            ? toOpportunitiesButton
            : submitButton
          : nextButton}
      </div>
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  stickyFooter: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    position: 'fixed',
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
