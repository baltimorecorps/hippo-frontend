import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import DecisionsFooter from 'components/Footers/DecisionsFooter';
import {createAButton} from 'lib/helperFunctions/helpers';
import ViewFullApplication from 'components/ViewFullApplication';

const EmployerViewApplication = ({
  classes,
  application,
  contactId,
  opportunityId,
  getApplication,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!application || application.length === 0) {
      getApplication(contactId, opportunityId);
    }
  }, [application, getApplication, contactId, opportunityId]);

  if (!application) {
    return <div>Loading...</div>;
  }

  const toEmployerBoard = () => {
    history.push(`/org/opportunity/${opportunityId}/`);
  };

  const toEmployerBoardButton = createAButton(
    "To Employer's Page",
    toEmployerBoard,
    true,
    classes.buttons
  );

  return (
    <div className={classes.container} data-testid="employer_view_app_page">
      {toEmployerBoardButton}
      <ViewFullApplication application={application} />
      <DecisionsFooter
        application={application}
        page="employer-review-application"
        back={toEmployerBoard}
        applicantId={application && application.contact.id}
        opportunityId={opportunityId}
      />
    </div>
  );
};

EmployerViewApplication.propTypes = {
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
  contactId: PropTypes.number.isRequired,
  opportunityId: PropTypes.string.isRequired,
  getApplication: PropTypes.func.isRequired,
  employerInterviewApplication: PropTypes.func.isRequired,
  employerNotAFitApplication: PropTypes.func.isRequired,
  employerFinalistsApplication: PropTypes.func.isRequired,
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
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 24px 15px',
    marginBottom: spacing(1),
    marginTop: spacing(1),
  },
  greenButtons: {
    backgroundColor: '#00bf1d',
  },
  redButtons: {
    backgroundColor: '#ff3c26',
  },
  dialogHeaderContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dialogHeader: {
    alignSelf: 'center',
    top: '-25px',
    position: 'relative',
  },
  dialogContentText: {
    marginBottom: spacing(1.5),
  },
  dialogContent: {
    width: '480px',
    padding: '0px 10px 15px 10px',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    padding: '5px',
    '&:hover': {
      color: 'black',
    },
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
    width: '95%',
    marginBottom: spacing(1),
  },
});

export default withStyles(styles)(EmployerViewApplication);
