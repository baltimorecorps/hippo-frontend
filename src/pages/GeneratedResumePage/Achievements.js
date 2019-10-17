import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Achievement from "./Achievement";

const Achievements = ({achievements, classes}) => {
  return (
    <section className={classes.section}>
      <Typography component="h3" variant="h5">
        Accomplishments
      </Typography>
      <hr />
      {achievements.map((achievement, index) => (
        <Achievement key={`${achievement.name}.${index}`} {...achievement} />
      ))}
    </section>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  section: {
    marginBottom: spacing(2),
  },
});

export default withStyles(styles)(Achievements);
