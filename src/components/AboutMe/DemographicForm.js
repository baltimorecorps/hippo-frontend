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

const DemographicForm = ({contact, onSubmit, onCloseForm, classes}) => {
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

  // todo
  // display a textfield when user checks or selects Not Listed option

  // add information icon to the header of the section
  // which expands a tooltip explaining why the information is needed

  // form validation
  // testing

  return (
    <Grid item xs={12} md={10} className={classes.form}>
      <Typography variant="h3" component="h3" className={classes.formHeader}>
        Demographic Information
      </Typography>
      <Grid item xs={12} align="end">
        <IconButton
          edge="end"
          aria-label="cancel form"
          onMouseDown={onCloseForm}
          className={classes.iconButton}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <div className={classes.allRacesContainer}>
            <div className={classes.raceGroupContainer}>
              {racesValuesGroupOne.map((race, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={race[0]}
                      onChange={handleRacesCheckbox}
                      name={racesKeys[index]}
                      color="primary"
                    />
                  }
                  className={classes.race}
                  label={race[1]}
                />
              ))}
            </div>
            <div className={classes.raceGroupContainer}>
              {racesValuesGroupTwo.map((race, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={race[0]}
                      onChange={handleRacesCheckbox}
                      name={racesKeys[index + 4]}
                      color="primary"
                    />
                  }
                  className={classes.race}
                  label={race[1]}
                />
              ))}
            </div>
          </div>
          <div className={classes.genderAndPronounsContainer}>
            <div className={classes.dropdownContainer}>
              <InputLabel htmlFor="gender" className={classes.inputLabel}>
                Gender
              </InputLabel>
              <Select
                disabled={false}
                required
                id="gender"
                value={demographic.gender}
                onChange={handleDropdownSelector}
                inputProps={{
                  name: 'gender',
                  id: 'gender',
                  classes: {select: classes.dropdownSelector},
                  'data-testid': 'gender',
                }}
              >
                {genders.map(gender => (
                  <MenuItem value={gender} key={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className={classes.formHelperText}>
                {errors.firstName_error || null}
              </FormHelperText>
            </div>
            <div className={classes.dropdownContainer}>
              <InputLabel htmlFor="pronoun" className={classes.inputLabel}>
                Pronouns
              </InputLabel>
              <Select
                disabled={false}
                required
                id="pronoun"
                value={demographic.pronoun}
                onChange={handleDropdownSelector}
                inputProps={{
                  name: 'pronoun',
                  id: 'pronoun',
                  classes: {select: classes.dropdownSelector},
                  'data-testid': 'pronoun',
                }}
              >
                {pronouns.map(pronoun => (
                  <MenuItem value={pronoun} key={pronoun}>
                    {pronoun}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className={classes.formHelperText}>
                {errors.firstName_error || null}
              </FormHelperText>
            </div>
          </div>
          <Grid item xs={12} align="end">
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

DemographicForm.propTypes = {
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
    padding: '7px 20px 20px 20px',
    backgroundColor: '#f7f7f7',
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
});

export default withStyles(styles)(DemographicForm);
