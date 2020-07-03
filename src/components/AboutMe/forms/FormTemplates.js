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
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
      <div className={classes.descriptionsContainer}>
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
      </div>
    </React.Fragment>
  );
};

const FormRadioButtonsTemplate = ({
  question,
  value,
  options,
  onChange,
  name,
  ariaLabel,
  error,
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
          onChange={onChange}
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
        <FormHelperText className={classes.formHelperText}>
          {error || null}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

const FormCheckboxesTemplate = ({
  question,
  options,
  onChange,
  error,
  classes,
}) => {
  return (
    <React.Fragment>
      {question && (
        <Typography variant="body1" component="p" className={classes.question}>
          {question}
        </Typography>
      )}
      <div className={classes.checkboxesContainer}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={option.checked}
                onChange={onChange}
                name={option.name}
                color="primary"
              />
            }
            className={classes.checkbox}
            label={option.label}
          />
        ))}
      </div>
      <FormHelperText className={classes.formHelperText}>
        {error || null}
      </FormHelperText>
    </React.Fragment>
  );
};
const FormSubmitButtonTemplate = ({onSubmit, classes}) => {
  return (
    <Grid item xs={12} align="end" className={classes.submitButton}>
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
        align="end"
      >
        Save
      </Button>
    </Grid>
  );
};
const FormDropDownSelectorTemplate = ({
  question,
  value,
  name,
  options,
  onChange,
  classes,
}) => {
  return (
    <div className={classes.dropdownContainer}>
      <InputLabel htmlFor={name} className={classes.inputLabel}>
        {question}
      </InputLabel>
      <Select
        disabled={false}
        required
        id={name}
        value={value}
        onChange={onChange}
        inputProps={{
          name: name,
          id: name,
          classes: {select: classes.dropdownSelector},
          'data-testid': name,
        }}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
const FormTextFieldTemplate = ({
  value,
  name,
  label,
  onChange,
  error,
  classes,
}) => {
  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
    shrink: true,
  };

  const inputProps = {
    classes: {input: classes.resize},
    autoComplete: 'off',
  };
  return (
    <Grid container style={{marginBottom: '10px'}} direction="column">
      <Typography
        variant="body1"
        component="p"
        className={classes.textFieldLabel}
      >
        {label}
      </Typography>
      <Grid item xs={8} sm={6} md={5} lg={4} align="center">
        <TextField
          required
          id={name}
          // label={label}
          className={classes.formControl}
          name={name}
          value={value}
          onChange={onChange}
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
        />
        <FormHelperText className={classes.formHelperText}>
          {error || null}
        </FormHelperText>
      </Grid>
    </Grid>
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
FormSubmitButtonTemplate.propTypes = {
  onSubmit: PropTypes.func,
};
FormTextFieldTemplate.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.object,
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
    marginBottom: '7px',
  },
  descriptionsContainer: {
    marginBottom: '15px',
  },
  sectionInfo: {
    fontSize: '16px',
    textIndent: '25px',
    textAlign: 'justify',
    marginBottom: '5px',
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
    margin: '10px 0',
  },
  dropdownSelector: {
    textAlign: 'left',
    width: '90px',
  },

  radio: {
    width: '100%',
    textAlign: 'left',

    [breakpoints.up('sm')]: {
      marginLeft: '20px',
    },
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
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '15.5px',
    marginBottom: spacing(1),
  },

  checkboxesContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '15px',
  },
  checkbox: {
    width: '100%',
    textAlign: 'left',
    [breakpoints.up('sm')]: {
      marginLeft: '20px',
    },
  },
  textFieldLabel: {
    color: 'grey',
    textAlign: 'justify',
  },
});

const FormRadioButtons = withStyles(styles)(FormRadioButtonsTemplate);
const FormDropDownSelector = withStyles(styles)(FormDropDownSelectorTemplate);
const FormCheckboxes = withStyles(styles)(FormCheckboxesTemplate);
const FormSubmitButton = withStyles(styles)(FormSubmitButtonTemplate);
const FormHeader = withStyles(styles)(FormHeaderTemplate);
const FormTextField = withStyles(styles)(FormTextFieldTemplate);

export {
  FormRadioButtons,
  FormHeader,
  FormCheckboxes,
  FormSubmitButton,
  FormDropDownSelector,
  FormTextField,
};
