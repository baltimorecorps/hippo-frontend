import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';

const FormHeaderTemplate = ({header, descriptions, onCloseForm, classes}) => {
  return (
    <React.Fragment>
      <div className={classes.headerContainer}>
        <Typography variant="h3" component="h3" className={classes.formHeader}>
          {header}
        </Typography>
        <Grid align="end">
          <IconButton
            edge="end"
            aria-label="cancel form"
            onMouseDown={onCloseForm}
            className={classes.iconButton}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </div>

      {descriptions.map((description, index) => (
        <Typography
          key={index}
          variant="body1"
          component="p"
          className={classes.sectionInfo}
        >
          {description}
        </Typography>
      ))}
    </React.Fragment>
  );
};

const FormRadioButtonsTemplate = ({
  question,
  value,
  options,
  handleChange,
  name,
  ariaLabel,
  classes,
}) => {
  return (
    <div className={classes.eachQuestionContainer}>
      <FormControl component="fieldset">
        <Typography variant="body1" component="p" className={classes.question}>
          {question}
        </Typography>
        <RadioGroup
          aria-label={ariaLabel}
          name={name}
          value={value}
          onChange={handleChange}
          className={classes.radioGroup}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              className={classes.radio}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const FormCheckboxesTemplate = ({
  question,
  options,
  handleChange,
  names,
  classes,
}) => {
  return (
    <React.Fragment>
      <Typography variant="body1" component="p" className={classes.question}>
        {question}
      </Typography>
      <div className={classes.checkboxesContainer}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={option.checked}
                onChange={handleChange}
                name={names[index]}
                color="primary"
              />
            }
            className={classes.role}
            label={option.label}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

FormHeaderTemplate.propTypes = {
  header: PropTypes.string,
  descriptions: PropTypes.array,
  onCloseForm: PropTypes.func,
};
FormRadioButtonsTemplate.propTypes = {
  header: PropTypes.string,
  descriptions: PropTypes.array,
  onCloseForm: PropTypes.func,
  question: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  ariaLabel: PropTypes.string,
};

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '17px 30px 30px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  sectionInfo: {
    fontSize: '16px',
    textIndent: '25px',
    marginBottom: '15px',
    marginTop: '10px',
  },
  formControl: {
    width: '95%',
    marginTop: spacing(0),
  },
  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 19,
  },
  formHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
    width: '95%',
    marginBottom: spacing(1),
  },
  iconButton: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  allRacesContainer: {
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  raceGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  dropdownContainer: {
    marginTop: '10px',
  },
  dropdownSelector: {
    textAlign: 'left',
    width: '90px',
  },

  radio: {
    width: '100%',
    paddingLeft: '30px',
  },

  race: {
    textAlign: 'left',
  },
  genderAndPronounsContainer: {
    marginTop: spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputLabel: {
    textAlign: 'left',
  },
  submitButton: {
    margin: '10px 20px 0px 0px',
  },
  eachQuestionContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: '15px',
  },
  question: {
    color: '#000000',
    // left: '20px',
    width: '100%',
    textAlign: 'left',
  },

  checkboxesContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '15px',
  },
  role: {
    width: '100%',
    paddingLeft: '30px',
  },
});

const FormRadioButtons = withStyles(styles)(FormRadioButtonsTemplate);
const FormCheckboxes = withStyles(styles)(FormCheckboxesTemplate);
// const QuestionWithMultipleAnswersArray = withStyles(styles)(QATemplate3);
const FormHeader = withStyles(styles)(FormHeaderTemplate);

export {
  // QuestionWithOneAnswer,
  // QuestionWithMultipleAnswersObject,
  // QuestionWithMultipleAnswersArray,
  FormRadioButtons,
  FormHeader,
  FormCheckboxes,
};
