import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import useFormUpdate from 'lib/useFormUpdate';

import AchievementInputsList from './AchievementInputsList';
import SelectorForm from './SelectorForm';
import DegreeDropdown from './DegreeDropdown';
import FormHelperText from '@material-ui/core/FormHelperText';
import { experienceValidator } from '../../../lib/formValidator';
import { configureForm } from '../ExperiencesList/helpers';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import LocationTextField from './LocationTextField';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: (event) => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleSubmit: () => {
      onSubmit(values);
    },
    handleDegree: (event) => {
      update('degree')(event.target.value);
    },
    handleLocation: (location) => {
      update('location')(location);
    },
    handleIsCurrent: (e) => {
      e.persist();
      values.is_current = e.target.checked;
      if (values.is_current === true) {
        update('end_month')('none');
        update('end_year')('0');
      } else {
        update('end_month')('');
        update('end_year')('');
      }
    },
    handleAchievements: update('achievements'),
  };

  return [values, handlers];
};

const AddOrEditExperienceForm = ({
  experience,
  onSubmit,
  handleCancel,
  classes,
}) => {
  const config = configureForm(experience.type);
  if (!config.showEndDate) {
    experience['end_year'] = 0;
    experience['end_month'] = 'none';
  }

  const [
    values,
    {
      handleChange,
      handleSubmit,
      handleDegree,
      handleAchievements,
      handleLocation,
      handleIsCurrent,
    },
  ] = useForm(experience, onSubmit);

  // eslint-disable-next-line no-unused-vars
  const handleChangeDescription = (idx) => (evt) => {
    const newAchievements = this.state.achievements.map((achievement, sidx) => {
      if (idx !== sidx) return achievement;
      return { ...achievement, description: evt.target.value };
    });
    this.setState({ achievements: newAchievements });
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  const inputProps = { classes: { input: classes.resize } };

  const [errors, setErrors] = React.useState({});

  const handleFormSubmit = () => {
    // validate form values
    const { isError, err } = experienceValidator(values, experience.type);

    if (isError) {
      setErrors(err);
    } else {
      return handleSubmit();
    }
  };

  if (typeof values.start_year === String) {
    values.start_year = null;
  }

  return (
    <Dialog className={classes.modal} open={true}>
      <form autoComplete="off">
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={12} />

            <Grid item xs={12}>
              <TextField
                required
                id="host"
                className={classes.formControl}
                label={config.labels.host || 'Organization'}
                value={values.host}
                name="host"
                onChange={handleChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.host_error || null}
              </FormHelperText>
            </Grid>
            {config.showDegree && (
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="degree">Degree</InputLabel>
                  <DegreeDropdown
                    value={values.degree}
                    onChange={handleDegree}
                  />
                  <FormHelperText className={classes.formHelperText}>
                    {errors.degree_error || null}
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                className={classes.formControl}
                label={config.labels.title || 'Title'}
                value={values.title}
                name="title"
                onChange={handleChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.title_error || null}
              </FormHelperText>
            </Grid>
            {config.showLocation && (
              <Grid item xs={12}>
                <LocationTextField
                  id="city"
                  className={classes.formControl}
                  label="Location"
                  value={values.location || ''}
                  name="location"
                  handleLocationChange={handleLocation}
                />
                <FormHelperText className={classes.formHelperText}>
                  {errors.location_error || null}
                </FormHelperText>
              </Grid>
            )}
            <Grid item xs={6}>
              <SelectorForm
                type="month"
                label={
                  experience.type === 'Accomplishment' ? 'Month' : 'Start Month'
                }
                name="start_month"
                value={values.start_month}
                onChange={handleChange}
                helperText={errors.startMonth_error || null}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectorForm
                type="year"
                label={
                  experience.type === 'Accomplishment' ? 'Year' : 'Start Year'
                }
                name="start_year"
                value={values.start_year}
                onChange={handleChange}
                helperText={errors.startYear_error || null}
              />
            </Grid>
            {config.showEndDate ? (
              <React.Fragment>
                <Grid item xs={6}>
                  <SelectorForm
                    disabled={values.is_current}
                    type="month"
                    label={values.is_current ? 'Present' : 'End Month'}
                    name="end_month"
                    value={values.end_month === 'none' ? '' : values.end_month}
                    onChange={handleChange}
                    helperText={
                      errors.endMonth_error && !values.is_current
                        ? errors.endMonth_error
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectorForm
                    disabled={values.is_current}
                    type="year"
                    label={values.is_current ? 'Present' : 'End Year'}
                    name="end_year"
                    value={
                      values.end_year === 0 || values.end_year === '0'
                        ? ''
                        : values.end_year
                    }
                    onChange={handleChange}
                    helperText={
                      errors.endYear_error && !values.is_current
                        ? errors.endYear_error
                        : null
                    }
                  />
                </Grid>
              </React.Fragment>
            ) : null}
            {config.showEndDate && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.is_current}
                      onChange={handleIsCurrent}
                      value={values.is_current}
                      name="is_current"
                      color="primary"
                      data-testid="is_current"
                    />
                  }
                  label={
                    values.type === 'Education'
                      ? 'I am currently enrolled'
                      : 'I am currently working in this role'
                  }
                />
              </Grid>
            )}
            {config.showDescription && (
              <Grid item xs={12}>
                <TextField
                  className={classes.formControl}
                  label={config.labels.description || 'Description'}
                  value={values.description}
                  name="description"
                  id="description"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                />
              </Grid>
            )}
            {config.showAchievements && (
              <Grid item xs={12}>
                <AchievementInputsList
                  contactId={experience.contact_id}
                  achievements={values.achievements}
                  onChange={handleAchievements}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions className={classes.dialogAction}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  modal: {
    margin: 'auto',
  },
  dialogContent: {
    width: '500px',
  },
  dialogAction: {
    paddingBottom: '20px',
  },
  formControl: {
    width: '100%',
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
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
  },
});

AddOrEditExperienceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf([
      '',
      'High School',
      'Associates',
      'Undergraduate',
      'Masters',
      'Doctoral',
    ]),
    start_month: PropTypes.string.isRequired,
    start_year: PropTypes.string.isRequired,
    end_month: PropTypes.string,
    end_year: PropTypes.string,
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education'])
      .isRequired,
    contact_id: PropTypes.number,
    achievements: PropTypes.array,
  }).isRequired,
};

export default withStyles(styles)(AddOrEditExperienceForm);
