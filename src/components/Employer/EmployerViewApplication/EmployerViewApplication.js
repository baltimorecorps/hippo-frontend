import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useHistory} from 'react-router-dom';
import StickyFooter from 'components/ApplicationForm/StickyFooter';
import IconButton from '@material-ui/core/IconButton';
import {createClickTracking, createAButton} from 'lib/helperFunctions/helpers';
import ViewFullApplication from '../../Internal/ViewFullApplication';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import CloseIcon from '@material-ui/icons/Close';
import {interviewScheduledValidator} from '../../../lib/formHelpers/formValidator';
import FormHelperText from '@material-ui/core/FormHelperText';

const EmployerViewApplication = ({
  classes,
  application,
  contactId,
  opportunityId,
  getApplication,
  employerInterviewApplication,
  employerNotAFitApplication,
  employerFinalistsApplication,
}) => {
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

  const toEmployerBoard = () => {
    history.push(`/org/opportunity/${opportunityId}/`);
  };

  const handleClickInterViewScheduled = () => {
    setDecision('interview scheduled');
    setConfirmed(true);
  };
  const handleClickInterViewCompleted = () => {
    setDecision('interview completed');
    setConfirmed(true);
  };
  const handleClickReconsiderFinalists = () => {
    setDecision('reconsider: finalists');
    setConfirmed(true);
  };
  const handleClickReconsiderNotAFit = () => {
    setDecision('reconsider: not a fit');
    setConfirmed(true);
  };
  const handleClickNotAFit = () => {
    setDecision('employer: not a fit');
    setConfirmed(true);
  };

  const notAFitApplication = async () => {
    const response = await employerNotAFitApplication(contactId, opportunityId);
    if (Number(response.statusCode) === 200) {
      toEmployerBoard();
    }
  };
  const finalistsApplication = async () => {
    const response = await employerFinalistsApplication(
      contactId,
      opportunityId
    );
    if (Number(response.statusCode) === 200) {
      toEmployerBoard();
    }
  };
  const toEmployerBoardButton = createAButton(
    "To Employer's Page",
    toEmployerBoard,
    true,
    classes.buttons
  );

  return (
    <div className={classes.container}>
      {toEmployerBoardButton}
      <ViewFullApplication application={application} />
      <StickyFooter
        application={application}
        page="employer-review-application"
        back={toEmployerBoard}
        interviewScheduled={handleClickInterViewScheduled}
        interviewCompleted={handleClickInterViewCompleted}
        employerNotAFit={handleClickNotAFit}
        employerReconsiderFinalists={handleClickReconsiderFinalists}
        employerReconsiderNotAFit={handleClickReconsiderNotAFit}
        applicantId={application && application.contact.id}
        opportunityId={opportunityId}
      />
      <ConfirmDialog
        application={application}
        open={confirmed}
        decision={decision}
        closeDialog={() => setConfirmed(false)}
        notAFitApplication={notAFitApplication}
        finalistsApplication={finalistsApplication}
        employerInterviewApplication={employerInterviewApplication}
        toEmployerBoard={toEmployerBoard}
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

const useForm = (initialValues, onSubmit, toEmployerBoard) => {
  const [update, values] = useFormUpdate(initialValues);

  const handleSubmit = async () => {
    createClickTracking(
      'Employer Making Decision',
      'Click Confirm Interview Application',
      'Click Confirm Interview Application'
    );
    const date = values.interview_date.toISOString().substring(0, 10);
    const time = values.interview_time.toString().substring(16, 24);

    const interviewDetails = {
      interview_date: date,
      interview_time: time,
    };

    const response = await onSubmit(
      values.contact_id,
      values.opportunity_id,
      interviewDetails
    );
    if (Number(response.statusCode) === 200) {
      toEmployerBoard();
    }
  };

  const handleDateChange = dateTime => {
    update('interview_date')(dateTime);
  };

  const handleTimeChange = dateTime => {
    update('interview_time')(dateTime);
  };

  return [values, handleDateChange, handleTimeChange, handleSubmit];
};

const ConfirmDialog = withStyles(styles)(
  ({
    classes,
    application,
    open,
    decision,
    closeDialog,
    notAFitApplication,
    finalistsApplication,
    employerInterviewApplication,
    toEmployerBoard,
  }) => {
    let dateTime = null;
    // convert string to JS Date
    if (application.interview_date && application.interview_time) {
      dateTime = new Date(
        `${application.interview_date}T${application.interview_time}`
      );
    }

    const initialValues = {
      contact_id: application.contact.id,
      opportunity_id: application.opportunity.id,
      interview_date: dateTime,
      interview_time: dateTime,
    };
    const [values, handleDateChange, handleTimeChange, handleSubmit] = useForm(
      initialValues,
      employerInterviewApplication,
      toEmployerBoard
    );

    const [errors, setErrors] = useState({});

    const submit = () => {
      const {isError, err} = interviewScheduledValidator(values);
      if (isError) {
        setErrors(err);
      } else {
        handleSubmit(values);
      }
    };

    const onClickConfirmDecision = () => {
      if (decision === 'consider') {
        createClickTracking(
          'Employer Making Decision',
          'Click Confirm Consider Application',
          'Click Confirm Consider Application'
        );
        finalistsApplication();
      } else if (decision === 'employer: not a fit') {
        createClickTracking(
          'Employer Making Decision',
          'Click Confirm Not a Fit Application',
          'Click Confirm Not a Fit Application'
        );
        notAFitApplication();
      }
    };

    let confirmText;
    switch (decision) {
      case 'employer: not a fit':
        confirmText = 'Are you sure this application is not a fit?';
        break;
      case 'consider':
        confirmText = `Are you sure you want to consider ${application.contact.first_name} ${application.contact.last_name} for the role?`;
        break;
      case 'interview completed':
        confirmText = `Would ${application.contact.first_name} ${application.contact.last_name} be a finalist for this role?`;
        break;
      case 'reconsider: finalists':
        confirmText = `Do you want to reconsider ${application.contact.first_name} ${application.contact.last_name} as a finalist?`;
        break;
      case 'reconsider: not a fit':
        confirmText = `Do you want to reconsider ${application.contact.first_name} ${application.contact.last_name} as not a fit?`;
        break;
      default:
        confirmText = <span></span>;
    }

    const finalistsButton = createAButton(
      'Make this candidate a finalist',
      finalistsApplication,
      true,
      classes.greenButtons
    );

    const notAFitButton = createAButton(
      'This candidate is not a fit',
      notAFitApplication,
      true,
      classes.redButtons
    );
    const noCancelButton = (
      <Button onClick={closeDialog} variant="outlined" color="secondary">
        Cancel
      </Button>
    );

    return (
      <Dialog open={open}>
        {decision === 'interview scheduled' ? (
          <React.Fragment>
            <DialogContent>
              <Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <KeyboardDatePicker
                      margin="normal"
                      id="interview_date"
                      label="Interview Date"
                      format="MM/dd/yyyy"
                      name="interview_date"
                      value={values.interview_date || null}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FormHelperText className={classes.formHelperText}>
                      {errors.interviewDate_error || null}
                    </FormHelperText>
                    <KeyboardTimePicker
                      margin="normal"
                      id="interview_time"
                      label="Interview Time"
                      name="interview_time"
                      value={values.interview_time || null}
                      onChange={handleTimeChange}
                      minutesStep={5}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                    <FormHelperText className={classes.formHelperText}>
                      {errors.interviewTime_error || null}
                    </FormHelperText>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Typography>
            </DialogContent>
            <DialogActions className={classes.buttonsContainer}>
              <React.Fragment>
                <Button
                  onClick={closeDialog}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={submit} variant="contained" color="primary">
                  Submit
                </Button>
              </React.Fragment>
            </DialogActions>
          </React.Fragment>
        ) : decision === 'interview completed' ||
          decision === 'reconsider: finalists' ||
          decision === 'reconsider: not a fit' ? (
          <React.Fragment>
            <DialogContent className={classes.dialogContent}>
              <div className={classes.dialogHeaderContainer}>
                <IconButton
                  aria-label="close form"
                  onMouseDown={closeDialog}
                  className={classes.closeIcon}
                >
                  <CloseIcon />
                </IconButton>
              </div>

              <Typography
                variant="body1"
                component="h2"
                align="center"
                className={classes.dialogContentText}
              >
                {confirmText}
              </Typography>
            </DialogContent>
            <DialogActions className={classes.buttonsContainer}>
              <React.Fragment>
                {decision === 'interview completed'
                  ? notAFitButton
                  : noCancelButton}

                {decision === 'reconsider: finalists' ||
                decision === 'interview completed'
                  ? finalistsButton
                  : notAFitButton}
              </React.Fragment>
            </DialogActions>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogContent>
              <Typography>{confirmText}</Typography>
            </DialogContent>
            <DialogActions className={classes.buttonsContainer}>
              {noCancelButton}
              <Button
                onClick={onClickConfirmDecision}
                variant="contained"
                color="primary"
              >
                Yes
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    );
  }
);

export default withStyles(styles)(EmployerViewApplication);
