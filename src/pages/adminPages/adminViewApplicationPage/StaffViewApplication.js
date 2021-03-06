import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useHistory} from 'react-router-dom';
import DecisionsFooter from 'components/footerComponents/DecisionsFooter';
import {createClickTracking, createAButton} from 'lib/helperFunctions/helpers';
import ViewFullApplication from 'components/ViewFullApplication';

const StaffViewApplication = ({
  classes,
  application,
  contactId,
  opportunityId,
  back,
  getApplication,
  staffRecommendApplication,
  staffNotAFitApplication,
  staffReopenApplication,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [decision, setDecision] = useState('');

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

  const handleClickRecommend = () => {
    setDecision('recommend');
    setConfirmed(true);
  };
  const handleClickNotAFit = () => {
    setDecision('staff: not a fit');
    setConfirmed(true);
  };
  const handleClickReopen = () => {
    setDecision('reopen');
    setConfirmed(true);
  };

  const recommendApplication = async () => {
    const response = await staffRecommendApplication(contactId, opportunityId);
    if (response && Number(response.statusCode) === 200) {
      setConfirmed(false);
    }
  };
  const notAFitApplication = async () => {
    const response = await staffNotAFitApplication(contactId, opportunityId);
    if (response && Number(response.statusCode) === 200) {
      setConfirmed(false);
    }
  };
  const reopenApplication = async () => {
    const response = await staffReopenApplication(contactId, opportunityId);
    if (response && Number(response.statusCode) === 200) {
      setConfirmed(false);
    }
  };
  const toInternalOpportunitiesButton = createAButton(
    '< To Opportunities Board',
    toInternalOpportunitiesBoard,
    true,
    classes.buttons
  );
  const toInternalApplicationsButton = createAButton(
    'To Applicants Board >',
    toInternalApplicationsBoard,
    true,
    classes.buttons
  );
  const toApplicantApplicationsCardButton = createAButton(
    "To This Applicant's Page",
    toApplicantApplicationsCard,
    true,
    classes.buttons
  );

  return (
    <div className={classes.container} data-testid="staff_view_app_page">
      <div className={classes.headerButtonContainer}>
        {toInternalOpportunitiesButton}
        {toApplicantApplicationsCardButton}
        {toInternalApplicationsButton}
      </div>
      <ViewFullApplication application={application} />
      <DecisionsFooter
        applicationStatus={application.status}
        page="staff-review-application"
        back={back}
        recommend={handleClickRecommend}
        notAFit={handleClickNotAFit}
        reopen={handleClickReopen}
        application={application}
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
    marginBottom: spacing(2),
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
  buttons: {
    marginBottom: spacing(1.5),
    marginRight: '20px',
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
      } else if (decision === 'staff: not a fit') {
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
      <Dialog open={open} data-testid="confirm_dialog">
        <DialogContent>
          <Typography data-testid="confirm_dialog_content">
            {decision === 'recommend'
              ? `Are you sure you want to recommend this application?`
              : decision === 'staff: not a fit'
              ? `Are you sure this application is not a fit?`
              : `Are you sure you want to reopen this application?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDialog}
            variant="contained"
            color="secondary"
            data-testid="no_button"
          >
            No
          </Button>
          <Button
            onClick={onClickConfirmDecision}
            variant="contained"
            color="primary"
            data-testid="yes_button"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default withStyles(styles)(StaffViewApplication);
