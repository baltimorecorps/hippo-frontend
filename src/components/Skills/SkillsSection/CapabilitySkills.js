import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import SkillSelect from 'components/Skills/SkillSelect';

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    margin: spacing(1),
  },
  container: {
    padding: spacing(1, 3, 3),
  },
  highlight: {
    backgroundImage: 'linear-gradient(#8caeff,#cfdeff,#f2f6ff)',
  },
  headerDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(2),
    minHeight: '80px',
    borderBottom: 'solid 0.1px rgba(219, 219, 219,.03)',
  },
  header: {
    fontSize: '14pt',
    alignText: 'center',
  },
  capability: {},
  skill: {
    margin: spacing(0.25, 0),
  },
  chip: {
    backgroundColor: '#e0eaff',
  },
});

const BlankChip = withStyles({
  root: {
    backgroundColor: 'white',
  },
})(Chip);

const SkillCheckbox = withStyles(styles)(
  ({classes, selected, skill, onClick, onDelete}) => {
    if (selected) {
      return (
        <Chip
          className={classes.chip}
          onDelete={() => onDelete(skill)}
          label={skill.name}
        />
      );
    } else {
      return (
        <BlankChip
          variant="outlined"
          icon={<AddIcon />}
          onClick={() => onClick(skill)}
          label={skill.name}
        />
      );
    }
  }
);

const CapabilitySkills = ({
  classes,
  id,
  name,
  recommendedSkills,
  contactSkills,
  addSkill,
  deleteSkill,
  addSkillSuggestion,
}) => {
  let hasSkill = {};
  contactSkills.forEach(skill => {
    hasSkill[skill.id] = true;
  });

  let isRecommended = {};
  recommendedSkills.forEach(skill => {
    isRecommended[skill.id] = true;
  });

  let additionalSkills = contactSkills.filter(
    skill => !isRecommended[skill.id]
  );

  const updateSuggestedSkills = suggestedSkills => {
    suggestedSkills.forEach(skill => addSkillSuggestion(skill));
  };

  const highlightClass = contactSkills.length > 0 ? classes.highlight : null;

  return (
    <Paper className={classes.paper}>
      <div className={`${classes.headerDiv} ${highlightClass}`}>
        <Typography variant="h5" component="h2" className={classes.header}>
          <span className={classes.capability}>{name}</span>
        </Typography>
      </div>
      <div className={classes.container}>
        <Grid container justify="space-between" direction="column">
          {recommendedSkills.map(skill => (
            <Grid item key={skill.id} className={classes.skill}>
              <SkillCheckbox
                selected={hasSkill[skill.id] || false}
                skill={skill}
                onClick={addSkill}
                onDelete={deleteSkill}
              />
            </Grid>
          ))}
          {additionalSkills.map(skill => (
            <Grid item key={skill.id} className={classes.skill}>
              <SkillCheckbox
                selected={true}
                skill={skill}
                onClick={() => {}}
                onDelete={deleteSkill}
              />
            </Grid>
          ))}
          <SkillSelect id={id} value={[]} onChange={updateSuggestedSkills} />
        </Grid>
      </div>
    </Paper>
  );
};
CapabilitySkills.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  recommendedSkills: PropTypes.array.isRequired,
  contactSkills: PropTypes.array.isRequired,
  addSkill: PropTypes.func.isRequired,
  deleteSkill: PropTypes.func.isRequired,
  addSkillSuggestion: PropTypes.func.isRequired,
};

export default withStyles(styles)(CapabilitySkills);
