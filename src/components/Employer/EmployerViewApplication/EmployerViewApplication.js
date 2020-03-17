import React, {useState, useEffect} from 'react';
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

const EmployerViewApplication = ({
  classes,
  application,
  contactId,
  opportunityId,
  back,
  getApplication,
  employerInterviewApplication,
  employerNotAFitApplication,
  employerConsiderApplication,
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

  // const toConfirmationPage = () => {
  //   history.push('/staff-confirmation-page');
  // };

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
  const handleClickNotAFit = () => {
    setDecision('employer: not a fit');
    setConfirmed(true);
  };
  const handleClickConsider = () => {
    setDecision('consider');
    setConfirmed(true);
  };

  const notAFitApplication = async () => {
    const response = await employerNotAFitApplication(contactId, opportunityId);
    if (response.statusCode == 200) {
      toEmployerBoard();
    }
  };
  const considerApplication = async () => {
    const response = await employerConsiderApplication(
      contactId,
      opportunityId
    );
    if (response.statusCode == 200) {
      toEmployerBoard();
    }
  };
  const toEmployerBoardButton = createAButton(
    "To Employer's Opportunity Board",
    toEmployerBoard,
    true,
    classes.buttons
  );

  return (
    <div className={classes.container}>
      {toEmployerBoardButton}
      <ViewFullApplication application={application} />
      <StickyFooter
        applicationStatus={application.status}
        application={application}
        page="employer-review-application"
        back={toEmployerBoard}
        interviewScheduled={handleClickInterViewScheduled}
        interviewCompleted={handleClickInterViewCompleted}
        notAFit={handleClickNotAFit}
        consider={handleClickConsider}
        applicantId={application && application.contact.id}
        opportunityId={opportunityId}
      />
      <ConfirmDialog
        application={application}
        open={confirmed}
        decision={decision}
        closeDialog={() => setConfirmed(false)}
        notAFitApplication={notAFitApplication}
        considerApplication={considerApplication}
        employerInterviewApplication={employerInterviewApplication}
        toEmployerBoard={toEmployerBoard}
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
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 24px 15px',
    marginBottom: spacing(2),
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
    // justifyContent: 'space-between',

    flexDirection: 'column',
  },
  dialogHeader: {
    alignSelf: 'center',
    top: '-25px',
    position: 'relative',
  },
  dialogContentText: {
    // display: 'flex',
    // justifyContent: 'space-between',
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
    if (response.statusCode == 200) {
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
    considerApplication,
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

    const onClickConfirmDecision = () => {
      if (decision === 'consider') {
        createClickTracking(
          'Employer Making Decision',
          'Click Confirm Consider Application',
          'Click Confirm Consider Application'
        );
        considerApplication();
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
        confirmText = `Are you sure you want to consider ${application.contact.first_name} ${application.contact.first_name} for the role?`;
        break;
      default:
        confirmText = <span></span>;
    }

    const consideredForRoleButton = createAButton(
      'Yes',
      considerApplication,
      true,
      classes.greenButtons
    );
    const notAFitButton = createAButton(
      'No',
      notAFitApplication,
      true,
      classes.redButtons
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
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </React.Fragment>
            </DialogActions>
          </React.Fragment>
        ) : decision === 'interview completed' ? (
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
                {/* <Typography
                  variant="h5"
                  component="h2"
                  className={classes.dialogHeader}
                >
                  
                </Typography> */}
              </div>

              <Typography
                variant="body1"
                component="h2"
                align="center"
                className={classes.dialogContentText}
              >
                {`Are you still considering ${application.contact.first_name} ${application.contact.last_name} for the role?`}
              </Typography>
            </DialogContent>
            <DialogActions className={classes.buttonsContainer}>
              <React.Fragment>
                {notAFitButton}

                {consideredForRoleButton}
              </React.Fragment>
            </DialogActions>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogContent>
              <Typography>{confirmText}</Typography>
            </DialogContent>
            <DialogActions className={classes.buttonsContainer}>
              <Button
                onClick={closeDialog}
                variant="contained"
                color="secondary"
              >
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
          </React.Fragment>
        )}
      </Dialog>
    );
  }
);

export default withStyles(styles)(EmployerViewApplication);
