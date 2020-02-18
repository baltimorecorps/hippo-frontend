import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useHistory} from 'react-router-dom';
import {createExternalLink} from 'lib/helperFunctions/helpers';

const Review = ({
  classes,
  application,
  back,
  submit,
  toProfile,
  toOpportunities,
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
          <Typography
            variant="h5"
            component="h1"
            style={{
              fontWeight: '700',
            }}
          >
            Statement of Interest
          </Typography>
        </div>
        <Typography>{application.interest_statement}</Typography>
        <Button onClick={back}>Edit Application</Button>
        {application.status === 'submitted' ? (
          <Button 
            onClick={toOpportunities}
            variant="outlined">
            Back to Opportunities
          </Button>
        ) : (
          <Button
            onClick={submitAndShowDialog}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        )}
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
    marginTop: spacing(1),
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
