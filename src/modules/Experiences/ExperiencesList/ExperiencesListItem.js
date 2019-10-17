import React, {useState} from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import AchievementsList from "modules/Achievements/AchievementsList";
import AddOrEditExperienceForm from "modules/Experiences/AddOrEditExperienceForm";
import withStyles from "@material-ui/core/styles/withStyles";

import {formatMonthYearDate, getWorkLength, configureForm} from "./helpers";

const ExperiencesListItem = ({experience, onUpdate, onDelete, classes}) => {
  const initial = experience.host ? experience.host[0] : "";
  const title =
    experience.type === "Education"
      ? `${experience.degree} in ${experience.title}`
      : `${experience.title}`;

  const config = configureForm(experience.type);

  const [editing, setEditing] = useState(false);
  const submitUpdate = async function(values) {
    await onUpdate(values);
    setEditing(false);
  };

  const startDate = formatMonthYearDate(
    experience.start_month,
    experience.start_year
  );

  let endDate = "";
  if (experience.end_month && experience.end_year) {
    endDate = formatMonthYearDate(experience.end_month, experience.end_year);
  } else {
    endDate = "Present";
  }

  let lengthWork = getWorkLength(
    experience.length_year,
    experience.length_month
  );

  const location = ` - ${
    experience.location_city ? experience.location_city + ", " : ""
  }
      ${experience.location_state}`;

  return (
    <React.Fragment>
      <Grid container justify="space-evenly" className={classes.gridContainer}>
        <Grid item className={classes.avatar}>
          <Avatar>{initial}</Avatar>
        </Grid>

        <Grid item xs={8} md={9}>
          <Typography
            variant="h6"
            component="h2"
            style={{
              fontWeight: "700",
            }}
          >
            {experience.host}

            {experience.location_state ? (
              <span
                style={{
                  color: "#7d7d7d",
                  fontSize: "15px",
                  fontStyle: "italic",
                  fontWeight: "normal",
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
              fontSize: "17px",
              color: "#3b3b3b",
              fontWeight: "bold",
              fontFamily: "Lato",
            }}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="p"
            style={{color: "#7d7d7d", fontSize: "15px"}}
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
        </Grid>

        <Grid item xs={2} className={classes.gridIcons}>
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
    degree: PropTypes.oneOf([
      "High School",
      "Associates",
      "Undergraduate",
      "Masters",
      "Doctoral",
    ]),
    start_month: PropTypes.string.isRequired,
    start_year: PropTypes.number.isRequired,
    end_month: PropTypes.string,
    end_year: PropTypes.number,
    type: PropTypes.oneOf(["Work", "Service", "Accomplishment", "Education"])
      .isRequired,
    contact_id: PropTypes.number.isRequired,
    achievements: PropTypes.array,
    description: PropTypes.string,
  }),
};

const styles = ({breakpoints, palette, spacing}) => ({
  gridContainer: {
    marginTop: "15px",
  },
  gridIcons: {
    flexBasis: "50px",
  },
  avatar: {
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

export default withStyles(styles)(ExperiencesListItem);
