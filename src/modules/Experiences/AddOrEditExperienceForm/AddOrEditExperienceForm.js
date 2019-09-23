import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';

import useFormUpdate from 'lib/useFormUpdate';

import AchievementInputsList from './AchievementInputsList';
import DatePickerForm from './DatePickerForm';
import DegreeDropdown from './DegreeDropdown';

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
    handleAchievements: update('achievements'),
  };

  return [values, handlers];
};

const configureForm = (expType) => {
  if (expType === 'Work') {
    return {
      labels: {
        host: 'Organization',
        title: 'Title',
      },
      showDescription: true,
      showEndDate: true,
      showAchievements: true,
    };
  } else if (expType === 'Service') {
    return {
      labels: {
        host: 'Organization',
        title: 'Role',
      },
      showEndDate: true,
      showAchievements: true,
    };
  } else if (expType === 'Accomplishment') {
    return {
      labels: {
        host: 'Institution / Publisher',
        title: 'Title',
        startDate: 'Date Issued',
      },
      showDescription: true,
    };
  } else if (expType === 'Education') {
    return {
      labels: {
        host: 'Institution',
        title: 'Field of Study',
        endDate: 'End Date (or expected)',
      },
      showEndDate: true,
      showDegree: true,
      showDescription: true,
      showAchievements: true,
    };
  }
};

const AddOrEditExperienceForm = ({ experience, onSubmit, handleCancel, classes }) => {
  const [values, { handleChange, handleSubmit, handleDegree, handleAchievements }] = useForm(
    experience,
    onSubmit,
  );

  const config = Object.assign(
    {
      labels: {},
      showEndDate: false,
      showDegree: false,
      showDescription: false,
      showAchievements: false,
    },
    configureForm(experience.type),
  );

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

  const inputProps = { classes: { input: classes.resize, shrink: false } };

  return (
    <Dialog className={classes.modal} open={true}>
      <form autoComplete="off">
        <DialogContent>
          <TextField
            id="host"
            className={classes.formControl}
            label={config.labels.host || 'Organization'}
            value={values.host}
            name="host"
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />

          {config.showDegree && (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="degree">Degree</InputLabel>
              <DegreeDropdown value={values.degree} onChange={handleDegree} />
            </FormControl>
          )}

          <TextField
            id="title"
            className={classes.formControl}
            label={config.labels.title || 'Title'}
            value={values.title}
            name="title"
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />

          <DatePickerForm
            type="month"
            label="Start Month"
            name="start_month"
            value={values.start_month}
            onChange={handleChange}
          />
          <DatePickerForm
            type="year"
            label="Start Year"
            name="start_year"
            value={values.start_year}
            onChange={handleChange}
          />
          <DatePickerForm
            type="month"
            label="End Month"
            name="end_month"
            value={values.end_month}
            onChange={handleChange}
          />
          <DatePickerForm
            type="year"
            label="End Year"
            name="end_year"
            value={values.end_year}
            onChange={handleChange}
          />

          {config.showDescription && (
            <TextField
              className={classes.formControl}
              label={config.labels.description || 'Description'}
              value={values.description}
              name="description"
              id="description"
              multiline
              onChange={handleChange}
              InputLabelProps={inputLabelProps}
              InputProps={inputProps}
            />
          )}

          <Divider />
          {config.showAchievements && (
            <AchievementInputsList
              contactId={experience.contact_id}
              achievements={values.achievements}
              onChange={handleAchievements}
              InputLabelProps={inputLabelProps}
              InputProps={inputProps}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
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
    //width: 600,
    //margin: 'auto',
  },
  formControl: {
    width: '100%',
    marginBottom: spacing(2),
  },
  resize: {
    fontSize: 17,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 20,
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
    start_year: PropTypes.number.isRequired,
    end_month: PropTypes.string,
    end_year: PropTypes.number,
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
    contact_id: PropTypes.number,
    achievements: PropTypes.array,
  }).isRequired,
};

export default withStyles(styles)(AddOrEditExperienceForm);
