import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';

import useFormUpdate from 'lib/useFormUpdate';

import AchievementInputsList from './AchievementInputsList';
import DatePicker from './DatePicker';
import DegreeDropdown from './DegreeDropdown';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: (event) => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleChangeDateStart: (date) => {
      if (date > values.date_end) {
        update('date_end')(date);
      }
      update('date_start')(date);
    },

    handleChangeDateEnd: (date) => {
      if (date < values.date_start) {
        update('date_start')(date);
      }
      update('date_end')(date);
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
  }
  else if (expType === 'Service') {
    return {
      labels: {
        host: 'Organization',
        title: 'Role',
      },
      showEndDate: true,
      showAchievements: true,
    };
  }
  else if (expType === 'Accomplishment') {
    return {
      labels: {
        host: 'Institution / Publisher',
        title: 'Title',
        startDate: 'Date Issued',
      },
      showDescription: true,
    };
  }
  else if (expType === 'Education') {
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
  const [
    values,
    {
      handleChange,
      handleChangeDateStart,
      handleChangeDateEnd,
      handleSubmit,
      handleDegree,
      handleAchievements,
    },
  ] = useForm(experience, onSubmit);

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

  return (
    <Dialog className={classes.modal} open={true}>
      <Card>
        <form autoComplete="off">
          <CardContent>
            <TextField
              className={classes.formControl}
              label={config.labels.host || 'Organization'}
              value={values.host}
              name="host"
              onChange={handleChange}
            />

            {config.showDegree &&
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="degree">
                  Degree
                </InputLabel>
                <DegreeDropdown value={values.degree} onChange={handleDegree} />
              </FormControl>
            }

            <TextField
              className={classes.formControl}
              label={config.labels.title || 'Title'}
              value={values.title}
              name="title"
              onChange={handleChange}
            />

            <DatePicker
              start={true}
              label={config.labels.startDate}
              value={values.date_start}
              onChange={handleChangeDateStart}
            />

            {config.showEndDate &&
              <DatePicker
                start={false}
                label={config.labels.endDate}
                value={values.date_end}
                onChange={handleChangeDateEnd}
              />
            }

            {config.showDescription &&
              <TextField
                className={classes.formControl}
                label={config.labels.description || 'Description'}
                value={values.description}
                name="description"
                multiline
                onChange={handleChange}
              />
            }

            <Divider />
            {config.showAchievements &&
              <AchievementInputsList
                contactId={experience.contact_id}
                achievements={values.achievements}
                onChange={handleAchievements}
              />
            }
          </CardContent>

          <Divider />

          <CardActions>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </CardActions>
        </form>
      </Card>
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
});


AddOrEditExperienceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf(['', 'High School', 'Associates', 'Undergraduate', 'Masters', 'Doctoral']),
    date_start: PropTypes.string.isRequired,
    date_end: PropTypes.string,
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
    contact_id: PropTypes.number,
    achievements: PropTypes.array,
  }).isRequired,
};

export default withStyles(styles)(AddOrEditExperienceForm);
