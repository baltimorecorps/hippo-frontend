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

export default withStyles(styles)(StaffViewApplication);
