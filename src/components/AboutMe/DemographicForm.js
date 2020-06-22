import React, {useState} from 'react';
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

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  if (values.email_primary.type == null) {
    const updatedEmail = {
      ...values.email_primary,
      type: 'Personal',
    };
    update('email_primary')(updatedEmail);
    update('emails')([updatedEmail]);
  }

  const handlers = {
    handleChange: event => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleSubmit: values => {
      onSubmit(values);
    },
    handlePhoneChange: value => {
      update('phone_primary')(value);
    },
    handleEmailChange: event => {
      const updatedEmail = {
        ...values.email_primary,
        email: event.target.value,
      };
      update('email_primary')(updatedEmail);
    },
  };

  return [values, handlers];
};

const DemographicForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {handleChange, handleSubmit, handlePhoneChange, handleEmailChange},
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    values.email = values.email_primary.email;
    const {isError, err} = newProfileValidator(values);

    if (isError) {
      setErrors(err);
    } else {
      handleSubmit(values);
      onCloseForm();
    }
  };

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

  const [races, setRaces] = useState([]);

  const handleCheckbox = e => {
    e.persist();
    console.log(e.target.name);
    console.log(e.target.checked);
  };

  const allRaces = [
    [
      'American Indian or Alaskan Native',
      'Asian',
      'Black or African Descent',
      'Hispanic or Latinx',
    ],
    [
      'Native Hawaiian or Other Pacific Islander',
      'South Asian',
      'White',
      'Not Listed',
    ],
  ];
  const genders = ['Female', 'Male', 'Non-Binary', 'Not Listed'];
  const pronouns = ['She/Her', 'He/Him', 'They/Them', 'Not Listed'];

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
          {/* <Grid container justify="space-between"> */}
          <div className={classes.allRacesContainer}>
            {allRaces.map(raceGroup => (
              <div className={classes.raceGroupContainer}>
                {raceGroup.map(race => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={races}
                        onChange={handleCheckbox}
                        name={race}
                        color="primary"
                      />
                    }
                    className={classes.race}
                    label={race}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={classes.genderAndPronounsContainer}>
            <div className={classes.genderContainer}>
              <InputLabel htmlFor="gender" className={classes.genderInputLabel}>
                Gender
              </InputLabel>
              <Select
                disabled={false}
                required
                id="gender"
                value={values.gender || ''}
                onChange={handleChange}
                inputProps={{
                  name: 'gender',
                  id: 'gender',
                  classes: {select: classes.gender},
                  'data-testid': 'gender',
                }}
              >
                {genders.map(gender => (
                  <MenuItem value={values.gender} key={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className={classes.formHelperText}>
                {errors.firstName_error || null}
              </FormHelperText>
            </div>
            <div className={classes.pronounContainer}>
              <InputLabel
                htmlFor="pronoun"
                className={classes.pronounInputLabel}
              >
                Pronouns
              </InputLabel>
              <Select
                disabled={false}
                required
                id="pronoun"
                value={values.pronoun || ''}
                onChange={handleChange}
                inputProps={{
                  name: 'pronoun',
                  id: 'pronoun',
                  classes: {select: classes.pronoun},
                  'data-testid': 'pronoun',
                }}
              >
                {pronouns.map(pronoun => (
                  <MenuItem value={values.pronoun} key={pronoun}>
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
  gender: {
    textAlign: 'left',

    width: '120px',
  },
  pronoun: {
    textAlign: 'left',

    width: '120px',
  },
  race: {
    textAlign: 'left',
    // fontSize: '10px',
    // marginBottom: '1px',
  },
  genderAndPronounsContainer: {
    marginTop: spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
});

export default withStyles(styles)(DemographicForm);
