import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';

const SkillCheckbox = ({selected, skill, onClick, onDelete}) => {
  if (selected) {
    return <Chip onDelete={() => onDelete(skill)} label={skill.name} />;
  } else {
    return (
      <Chip
        variant="outlined"
        icon={<AddIcon />}
        onClick={() => onClick(skill)}
        label={skill.name}
      />
    );
  }
};

const CapabilitySkills = ({
  classes,
  name,
  addSkill,
  deleteSkill,
  recommendedSkills,
  contactSkills,
}) => {
  let contactSkillMap = {};
  contactSkills.forEach(skill => {
    contactSkillMap[skill.name] = true;
  });

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" direction="column">
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" className={classes.header}>
            <span className={classes.capability}>{name}</span>
          </Typography>
        </Grid>
        {recommendedSkills.map(skill => (
          <Grid item key={skill.id} className={classes.skill}>
            <SkillCheckbox
              selected={contactSkillMap[skill.name] || false}
              skill={skill}
              onClick={addSkill}
              onDelete={deleteSkill}
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
  header: {
    //marginTop: spacing(1),
    marginBottom: spacing(1),
    fontSize: '14pt',
  },
  capability: {
    //border: 'solid 1px rgba(0,0,0,0.23)',
    //borderRadius: '5px',
    //padding: spacing(1),
  },
  skill: {
    margin: spacing(0.25, 0),
  },
});

CapabilitySkills.propTypes = {
  name: PropTypes.string.isRequired,
  capSkills: PropTypes.array.isRequired,
  contactSkills: PropTypes.array.isRequired,
  addSkill: PropTypes.func.isRequired,
  deleteSkill: PropTypes.func.isRequired,
};

export default withStyles(styles)(CapabilitySkills);
