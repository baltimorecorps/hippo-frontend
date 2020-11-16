import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useHistory} from 'react-router-dom';
import {createClickTracking} from 'lib/helperFunctions/helpers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import {interviewScheduledValidator} from 'lib/formHelpers/formValidator';
import FormHelperText from '@material-ui/core/FormHelperText';

const useForm = (
  initialValues,
  onSubmit,
  application,
  decision,
  redirectTo
) => {
  const [update, values] = useFormUpdate(initialValues);
  const handleSubmit = async () => {
    createClickTracking(
      'Making Decision',
      `Decision: ${decision}`,
      `Decision: ${decision}`
    );

    let date = null;
    let time = null;
    if (values.interview_date && values.interview_time) {
      date = values.interview_date.toISOString().substring(0, 10);
      time = values.interview_time.toString().substring(16, 24);
    }

    const currentStatus = values.status;

    let payload;
    switch (decision) {
      case 'reopen':
        payload = {
          status: 'started',
          is_active: true,
        };
        break;
      case 'recommended':
      case 'interested_in_interview':
      case 'finalist':
      case 'match':
        payload = {
          status: decision,
          is_active: true,
        };
        break;
      case 'interviewed':
        payload = {
          ...initialValues,
          status: 'interviewed',
          interview_date: date,
          interview_time: time,
          is_active: true,
        };
        break;
      case 'not a fit':
        payload = {
          status: currentStatus,
          is_active: false,
          inactive_reason: 'not a fit',
        };
        break;
      case 'withdrawn':
        payload = {
          status: currentStatus,
          is_active: false,
          inactive_reason: 'withdrawn',
        };
        break;
      default:
        payload = {
          status: currentStatus,
          is_active: values.is_active,
        };
    }
    console.log('payload', payload);

    // const response = await onSubmit(application, payload);
    // if (Number(response.statusCode) === 200) {
    redirectTo();
    // }
  };

  const handleDateChange = dateTime => {
    update('interview_date')(dateTime);
  };

  const handleTimeChange = dateTime => {
    update('interview_time')(dateTime);
  };

  return [values, handleDateChange, handleTimeChange, handleSubmit];
};

const ConfirmDialog = ({
  page,
  decision,
  classes,
  application,
  open,
  closeDialog,
  updateApplicationStatus,
}) => {
  let dateTime = null;
  let history = useHistory();

  // convert string to JS Date
  if (application.interview_date && application.interview_time) {
    dateTime = new Date(
      `${application.interview_date}T${application.interview_time}`
    );
  }
  const toEmployerBoard = () => {
    history.push(`/org/opportunity/${application.opportunity.id}/`);
  };
  const toOpportunitiesBoard = () => {
    history.push(`/internal/opportunities-board/`);
  };
  let redirectTo = toEmployerBoard;
  if (page === 'staff-review-application') {
    redirectTo = toOpportunitiesBoard;
  }
  const initialValues = {
    status: application.status,
    is_active: application.is_active,
    interview_date: dateTime,
    interview_time: dateTime,
  };
  const [values, handleDateChange, handleTimeChange, handleSubmit] = useForm(
    initialValues,
    updateApplicationStatus,
    application,
    decision,
    redirectTo
  );

  const [errors, setErrors] = useState({});

  const submit = () => {
    if (page === 'staff-review-application') {
      handleSubmit(values);
    } else {
      const {isError, err} = interviewScheduledValidator(values);

      if (isError) {
        setErrors(err);
      } else {
        handleSubmit(values);
      }
    }
  };

  const applicantName = `${application.contact.first_name} ${application.contact.last_name}`;

  let confirmText;
  switch (decision) {
    case 'reopen':
      confirmText = `Are you sure you want to reopen ${applicantName}'s application?`;
      break;
    case 'recommended':
      confirmText = `Are you sure you want to recommend ${applicantName} to the employer?`;
      break;
    case 'interested_in_interview':
      confirmText = `Are you sure you are interested in interview ${applicantName}?`;
      break;
    case 'finalist':
      confirmText = `Are you sure you want to consider ${applicantName} as a finalist?`;
      break;
    case 'match':
      confirmText = `Are you sure you want to match ${applicantName} with this position?`;
      break;
    case 'not a fit':
      confirmText = `Are you sure you want to consider ${applicantName} is not a fit?`;
      break;
    case 'withdrawn':
      confirmText = `Are you sure you want to withdraw ${applicantName}'s application?`;
      break;
    default:
      confirmText = null;
  }

  return (
    <Dialog open={open} data-testid="confirm_dialog">
      {decision === 'interviewed' ? (
        <React.Fragment>
          <DialogContent>
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
      ) : (
        <React.Fragment>
          <DialogContent>
            <Typography data-testid="confirm_dialog_text_content">
              {confirmText}
            </Typography>
          </DialogContent>
          <DialogActions className={classes.buttonsContainer}>
            <Button
              onClick={closeDialog}
              variant="outlined"
              color="secondary"
              data-testid="cancel_confirm_dialog_button"
            >
              Cancel
            </Button>
            <Button onClick={submit} variant="contained" color="primary">
              Yes
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  page: PropTypes.string.isRequired,
  classes: PropTypes.object,
  updateApplicationStatus: PropTypes.func.isRequired,
  application: PropTypes.object,
  decision: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
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

export default withStyles(styles)(ConfirmDialog);
