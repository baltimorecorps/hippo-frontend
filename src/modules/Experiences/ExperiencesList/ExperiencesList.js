import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from '@material-ui/icons/Add';

import AddOrEditExperienceForm from 'modules/Experiences/AddOrEditExperienceForm';
import ExperiencesListItem from './ExperiencesListItem';

import Link from '@material-ui/core/Link';

import {sortExperiences} from './helpers';

const ExperiencesList = ({
  onClickMore,
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && experiences.length === 0) {
      refreshExperiences();
      setLoaded(true);
    }
  }, [experiences, refreshExperiences, loaded, setLoaded]);

  let blankExperience = {
    description: '',
    host: '',
    title: '',
    location: '',
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
    is_current: false,
    type: experienceType,
    contact_id: contactId,
    achievements: [],
    skills: [],
  };

  if (experienceType === 'Education') {
    blankExperience.degree = '';
  }

  const submitNewExperience = async function(experience) {
    await addNewExperience(experience);
    setShowForm(false);
  };

  const header = headers[experienceType.toLowerCase()];
  const helpText = helpTexts[experienceType.toLowerCase()];

  const makeSelectExperience = experience => event => {
    if (event.target.checked) {
      selectExperience(experience);
    } else {
      deselectExperience(experience);
    }
  };
  let sortedExperiences = [];
  if (experiences.length > 0) {
    sortedExperiences = sortExperiences(experiences);
  }

  const handleOnClickMore = () => {
    onClickMore(experienceType.toLowerCase());
  };

  const handleOnSkillsMore = () => {
    onClickMore('skills');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container className={classes.container}>
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
                {inSelectMode ? null : (
                  <IconButton
                    className={classes.addButton}
                    size="small"
                    aria-label="add new experience"
                    onClick={() => setShowForm(true)}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Typography
                variant="subtitle1"
                component="p"
                className={classes.helpText}
              >
                {helpText}
              </Typography>
              <Link
                component="button"
                variant="body2"
                onClick={handleOnClickMore}
                className={classes.moreDetails}
              >
                More...
              </Link>
            </Grid>
          </Grid>

          {showForm && (
            <Grid item xs={12} md={10}>
              <AddOrEditExperienceForm
                experience={blankExperience}
                onSubmit={submitNewExperience}
                handleCancel={() => setShowForm(false)}
                onDelete={null}
                onSkillsMore={handleOnSkillsMore}
              />
            </Grid>
          )}

          {sortedExperiences.map(experience => (
            <ExperiencesListItem
              key={experience.id}
              onUpdate={updateExperience}
              onDelete={deleteExperience}
              onSelect={makeSelectExperience(experience)}
              onSkillsMore={handleOnSkillsMore}
              experience={experience}
              selectable={inSelectMode}
            />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

ExperiencesList.propTypes = {
  contactId: PropTypes.number.isRequired,
  experienceType: PropTypes.oneOf([
    'Work',
    'Service',
    'Accomplishment',
    'Education',
  ]).isRequired,
  experiences: PropTypes.array.isRequired,
  addNewExperience: PropTypes.func.isRequired,
  updateExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  refreshExperiences: PropTypes.func.isRequired,
};

const headers = {
  work: 'Experience',
  education: 'Education',
  service: 'Service and Leadership',
  accomplishment: 'Portfolio and Work Products',
};

const helpTexts = {
  work:
    'Include your professional and community service, and leadership experiences',
  education: 'For example: diplomas, training courses, degrees, certificates',
  accomplishment: 'Add any awards, presentations, projects, and publications',
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: spacing(2, 3, 3),

    marginBottom: spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
  helpIcon: {
    color: '#5e5e5e',
  },
  helpText: {
    marginLeft: '3px',
    color: '#5e5e5e',
    fontSize: '15px',
    fontWeight: 'normal',
  },
  moreDetails: {
    marginLeft: '5px',
    color: palette.primary.link,
    fontSize: '15px',
    alignSelf: 'center',
    '&:hover': {
      fontWeight: 'bold',
      textDecoration: 'none',
      fontSize: '15px',
    },
  },
  addButton: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
});

export default withStyles(styles)(ExperiencesList);
