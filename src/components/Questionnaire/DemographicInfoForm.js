import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {genders, pronouns, raceLabels} from '../AboutMe/defaultData';

import {
  FormCheckboxes,
  FormTextField,
  FormDropDownSelector,
} from '../AboutMe/forms/FormTemplates';

const DemographicInfoForm = ({
  values,
  handleChange,
  handleRacesChange,
  handleRaceOther,
  classes,
}) => {
  let race = [];
  for (const [key, value] of Object.entries(values.race)) {
    race.push({name: key, checked: value});
  }

  for (const [key, value] of Object.entries(raceLabels)) {
    race.forEach((role, index) => {
      if (role.name === key) {
        race[index] = {...role, label: value};
      }
    });
  }
  const raceOptions = race.slice(0, -1);

  return (
    <React.Fragment>
      <FormCheckboxes
        question="Race (select all that apply)"
        options={raceOptions}
        onChange={handleRacesChange}
      />
      {values.race.not_listed && (
        <div className={classes.otherRace}>
          <FormTextField
            value={values.race.race_other}
            name="race_other"
            label="We understand that the options listed above are not exhaustive. If your identity is not listed above, please let us know how you identify:"
            onChange={handleRaceOther}
          />
        </div>
      )}
      <div className={classes.genderAndPronounsContainer}>
        <div className={classes.dropdownAndTextFieldContainer}>
          <FormDropDownSelector
            question="Gender"
            name="gender"
            value={values.gender}
            options={genders}
            onChange={handleChange}
          />

          {values.gender === 'Not Listed' && (
            <FormTextField
              value={values.gender_other}
              name="gender_other"
              label=" We understand that the options provided above are limited. If your gender identity is not listed above, please let us know how you identify:"
              onChange={handleChange}
            />
          )}
        </div>
        <div className={classes.dropdownAndTextFieldContainer}>
          <FormDropDownSelector
            question="Pronoun"
            name="pronoun"
            value={values.pronoun}
            options={pronouns}
            onChange={handleChange}
          />

          {values.pronoun === 'Not Listed' && (
            <FormTextField
              value={values.pronoun_other}
              name="pronoun_other"
              label="We understand that the options listed above are not exhaustive. If you use a set of pronouns that aren't listed above, please let us know what they are:"
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

DemographicInfoForm.propTypes = {
  //   contact: PropTypes.object.isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  //   onCloseAllForms: PropTypes.func.isRequired,
  //   onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({});

export default withStyles(styles)(DemographicInfoForm);
