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

  const monthNames = [
    'Month',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const endYear = experience.date_end.slice(0, 4);
  const endMonth = monthNames[parseInt(experience.date_end.slice(6, 7))];
  const startYear = experience.date_start.slice(0, 4);
  const startMonth = monthNames[parseInt(experience.date_start.slice(6, 7))];

  const startDate = `${startMonth} ${startYear}`;
  const endDate = `${endMonth} ${endYear}`;

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Avatar>{initial}</Avatar>
        </Grid>

        <Grid item xs={10}>
          <Typography gutterBottom variant="h4" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            {startDate}
            {showEndDate && <React.Fragment> &ndash; {endDate}</React.Fragment>}
          </Typography>

          {experience.description && (
            <Typography gutterBottom variant="body1" component="p">
              {experience.description}
            </Typography>
          )}

          {showAchievements && <AchievementsList achievements={experience.achievements} />}
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
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
    contact_id: PropTypes.number.isRequired,
    achievements: PropTypes.array,
    description: PropTypes.string,
  }),
};

export default ExperiencesListItem;
