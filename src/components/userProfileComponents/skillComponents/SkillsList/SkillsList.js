import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

const SkillsList = ({classes, skills}) => {
  return (
    <Grid className={classes.grid}>
      {skills.map(skill => (
        <Chip key={skill.name} label={skill.name} className={classes.skill} />
      ))}
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  grid: {},
  skill: {
    margin: '2px',
    backgroundColor: '#ffe9a1',
  },
});

export default withStyles(styles)(SkillsList);
