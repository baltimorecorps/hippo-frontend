import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-awesome-modal';
import { Button, Divider, Dropdown } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import Achievements from './Achievements';

const DEGREE_OPTIONS = [
  { key: 'high_school', text: 'High School', value: 'High School' },
  { key: 'associates', text: 'Associates', value: 'Associates' },
  { key: 'undergraduate', text: 'Undergraduate', value: 'Undergraduate' },
  { key: 'masters', text: 'Masters', value: 'Masters' },
  { key: 'doctoral', text: 'Doctoral', value: 'Doctoral' },
];

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues || {});

  const update = (name) => (value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

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
    handleDegree: (event, { value }) => {
      update('degree')(value);
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
      showAchievements: true,
    };
  }
};

const ExperienceForm = ({ experience, onSubmit, handleCancel, classes }) => {
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

  const handleChangeDescription = (idx) => (evt) => {
    const newAchievements = this.state.achievements.map((achievement, sidx) => {
      if (idx !== sidx) return achievement;
      return { ...achievement, description: evt.target.value };
    });
    this.setState({ achievements: newAchievements });
  };

  return (
    <div>
      <Modal visible="true" width="400" minHeight="750" effect="fadeInUp">
        <div style={{ margin: '20px' }}>
          <Form>
            <Form.Field>
              <label>
                {' '}
                <h3>{config.labels.host || 'Organization'}:</h3>{' '}
              </label>
              <input
                placeholder="Organization Name"
                value={values.host}
                name="host"
                onChange={handleChange}
              />
            </Form.Field>
            {config.showDegree ? (
              <Form.Field>
                <label>
                  <h3>{config.labels.degree || 'Degree'}: </h3>
                  <Dropdown
                    placeholder="Select Degree"
                    fluid
                    selection
                    options={DEGREE_OPTIONS}
                    name="degree"
                    value={values.degree}
                    onChange={handleDegree}
                  />
                </label>
              </Form.Field>
            ) : null}

            <Form.Field>
              <label>
                <h3>{config.labels.title || 'Title'}: </h3>
                <input
                  placeholder="Title Name"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                />
              </label>
            </Form.Field>

            <div className="comp_ezw">
              <h3>{config.labels.startDate || 'Start Date'} </h3>
              <DatePicker
                selected={values.date_start}
                selectsStart
                date_start={values.date_start}
                date_end={values.date_end}
                onChange={handleChangeDateStart}
                dateFormat="dd-MM-YYYY"
                className="ezw_datepicker"
              />

              {config.showEndDate ? (
                <React.Fragment>
                  <h3>{config.labels.endDate || 'End Date'} </h3>
                  <DatePicker
                    selected={values.date_end}
                    selectsEnd
                    date_start={values.date_start}
                    date_end={values.date_end}
                    onChange={handleChangeDateEnd}
                    dateFormat="dd-MM-YYYY"
                    className="ezw_datepicker"
                  />
                </React.Fragment>
              ) : null}
            </div>
            {config.showDescription ? (
              <TextField
                id="description"
                name="description"
                value={values.description}
                label={config.labels.description || 'Description'}
                multiline
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            ) : null}
            <br />
            {config.showAchievements ? (
              <Achievements
                contactId={experience.contact_id}
                achievements={values.achievements}
                onChange={handleAchievements}
              />
            ) : null}
            <Divider />

            <p>
              {' '}
              <Button size="large" type="submit" value="Save" onClick={handleSubmit}>
                {' '}
                Save
              </Button>{' '}
              <Button type="button" onClick={handleCancel} value="Cancel">
                Cancel
              </Button>{' '}
            </p>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
});


ExperienceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    organization: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf(['High School', 'Associates', 'Undergraduate', 'Masters', 'Doctoral']),
    date_start: PropTypes.string.isRequired,
    date_end: PropTypes.string,
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
    contact_id: PropTypes.number,
    achievements: PropTypes.array,
  }).isRequired,
};
export default withStyles(styles)(ExperienceForm);
