import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {Switch, Route, useHistory, useRouteMatch} from 'react-router-dom';
import StickyFooter from 'components/ApplicationForm/StickyFooter';
import {ResumeViewer} from 'components/ResumeCreator';
import {
  createExternalLink,
  createClickTracking,
} from 'lib/helperFunctions/helpers';

const StaffReviewApplication = ({
  classes,
  applications,
  application,
  opportunities,
  contactId,
  opportunityId,
  getAllOpportunities,
  back,
  submit,
  toProfile,
  toOpportunities,
  applicant,
  getAllSubmittedApplications,
  getApplication,
  staffRecommendApplication,
  staffNotAFitApplication,
  staffReopenApplication,
}) => {
  const match = useRouteMatch();
  // const opportunityId = match.params.opportunityId;
  // const contactId = match.params.contactId;
  const [nothing, setNothing] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [decision, setDecision] = useState('');

  let history = useHistory();

  useEffect(() => {
    if (!application || application.length === 0) {
      getApplication(contactId, opportunityId);
    }
  }, [application, getApplication, contactId, opportunityId]);

  if (!application) {
    return <div>Loading...</div>;
  }

  // const toConfirmationPage = () => {
  //   history.push('/staff-confirmation-page');
  // };
  const toInternalBoard = () => {
    history.push('/opportunities/internal-board');
  };

  const handleClickRecommend = () => {
    setDecision('recommend');
    setConfirmed(true);
  };
  const handleClickNotAFit = () => {
    setDecision('not a fit');
    setConfirmed(true);
  };
  const handleClickReopen = () => {
    setDecision('reopen');
    setConfirmed(true);
  };

  const recommendApplication = async () => {
    const response = await staffRecommendApplication(contactId, opportunityId);
    if (response.statusCode == 200) {
      toInternalBoard();
    }
  };
  const notAFitApplication = async () => {
    const response = await staffNotAFitApplication(contactId, opportunityId);
    if (response.statusCode == 200) {
      toInternalBoard();
    }
  };
  const reopenApplication = async () => {
    const response = await staffReopenApplication(contactId, opportunityId);
    if (response.statusCode == 200) {
      // toConfirmationPage();
      toInternalBoard();
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <Typography variant="h5" component="h1" className={classes.header}>
            Internal Review Application
          </Typography>
        </div>
        <div>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Title:</strong>
            {(application && application.opportunity.title) || ''}
          </Typography>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Organization:</strong>{' '}
            {(application && application.opportunity.org_name) || ''}
          </Typography>
        </div>
        <div className={classes.opportunityDescription}>
          <Typography className={classes.description}>
            {application && application.opportunity.short_description}
            <br />
          </Typography>
          <Typography className={classes.link}>
            {createExternalLink(
              'View full description',
              application && application.opportunity.gdoc_link,
              classes.link
            )}
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
          {application && application.interest_statement}
        </Typography>
      </Paper>
      {application && application.resume && (
        <ResumeViewer
          contactId={application && application.contact.id}
          resume={application && application.resume}
          setResume={setNothing}
          viewOnly={true}
          page="staff"
        />
      )}
      <StickyFooter
        applicationStatus={application.status}
        page="staff-review-application"
        back={back}
        recommend={handleClickRecommend}
        notAFit={handleClickNotAFit}
        reopen={handleClickReopen}
        applicantId={application && application.contact.id}
        opportunityId={opportunityId}
      />
      <ConfirmDialog
        open={confirmed}
        decision={decision}
        closeDialog={() => setConfirmed(false)}
        recommendApplication={recommendApplication}
        notAFitApplication={notAFitApplication}
        reopenApplication={reopenApplication}
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
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
  },
  link: {
    color: palette.primary.link,
    marginTop: spacing(1),
  },
  description: {
    textAlign: 'justify',
    textIndent: '25px',
  },
  opportunityContent: {
    marginBottom: spacing(2),
  },
  interestStatement: {
    textIndent: '25px',
    textAlign: 'justify',
  },
});

const ConfirmDialog = withStyles(styles)(
  ({
    classes,
    open,
    decision,
    closeDialog,
    notAFitApplication,
    reopenApplication,
    recommendApplication,
  }) => {
    const onClickConfirmDecision = () => {
      if (decision === 'recommend') {
        createClickTracking(
          'Staff Making Decision',
          'Click Confirm Recommend Application',
          'Click Confirm Recommend Application'
        );
        recommendApplication();
      } else if (decision === 'not a fit') {
        createClickTracking(
          'Staff Making Decision',
          'Click Confirm Not a Fit Application',
          'Click Confirm Not a Fit Application'
        );
        notAFitApplication();
      }
      if (decision === 'reopen') {
        createClickTracking(
          'Staff Making Decision',
          'Click Confirm Reopen Application',
          'Click Confirm Reopen Application'
        );
        reopenApplication();
      }
    };
    return (
      <Dialog open={open}>
        <DialogContent>
          <Typography>
            {decision === 'recommend'
              ? `Are you sure you want to recommend this application?`
              : decision === 'not a fit'
              ? `Are you sure this application is not a fit?`
              : `Are you sure you want to reopen this application?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" color="secondary">
            No
          </Button>
          <Button
            onClick={onClickConfirmDecision}
            variant="contained"
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default withStyles(styles)(StaffReviewApplication);
