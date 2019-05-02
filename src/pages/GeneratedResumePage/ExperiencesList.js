import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Experience from './Experience';

const ExperiencesList = ({ name, experiences, classes }) => {
  return (
    <section className={classes.section}>
      <Typography component="h3" variant="h5">
        {name}
      </Typography>
      <hr />
      {experiences.map((experience) => (
        <Experience {...experience} />
      ))}
    </section>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  section: {
    marginBottom: spacing.unit * 2,
  },
});

export default withStyles(styles)(ExperiencesList);
