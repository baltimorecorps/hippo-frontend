import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useHistory} from 'react-router-dom';
import StickyFooter from './StickyFooter';
import {ResumeViewer} from 'components/ResumeCreator';

const Review = ({
  classes,
  application,
  back,
  submit,
  toProfile,
  toOpportunities,
  opportunity,
  contactId,
}) => {
  const [confirmed, setConfirmed] = useState(false);

  let history = useHistory();

  const toConfirmationPage = () => {
    history.push('/confirmation-page');
  };
  const submitApplication = async () => {
    const response = await submit();
    if (response.statusCode == 200) {
      toConfirmationPage();
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <Typography variant="h5" component="h1" className={classes.header}>
            {application.status === 'submitted'
              ? 'This application has already been submitted'
              : 'Review and Submit'}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Title:</strong> {opportunity.title}
          </Typography>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Organization:</strong> {opportunity.org_name || ''}
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
      <ResumeViewer contactId={contactId} viewOnly={true} />

      <StickyFooter
        page="review"
        back={back}
        toOpportunities={toOpportunities}
        submit={() => setConfirmed(true)}
        application={application}
      />
      <ConfirmDialog
        open={confirmed}
        closeDialog={() => setConfirmed(false)}
        submit={submitApplication}
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
  },
  title: {
    fontSize: '17px',
  },
  interestStatement: {
    textIndent: '25px',
    textAlign: 'justify',
  },
});

const ConfirmDialog = withStyles(styles)(
  ({classes, open, closeDialog, submit}) => {
    return (
      <Dialog open={open}>
        <DialogContent>
          <Typography>
            Are you sure you want to submit this application?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" color="secondary">
            No
          </Button>
          <Button onClick={submit} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default withStyles(styles)(Review);
