import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useHistory} from 'react-router-dom';
import {createExternalLink} from 'lib/helpers';

const Review = ({
  classes,
  application,
  back,
  submit,
  toProfile,
  toOpportunities,
  opportunity,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const submitAndShowDialog = async () => {
    const response = await submit();
    if (response.statusCode == 200) {
      setSubmitted(true);
    }
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <Typography variant="h5" component="h1" className={classes.header}>
            {application.status === 'submitted'
              ? 'This application is submitted'
              : 'Review and Submit'}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Title:</strong> {opportunity.title}
          </Typography>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Organization:</strong>{' '}
            {opportunity.organization || 'Organization Name'}
          </Typography>
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <div>
          <Typography
            variant="h6"
            component="h1"
            style={{
              fontWeight: '700',
            }}
          >
            Interest Statement
          </Typography>
        </div>
        <Typography className={classes.interestStatement}>
          {application.interest_statement}
        </Typography>
      </Paper>
      <Paper className={classes.stickyFooter}>
        <div className={classes.buttonContainer}>
          <Button
            onClick={back}
            variant="contained"
            className={classes.buttons}
          >
            Back
          </Button>
          {application.status === 'submitted' ? (
            <Button
              onClick={toOpportunities}
              variant="contained"
              color="primary"
              className={classes.buttons}
            >
              View More Opportunities
            </Button>
          ) : (
            <Button
              onClick={submitAndShowDialog}
              color="primary"
              variant="contained"
              className={classes.buttons}
            >
              Submit
            </Button>
          )}
        </div>
      </Paper>
      <ConfirmDialog
        open={submitted}
        toProfile={toProfile}
        toOpportunities={toOpportunities}
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
  paper: {
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
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
  header: {
    fontWeight: 700,
    textAlign: 'center',

    [breakpoints.up('sm')]: {
      // textAlign: 'left',
    },
  },
  title: {
    fontSize: '17px',
  },
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
    margin: '15px 0',
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
  interestStatement: {
    textIndent: '25px',
    textAlign: 'justify',
  },
});

const ConfirmDialog = withStyles(styles)(
  ({classes, open, toProfile, toOpportunities}) => {
    return (
      <Dialog open={open}>
        <DialogContent>
          <Typography>Your application has been submitted</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={toProfile} variant="contained">
            Back to Profile
          </Button>
          <Button onClick={toOpportunities} variant="contained">
            View More Opportunities
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default withStyles(styles)(Review);
