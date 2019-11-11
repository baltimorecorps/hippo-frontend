import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const DeleteExperience = ({experience, onDelete, classes, handleCancel}) => {
  let experienceName = "this item";

  if (experience.host && experience.title) {
    experienceName = (
      <React.Fragment>
        <br />
        <span className={classes.experienceName}>
          {experience.host} &mdash; {experience.title}
        </span>
      </React.Fragment>
    );
  }

  return (
    <Dialog open={true}>
      <DialogContent className={classes.dialogContent}>
        <Typography align="center">
          Are you sure you want to delete {experienceName}?
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction} align="between">
        <Button
          className={classes.delete}
          variant="outlined"
          onClick={() => onDelete(experience)}
        >
          Delete
        </Button>

        <Button variant="contained" color="secondary" onClick={handleCancel}>
          No, Go Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  dialogContent: {
    width: "350px",
  },
  dialogAction: {
    width: "350px",
    paddingBottom: "20px",
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  delete: {
    "&:hover": {
      backgroundColor: palette.error.main,
      color: "#ffffff",
      borderColor: palette.error.dark,
    },
  },
  experienceName: {
    fontWeight: "700",
  },
});

DeleteExperience.propTypes = {
  handleCancel: PropTypes.func.isRequired,
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

export default withStyles(styles)(DeleteExperience);
