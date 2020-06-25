import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import MuiPhoneNumber from 'material-ui-phone-number';

import {newProfileValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import mockData from './mockData';
import {genders, pronouns} from './defaultData';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: event => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleSubmit: values => {
      onSubmit(values);
    },

    handleRacesChange: changedDemographic => {
      update('demographic')(changedDemographic);
    },
  };

  return [values, handlers];
};

const InterestsAndGoalsForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [values, {handleChange, handleSubmit, handleRacesChange}] = useForm(
    mockData,
    onSubmit
  );
  const [errors, setErrors] = useState({});

  const {demographic} = values;
  const racesKeys = Object.keys(demographic.races);
  const racesValuesGroupOne = Object.values(demographic.races).slice(0, 4);
  const racesValuesGroupTwo = Object.values(demographic.races).slice(4, 8);

  const handleRacesCheckbox = event => {
    event.persist();
    const updatedDemographic = {
      ...demographic,
      races: {
        ...demographic.races,
        [event.target.name]: [
          event.target.checked,
          demographic.races[event.target.name][1],
        ],
      },
    };
    handleRacesChange(updatedDemographic);
  };
  const handleDropdownSelector = event => {
    event.persist();
    const updatedDemographic = {
      ...demographic,
      [event.target.name]: event.target.value,
    };
    handleRacesChange(updatedDemographic);
  };

  const submit = () => {
    const {isError, err} = newProfileValidator(values);

    if (isError) {
      setErrors(err);
    } else {
      handleSubmit(values);
      onCloseForm();
    }
  };

  const roles = [
    'Advocacy and Public Policy',
    'Community Engagement and Outreach',
    'Data Analysis',
    'Fundraising and Development',
    'Marketing and Public Relations',
    'Operations and Administration',
    'Program Management',
  ];

  // todo
  // display a textfield when user checks or selects Not Listed option

  // form validation
  // testing

  return (
    <Grid item xs={12} md={10} className={classes.form}>
      <div className={classes.headerContainer}>
        <Typography variant="h3" component="h3" className={classes.formHeader}>
          Interests and Goals
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

      <Typography variant="body1" component="p" className={classes.sectionInfo}>
        The questions below help us understand a little bit more about your
        experience and which roles you might be interested in applying for.
      </Typography>

      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <div className={classes.eachQuestionContainer}>
            <FormControl component="fieldset">
              <Typography
                variant="body1"
                component="p"
                className={classes.question}
              >
                How many years of professional experience (internships,
                advocacy, employed etc.) do you have?
              </Typography>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value="female"
                onChange={handleChange}
                className={classes.radioGroup}
              >
                <FormControlLabel
                  className={classes.radio}
                  value="0-2 years"
                  control={<Radio />}
                  label="0-2 years"
                />
                <FormControlLabel
                  className={classes.radio}
                  value="3-5 years"
                  control={<Radio />}
                  label="3-5 years"
                />
                <FormControlLabel
                  className={classes.radio}
                  value="5+ years"
                  control={<Radio />}
                  label="5+ years"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className={classes.interestedRolesContainer}>
            <Typography
              variant="body1"
              component="p"
              className={classes.question}
            >
              Which of the following types of roles are you interested in
              applying for? (select all that apply)
            </Typography>
            <div className={classes.checkboxesContainer}>
              {roles.map(role => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      onChange={handleRacesCheckbox}
                      name={role}
                      color="primary"
                    />
                  }
                  className={classes.role}
                  label={role}
                />
              ))}
            </div>
            <div className={classes.eachQuestionContainer}>
              <FormControl component="fieldset">
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.question}
                >
                  Have you participated in any of Baltimore Corps' programs and
                  services already?
                </Typography>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value="no"
                  onChange={handleChange}
                  className={classes.radioGroup}
                >
                  <FormControlLabel
                    className={classes.radio}
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    className={classes.radio}
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={classes.genderAndPronounsContainer}></div>
          <Grid item xs={12} align="end" className={classes.submitButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              align="end"
            >
              Save
            </Button>
          </Grid>
          {/* </Grid> */}
        </form>
      </Grid>
    </Grid>
  );
};

InterestsAndGoalsForm.propTypes = {
  contact: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email_primary: PropTypes.object.isRequired,
    phone_primary: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
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

  radio: {
    width: '100%',
    paddingLeft: '30px',
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
  inputLabel: {
    textAlign: 'left',
  },
  submitButton: {
    margin: '10px 20px 0px 0px',
  },
});

export default withStyles(styles)(InterestsAndGoalsForm);
