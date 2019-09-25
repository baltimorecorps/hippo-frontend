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

  let blankExperience = {
    description: '',
    host: '',
    title: '',
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
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

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h5" component="h1">
                {header}
              </Typography>
            </Grid>
            <Grid item>
              <Icon onClick={() => setShowForm(true)}>add</Icon>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          {experiences.map((experience) => (
            <ExperiencesListItem
              key={experience.id}
              onUpdate={updateExperience}
              onDelete={deleteExperience}
              experience={experience}
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
});

export default withStyles(styles)(ExperiencesList);
