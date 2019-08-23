import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import AddOrEditExperienceForm from 'modules/Experiences/AddOrEditExperienceForm';
import ExperiencesListItem from './ExperiencesListItem';

//todo: check how to write if/else in render/function
//todo: check how to write clickable icon

const ExperiencesList = ({
  contactId,
  experienceType,
  experiences,
  addNewExperience,
  refreshExperiences,
  updateExperience,
  deleteExperience,
  classes,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    experiences.length === 0 && refreshExperiences();
  }, [experiences.length, refreshExperiences]);

  const blankExperience = {
    description: '',
    host: '',
    title: '',
    date_start: '',
    date_end: '',
    type: experienceType,
    contact_id: contactId,
    achievements: [],
  };

  const submitNewExperience = async function(experience) {
    await addNewExperience(experience);
    setShowForm(false);
  };

  const header = headers[experienceType.toLowerCase()];

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography gutterBottom variant="h3" component="h1">
                {header}
              </Typography>
            </Grid>
            <Grid item>
              <button
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => setShowForm(true)}
              >
                <Icon>
                  add
                </Icon>
              </button>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          {experiences.map(experience =>
            <ExperiencesListItem
              key={experience.id}
              onUpdate={updateExperience}
              onDelete={deleteExperience}
              experience={experience}
            />
          )}
        </Paper>
      </Grid>

      {showForm &&
        <AddOrEditExperienceForm
          experience={blankExperience}
          onSubmit={submitNewExperience}
          handleCancel={() => setShowForm(false)}
        />
      }
    </Grid>
  );
};

ExperiencesList.propTypes = {
  contactId: PropTypes.number.isRequired,
  experienceType: PropTypes.oneOf(['work', 'service', 'accomplishment', 'education']).isRequired,
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
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
    marginBottom: `${spacing.unit * 5}px`,
  },
  divider: {
    margin: `${spacing.unit * 1}px 0`,
  },
});

export default withStyles(styles)(ExperiencesList);
