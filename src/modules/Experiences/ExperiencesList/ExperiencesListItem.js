import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import AchievementsList from 'modules/Achievements/AchievementsList';
import AddOrEditExperienceForm from 'modules/Experiences/AddOrEditExperienceForm';

const ExperiencesListItem = ({ experience, onUpdate, onDelete }) => {
  const initial = experience.host ? experience.host[0] : '';
  const title =
    `${experience.host}, ` +
    (experience.type === 'Education'
      ? `${experience.degree} in ${experience.title}`
      : `${experience.title}`);
  const showEndDate = experience.type !== 'Accomplishment';
  const showAchievements = experience.type !== 'Accomplishment';

  const [editing, setEditing] = useState(false);
  const submitUpdate = async function(values) {
    await onUpdate(values);
    setEditing(false);
  };

  const getMonthAndYear = (month, year) => {
    month = month.slice(0, 3);
    return `${month} ${year}`;
  };

  const startDate = getMonthAndYear(experience.start_month, experience.start_year);
  const endDate = getMonthAndYear(experience.end_month, experience.end_year);

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Avatar>{initial}</Avatar>
        </Grid>

        <Grid item xs={10}>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="p" style={{ color: '#7d7d7d' }}>
            {startDate}
            {showEndDate && <React.Fragment> &ndash; {endDate}</React.Fragment>}
          </Typography>

          {experience.description && (
            <Typography gutterBottom variant="body1" component="p">
              {experience.description}
            </Typography>
          )}

          {experience.achievements.length
            ? showAchievements && <AchievementsList achievements={experience.achievements} />
            : null}
        </Grid>

        <Grid item>
          <Icon onClick={() => setEditing(true)}>edit</Icon>
          <Icon onClick={() => onDelete(experience)}>delete</Icon>
        </Grid>
      </Grid>

      {editing && (
        <AddOrEditExperienceForm
          handleCancel={() => setEditing(false)}
          labels={{}}
          onSubmit={submitUpdate}
          experience={experience}
        />
      )}
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
    degree: PropTypes.oneOf(['High School', 'Associates', 'Undergraduate', 'Masters', 'Doctoral']),
    // date_start: PropTypes.instanceOf(Date).isRequired,
    // date_end: PropTypes.instanceOf(Date),
    start_month: PropTypes.string.isRequired,
    start_year: PropTypes.number.isRequired,
    end_month: PropTypes.string,
    end_year: PropTypes.number,
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
    contact_id: PropTypes.number.isRequired,
    achievements: PropTypes.array,
    description: PropTypes.string,
  }),
};

export default ExperiencesListItem;
