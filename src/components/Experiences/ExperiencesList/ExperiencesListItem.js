import React, {useState} from 'react';
import {createClickTracking} from 'lib/helperFunctions/helpers';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AchievementsList from 'components/Experiences/Achievements/AchievementsList';
import SkillsList from 'components/userProfileComponents/skillComponents/SkillsList';
import AddOrEditExperienceForm from 'components/Experiences/AddOrEditExperienceForm';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';

import {formatMonthYearDate, getWorkLength, configureForm} from './helpers';

export const DisplayExperience = ({
  experience,
  classes,
  hideSkills,
  onSelectAchievement,
  selectedAchievements,
}) => {
  let title = experience.title;
  if (experience.type === 'Education') {
    if (experience.degree === 'Other') {
      title = `${experience.degree_other} in ${experience.title}`;
    } else {
      title = `${experience.degree} in ${experience.title}`;
    }
  }

  const config = configureForm(experience.type);
  let startDate = '';
  if (experience.start_month && experience.start_year) {
    startDate = formatMonthYearDate(
      experience.start_month,
      experience.start_year
    );
  }

  let endDate = '';
  if (experience.end_month && experience.end_year) {
    endDate = formatMonthYearDate(experience.end_month, experience.end_year);
  } else {
    endDate = 'Present';
  }

  let lengthWork = getWorkLength(
    experience.length_year,
    experience.length_month
  );

  const location = ` - ${experience.location}`;

  return (
    <div>
      <Typography
        variant="h6"
        component="h2"
        style={{
          fontWeight: '700',
        }}
      >
        {experience.host || experience.title}

        {experience.location ? (
          <span
            style={{
              color: '#7d7d7d',
              fontSize: '15px',
              fontStyle: 'italic',
              fontWeight: 'normal',
            }}
          >
            {location}
          </span>
        ) : null}
      </Typography>

      <Typography
        variant="subtitle1"
        component="h3"
        style={{
          fontSize: '17px',
          color: '#3b3b3b',
          fontWeight: 'bold',
          fontFamily: 'Lato',
        }}
      >
        {experience.host && title}
      </Typography>
      {experience.link && (
        <Button
          target="_blank"
          component="button"
          href={experience.link}
          variant="text"
          className={classes.link}
        >
          {experience.link_name || experience.link}
        </Button>
      )}
      <Typography
        gutterBottom
        variant="subtitle1"
        component="p"
        style={{color: '#7d7d7d', fontSize: '15px'}}
      >
        {startDate}
        {config.showEndDate && (
          <React.Fragment> &ndash; {endDate}</React.Fragment>
        )}
        {config.showWorkLength && ` (${lengthWork})`}
      </Typography>

      {experience.description && (
        <Typography gutterBottom variant="body1" component="p">
          {experience.description}
        </Typography>
      )}

      {experience.achievements.length
        ? config.showAchievements && (
            <AchievementsList
              achievements={experience.achievements}
              onSelect={onSelectAchievement}
              selected={selectedAchievements}
            />
          )
        : null}

      {experience.skills.length
        ? !hideSkills &&
          config.showSkills && <SkillsList skills={experience.skills} />
        : null}
    </div>
  );
};

const ExperiencesListItem = ({
  experience,
  capabilities,
  onUpdate,
  onDelete,
  onSelect,
  onSkillsMore,
  updateEditScore,
  selectable,
  refreshDynamicInstructions,
  classes,
}) => {
  const initial = experience.host ? experience.host[0] : experience.title[0];

  const [editing, setEditing] = useState(false);
  const submitUpdate = async function(values) {
    await onUpdate(values);
    setEditing(false);
  };
  const editExperienceHandler = () => {
    createClickTracking(
      'Experience',
      `Edit ${experience.type}`,
      `Edit ${experience.type} Button`
    );
    setEditing(true);
  };

  return (
    <React.Fragment>
      <Grid container className={classes.gridContainer}>
        {selectable ? (
          <Grid item>
            <Checkbox onChange={onSelect} />
          </Grid>
        ) : (
          !editing && (
            <Grid item className={classes.avatar}>
              <Avatar className={classes.initial}>{initial}</Avatar>
            </Grid>
          )
        )}

        <Grid item xs={10} sm={7} md={8}>
          {!editing && (
            <DisplayExperience experience={experience} classes={classes} />
          )}
        </Grid>
        {editing && (
          <Grid item xs={12} md={10}>
            <AddOrEditExperienceForm
              handleCancel={() => setEditing(false)}
              labels={{}}
              capabilities={capabilities}
              onSubmit={submitUpdate}
              experience={experience}
              onDelete={onDelete}
              refreshDynamicInstructions={refreshDynamicInstructions}
              onSkillsMore={onSkillsMore}
              updateEditScore={updateEditScore}
            />
          </Grid>
        )}

        {editing || selectable ? null : (
          <Grid item sm={1}>
            <IconButton
              onClick={editExperienceHandler}
              size="small"
              aria-label="edit experience"
            >
              <EditIcon className={classes.editIcon} />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

ExperiencesListItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf([
      '',
      'Completes Classes',
      'Completed Training',
      'Certificate',
      'GED',
      'High School',
      'Associates',
      'Undergraduate',
      'Masters',
      'Doctoral',
      'Other',
    ]),
    start_month: PropTypes.string,
    start_year: PropTypes.number,
    end_month: PropTypes.string,
    end_year: PropTypes.number,
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education'])
      .isRequired,
    contact_id: PropTypes.number.isRequired,
    achievements: PropTypes.array,
    description: PropTypes.string,
  }),
};

const styles = ({breakpoints, palette, spacing}) => ({
  gridContainer: {
    justifyContent: 'center',
    marginBottom: '10px',
  },
  editIcon: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('xs')]: {
      display: 'none',
    },
    marginRight: '20px',
  },
  initial: {
    backgroundColor: palette.primary.darkerYellow,
  },
  link: {
    color: palette.primary.link,
    padding: '0 5px',
    fontSize: '15px',
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  wrapper: {},
});

export default withStyles(styles)(ExperiencesListItem);
