import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';

const CapabilitySkills = ({classes, name, skills}) => {
  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" direction="column">
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" className={classes.name}>
            {name}
          </Typography>
        </Grid>
        {skills.map(skill => (
          <Grid item key={skill} className={classes.skill}>
            <Chip
              variant="outlined"
              icon={<AddIcon />}
              clickable
              label={skill}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    margin: spacing(1),
    padding: spacing(2, 3, 3),
  },
  name: {
    marginBottom: spacing(1),
  },
  skill: {
    margin: spacing(0.25, 0),
  }
});

CapabilitySkills.propTypes = {
  name: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
};

export default withStyles(styles)(CapabilitySkills);
