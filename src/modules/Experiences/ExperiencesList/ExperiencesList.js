import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from '@material-ui/icons/Add'

import AddOrEditExperienceForm from 'modules/Experiences/AddOrEditExperienceForm';
import ExperiencesListItem from './ExperiencesListItem';

const ExperiencesList = ({
  contactId,
  experienceType,
  experiences,
  addNewExperience,
  refreshExperiences,
  updateExperience,
  deleteExperience,
  selectExperience,
  deselectExperience,
  inSelectMode,
  classes,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    experiences.length === 0 && refreshExperiences();
  }, [experiences.length, refreshExperiences]);

  let blankExperience = {
    description: '',
    host: '',
    title: '',
    location_city: '',
    location_state: '',
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
    is_current: false,
    type: experienceType,
    contact_id: contactId,
    achievements: [],
  };

  if (experienceType === 'Education') {
    blankExperience.degree = '';
  }

  const submitNewExperience = async function(experience) {
    await addNewExperience(experience);
    setShowForm(false);
  };

  const header = headers[experienceType.toLowerCase()];

  const makeSelectExperience = (experience) => (event) => {
    if (event.target.checked) {
      selectExperience(experience)
    } else {
      deselectExperience(experience)
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                variant="h5"
                component="h1"
                style={{
                  fontWeight: '700',
                }}
              >
                {header}
              </Typography>
            </Grid>
            <Grid item>
                {inSelectMode ? null :
                    <IconButton 
                      className={classes.addButton}
                      aria-label="add new experience"
                      onClick={() => setShowForm(true)}>
                    <AddIcon />
                    </IconButton>}
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          {experiences.map((experience) => (
            <ExperiencesListItem
              key={experience.id}
              onUpdate={updateExperience}
              onDelete={deleteExperience}
              onSelect={makeSelectExperience(experience)}
              experience={experience}
              selectable={inSelectMode}
            />
          ))}
        </Paper>
      </Grid>

      {showForm && (
        <AddOrEditExperienceForm
          experience={blankExperience}
          onSubmit={submitNewExperience}
          handleCancel={() => setShowForm(false)}
        />
      )}
    </Grid>
  );
};

ExperiencesList.propTypes = {
  contactId: PropTypes.number.isRequired,
  experienceType: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
  experiences: PropTypes.array.isRequired,
  addNewExperience: PropTypes.func.isRequired,
  updateExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  refreshExperiences: PropTypes.func.isRequired,
};

const headers = {
  work: 'Work Experience',
  education: 'Education',
  service: 'Service and Leadership',
  accomplishment: 'Accomplishments',
};

const styles = ({ breakpoints, palette, spacing }) => ({
  paper: {
    padding: spacing(2, 3, 3),
    marginBottom: spacing(5),
  },
  divider: {
    margin: spacing(1, 0),
  },
  addButton: {
    padding: spacing(0.5),
  }
});

export default withStyles(styles)(ExperiencesList);
