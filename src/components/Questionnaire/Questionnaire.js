import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import ContactInfoForm from '../AboutMe/forms/ContactInfoForm';
import DemographicForm from '../AboutMe/forms/DemographicForm';
import InterestsAndGoalsForm from '../AboutMe/forms/InterestsAndGoalsForm';
import ProgramsAndEligibilityForm from '../AboutMe/forms/ProgramsAndEligibilityForm';

import mockData from '../AboutMe/mockData';
import mockDataEmpty from '../AboutMe/mockDataEmpty';

const AboutMeForms = ({
  // contact,
  onSubmit,
  onCloseAllForms,
  onClickEdit,
  classes,
}) => {
  // const contact = mockData;
  const contact = mockDataEmpty;
  const email = contact.email_primary ? contact.email_primary.email : '';

  const [openForms, setOpenForms] = useState({
    contact_info: false,
    interests_goals: false,
    programs_eligibility: false,
    demographic_info: false,
  });

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
  const createTextField = (name, label, value, onChange, error) => {
    return (
      <Grid item xs={12} md={6} align="center">
        <TextField
          required
          id={name}
          label={label}
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
    );
  };
  const createDropdownSelector = (
    name,
    label,
    value,
    options,
    onChange,
    error
  ) => {
    return (
      <Grid item xs={12} md={6} align="center">
        <div className={classes.dropdownContainer}>
          <InputLabel htmlFor={name} className={classes.dropdownInputLabel}>
            {label}
          </InputLabel>
          <Select
            disabled={false}
            required
            id={name}
            className={classes.dropdown}
            value={value || ''}
            onChange={onChange}
            inputProps={{
              name: name,
              id: name,
              'data-testid': name,
            }}
          >
            {options.map(option => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className={classes.formHelperText}>
            {error || null}
          </FormHelperText>
        </div>
      </Grid>
    );
  };

  return (
    <Grid container justify="center">
      <ContactInfoForm contact={contact} onSubmit={onSubmit} />
      <InterestsAndGoalsForm profile={contact.profile} onSubmit={onSubmit} />
      <DemographicForm profile={contact.profile} onSubmit={onSubmit} />
    </Grid>
  );
};

AboutMeForms.propTypes = {
  contact: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseAllForms: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  expansionPanel: {
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(1),
    width: '100%',
  },
  header: {
    backgroundColor: '#d9d9d9',
  },
  extraPadding: {
    width: '100%',
    padding: '10px 30px 0px 30px',
  },
});

export default withStyles(styles)(AboutMeForms);
