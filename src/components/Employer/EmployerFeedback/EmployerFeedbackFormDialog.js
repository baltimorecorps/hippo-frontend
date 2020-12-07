import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {createClickTracking} from 'lib/helperFunctions/helpers';
import DialogTitle from '@material-ui/core/DialogTitle';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const useForm = (
  initialValues,
  onSubmit,
  application,
  decision,
  redirectTo
) => {
  const [update, values] = useFormUpdate(initialValues, onSubmit);
  const handleSubmit = async () => {
    // const response = await onSubmit(application, payload);
    // if (Number(response.statusCode) === 200) {
    onSubmit(values);
    // }
  };

  const handleChange = event => {
    event.persist();
    console.log('event target name', event.target.name);
    console.log('event target value', event.target.value);
    update(event.target.name)(event.target.value);
  };

  return [values, handleChange, handleSubmit];
};

const ConfirmDialog = ({
  // feedbackValues,
  decision,
  classes,
  isOpen,
  closeDialog,
  // updateEmployerFeedback,
}) => {
  const updateEmployerFeedback = payload => {
    console.log('update employer feedback:', payload);
  };
  const feedbackValues = {
    highs: 'some text 11',
    lows: 'some text 123',
    skills_rate: 'Satisfied',
    interview_ability_rate: 'Very Satisfied',
  };

  const [values, handleChange, handleSubmit] = useForm(
    feedbackValues,
    updateEmployerFeedback
  );

  const [errors, setErrors] = useState({});

  const submit = () => {
    handleSubmit();

    //   const {isError, err} = interviewScheduledValidator(values);
    //   if (isError) {
    //     setErrors(err);
    //   } else {
    //     handleSubmit(values);
    //   }
    // }
  };

  const ratingLabels = [
    'Very Satisfied',
    'Satisfied',
    'Neutral',
    'Unsatisfied',
    'Very Unsatisfied',
  ];

  const ratingRadioButtons = ratingLabels.map((label, index) => (
    <FormControlLabel
      key={index}
      value={label}
      control={<Radio />}
      label={label}
      inputprops={{'aria-label': label}}
    />
  ));

  return (
    <Dialog
      data-testid="filter-applicants-form"
      maxWidth="md"
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" style={{padding: '10px 20px'}}>
        <Typography component="p" variant="h6" className={classes.dialogTitle}>
          <span data-testid="form-header"> Employer's Feedback </span>
          <IconButton
            onClick={closeDialog}
            aria-label="close filter form"
            style={{padding: '5px'}}
            data-testid="close-form-button"
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers={true}>
        <div>
          <div>
            <Typography style={{marginBottom: '15px'}}>
              Please provide feedback on this candidate. <br /> This feedback
              helps us support them in their professional next steps more
              effectively.{' '}
            </Typography>
            <form
              noValidate
              autoComplete="off"
              className={classes.textFieldContainer}
            >
              <TextField
                name="highs"
                id="highs"
                label="Candidate's Strengths"
                variant="outlined"
                color="secondary"
                multiline={true}
                rows={3}
                style={{width: '100%', marginBottom: '10px'}}
                value={values.highs}
                onChange={e => handleChange(e)}
              />
              <TextField
                name="lows"
                id="lows"
                label="Candidate's Weaknesses"
                variant="outlined"
                color="secondary"
                multiline={true}
                rows={3}
                style={{width: '100%', marginBottom: '10px'}}
                value={values.lows}
                onChange={e => handleChange(e)}
              />
            </form>

            <div style={{marginBottom: '10px'}}></div>
          </div>
          <div>
            <Typography style={{marginBottom: '15px'}}>
              Please rate candidate's "Skills" and "Interview Ability".
            </Typography>
            <div className={classes.skillsAndInterviewRatingContainer}>
              <FormControl component="fieldset" style={{marginRight: '25%'}}>
                <FormLabel
                  style={{
                    color: '#2b2b2b',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  Skills
                </FormLabel>
                <RadioGroup
                  size="small"
                  aria-label="skills rating"
                  name="skills_rate"
                  value={values.skills_rate}
                  onChange={handleChange}
                >
                  {ratingRadioButtons}
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel
                  style={{
                    color: '#2b2b2b',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  Interview Ability
                </FormLabel>
                <RadioGroup
                  aria-label="interview ability rating"
                  name="interview_ability_rate"
                  value={values.interview_ability_rate}
                  onChange={handleChange}
                >
                  {ratingRadioButtons}
                </RadioGroup>
              </FormControl>
            </div>
            <div style={{marginBottom: '10px'}}></div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          data-testid="save_feedback_button"
          onClick={submit}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
        <Button onClick={closeDialog} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  classes: PropTypes.object,
  updateEmployerFeedback: PropTypes.func.isRequired,
  feedbackValues: PropTypes.object,
  decision: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  dialogTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillsAndInterviewRatingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingRight: '20px',
  },
});

export default withStyles(styles)(ConfirmDialog);
