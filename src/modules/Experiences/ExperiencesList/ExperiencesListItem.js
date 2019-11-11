import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AchievementsList from 'modules/Achievements/AchievementsList';
import AddOrEditExperienceForm from 'modules/Experiences/AddOrEditExperienceForm';
import withStyles from '@material-ui/core/styles/withStyles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteExperience from './DeleteExperience';

import {formatMonthYearDate, getWorkLength, configureForm} from './helpers';

const ExperiencesListItem = ({
  experience,
  onUpdate,
  onDelete,
  onSelect,
  selectable,
  classes,
}) => {
  const initial = experience.host ? experience.host[0] : '';
  const title =
    experience.type === 'Education'
      ? `${experience.degree} in ${experience.title}`
      : `${experience.title}`;

  const config = configureForm(experience.type);

  const [editing, setEditing] = useState(false);
  const submitUpdate = async function(values) {
    await onUpdate(values);
    setEditing(false);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const startDate = formatMonthYearDate(
    experience.start_month,
    experience.start_year
  );

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
    <React.Fragment>
      <Grid container justify="center" className={classes.gridContainer}>
        {selectable ? (
          <Grid item>
            <Checkbox onChange={onSelect} />
          </Grid>
        ) : (
          !editing && (
            <Grid item className={classes.avatar}>
              <Avatar>{initial}</Avatar>
            </Grid>
          )
        )}

        <Grid item xs={8}>
          {!editing && (
            <React.Fragment>
              <Typography
                variant="h6"
                component="h2"
                style={{
                  fontWeight: '700',
                }}
              >
                {experience.host}

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
                {title}
              </Typography>
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
                    <AchievementsList achievements={experience.achievements} />
                  )
                : null}
            </React.Fragment>
          )}
        </Grid>
        {editing && (
          <Grid item xs={10}>
            <AddOrEditExperienceForm
              handleCancel={() => setEditing(false)}
              labels={{}}
              onSubmit={submitUpdate}
              experience={experience}
            />
          </Grid>
        )}

        {editing || selectable ? null : (
          <Grid item xs={2} className={classes.gridIcons}>
            <React.Fragment>
              <IconButton
                onClick={() => setEditing(true)}
                size="small"
                aria-label="edit experience"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => setOpenDeleteDialog(true)}
                size="small"
                aria-label="delete experience"
              >
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          </Grid>
        )}
      </Grid>
      {openDeleteDialog && (
        <DeleteExperience
          experience={experience}
          onDelete={() => onDelete(experience)}
          handleCancel={() => setOpenDeleteDialog(false)}
        />
      )}
    </React.Fragment>
  );
};

ExperiencesListItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectable: PropTypes.bool.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf([
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
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education'])
      .isRequired,
    contact_id: PropTypes.number.isRequired,
    achievements: PropTypes.array,
    description: PropTypes.string,
  }),
};

const styles = ({breakpoints, palette, spacing}) => ({
  gridContainer: {
    marginTop: '15px',
  },
  gridIcons: {
    flexBasis: '60px',
  },
  avatar: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
    marginRight: '20px',
  },
});

export default withStyles(styles)(ExperiencesListItem);
