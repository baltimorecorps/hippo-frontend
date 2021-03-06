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
        <Typography
          variant="h3"
          component="h3"
          className={classes.formHeader}
          data-testid="form_header"
        >
          {header}
        </Typography>
        {onCloseForm && (
          <Grid align="end">
            <IconButton
              edge="end"
              aria-label="cancel form"
              onClick={() => onCloseForm()}
              className={classes.iconButton}
              data-testid="close_form_button"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        )}
      </div>
      <div className={classes.descriptionsContainer}>
        {descriptions.map((description, index) => (
          <Typography
            key={index}
            variant="body1"
            component="p"
            className={classes.sectionInfo}
            data-testid="form_description"
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
        <Typography
          variant="body1"
          component="p"
          className={classes.question}
          data-testid="question"
        >
          {question}
        </Typography>
        <RadioGroup
          aria-label={ariaLabel}
          name={name}
          value={value || ''}
          onChange={onChange}
          className={classes.radioGroup}
          data-testid="radio_buttons"
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              className={classes.radio}
              value={option}
              control={<Radio />}
              label={option}
              data-testid="radio_button_option"
            />
          ))}
        </RadioGroup>
        <FormHelperText className={classes.formHelperText} data-testid="error">
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
        <Typography
          variant="body1"
          component="p"
          className={classes.question}
          data-testid="question"
        >
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
            data-testid="checkbox_option"
          />
        ))}
      </div>
      <FormHelperText className={classes.formHelperText} data-testid="error">
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
        onClick={() => onSubmit()}
        align="end"
        data-testid="submit_button"
      >
        Save
      </Button>
    </Grid>
  );
};
const FormDropDownSelectorTemplate = ({
  isLabelInside,
  question,
  value,
  name,
  options,
  onChange,
  error,
  classes,
}) => {
  const theDropdownSelector = (
    <React.Fragment>
      <Select
        disabled={false}
        className={isLabelInside ? classes.dropdown : null}
        required
        id={name}
        value={value || ''}
        onChange={onChange}
        inputProps={{
          name: name,
          id: name,
          classes: {select: !isLabelInside ? classes.dropdownSelector : null},
          'data-testid': 'dropdown_selector',
        }}
      >
        {options.map(option => (
          <MenuItem value={option} key={option} data-testid="selector_option">
            {option}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText className={classes.formHelperText}>
          {error || null}
        </FormHelperText>
      )}
    </React.Fragment>
  );
  const labelOutsideDropdown = (
    <div
      className={classes.dropdownContainer}
      data-testid="label_outside_dropdown_selector"
    >
      <FormControl>
        <Typography
          variant="body1"
          component="p"
          className={classes.dropdownLabel}
          data-testid="question"
        >
          {question}
        </Typography>

        {theDropdownSelector}
      </FormControl>
    </div>
  );
  const labelInsideDropdown = (
    <Grid
      item
      xs={12}
      md={6}
      align="center"
      data-testid="label_inside_dropdown_selector"
    >
      <div className={classes.dropdownContainerLabelInside}>
        <InputLabel
          htmlFor={name}
          className={classes.dropdownInputLabel}
          data-testid="question"
        >
          {question}
        </InputLabel>
        {theDropdownSelector}
      </div>
    </Grid>
  );

  if (isLabelInside) {
    return labelInsideDropdown;
  } else {
    return labelOutsideDropdown;
  }
};

const FormTextFieldTemplate = ({
  isRequired,
  isLabelInside,
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
    'data-testid': 'text_field',
  };

  const textFieldAndError = (
    <React.Fragment>
      <TextField
        required={isRequired}
        id={name}
        label={isLabelInside ? label : null}
        className={isLabelInside ? classes.formControl : classes.formControl50}
        name={name}
        value={value || ''}
        onChange={onChange}
        InputLabelProps={inputLabelProps}
        inputProps={inputProps}
      />
      <FormHelperText className={classes.formHelperText} data-testid="error">
        {error || null}
      </FormHelperText>
    </React.Fragment>
  );

  const labelInsideTextField = (
    <Grid
      item
      xs={12}
      md={6}
      align="center"
      data-testid="label_inside_text_field"
    >
      {textFieldAndError}
    </Grid>
  );

  const labelOutsideTextField = (
    <Grid
      container
      style={{marginBottom: '10px'}}
      direction="column"
      data-testid="label_outside_text_field"
    >
      <Typography
        variant="body1"
        component="p"
        className={classes.textFieldLabel}
        data-testid="label"
      >
        {label}
      </Typography>
      <Grid item xs={12} align="left">
        {textFieldAndError}
      </Grid>
    </Grid>
  );

  if (isLabelInside) {
    return labelInsideTextField;
  } else {
    return labelOutsideTextField;
  }
};
const FormMultiRowsTextFieldTemplate = ({
  value,
  name,
  question,
  onChange,
  error,
  classes,
}) => {
  return (
    <Grid container style={{marginBottom: '10px'}} direction="column">
      <Typography
        variant="body1"
        component="p"
        className={classes.question}
        data-testid="question"
      >
        {question}
      </Typography>
      <TextField
        required
        id={name}
        name={name}
        value={value || ''}
        multiline
        rows={6}
        onChange={onChange}
        variant="outlined"
        style={{width: '100%'}}
        inputProps={{
          'data-testid': 'text_field',
        }}
      />
      <FormHelperText className={classes.formHelperText} data-testid="error">
        {error || null}
      </FormHelperText>
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
  },
  formControl50: {
    width: '95%',
    [breakpoints.up('sm')]: {
      width: '50%',
    },
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
    // marginTop: '2px',
    width: '95%',
    marginBottom: spacing(2),
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
  dropdownContainerLabelInside: {
    width: '95%',
  },
  dropdown: {
    width: '100%',
    textAlign: 'left',
  },
  dropdownLabel: {
    color: '#000000',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  dropdownInputLabel: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: '2px',
  },
  dropdownSelector: {
    textAlign: 'left',
    width: '100%',
    alignSelf: 'flex-start',
    margin: 0,
  },

  radio: {
    width: '100%',
    textAlign: 'left',

    [breakpoints.up('md')]: {
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
    [breakpoints.up('md')]: {
      marginLeft: '20px',
    },
  },
  textFieldLabel: {
    color: 'grey',
    textAlign: 'justify',
  },
  valuesQuestions: {
    margin: '10px 0px 20px 0px',
  },
  // question: {
  //   marginBottom: '10px',
  //   fontWeight: 'bold',
  //   color: '#303030',
  //   fontSize: '15px',
  //   textAlign: 'left',
  // },
});

const FormRadioButtons = withStyles(styles)(FormRadioButtonsTemplate);
const FormDropDownSelector = withStyles(styles)(FormDropDownSelectorTemplate);
const FormCheckboxes = withStyles(styles)(FormCheckboxesTemplate);
const FormSubmitButton = withStyles(styles)(FormSubmitButtonTemplate);
const FormHeader = withStyles(styles)(FormHeaderTemplate);
const FormTextField = withStyles(styles)(FormTextFieldTemplate);
const FormMultiRowsTextField = withStyles(styles)(
  FormMultiRowsTextFieldTemplate
);

export {
  FormRadioButtons,
  FormHeader,
  FormCheckboxes,
  FormSubmitButton,
  FormDropDownSelector,
  FormTextField,
  FormMultiRowsTextField,
};
