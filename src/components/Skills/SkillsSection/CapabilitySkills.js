import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import SkillSelect from 'components/Skills/SkillSelect';

const BlankChip = withStyles({
  root: {
    backgroundColor: 'white'
  },
})(Chip);

const SkillCheckbox = ( ({selected, skill, onClick, onDelete}) => {
    if (selected) {
      return <Chip onDelete={() => onDelete(skill)} label={skill.name} />;
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
    <Paper className={`${classes.paper} ${highlightClass}`}>
      <Grid container justify="space-between" direction="column">
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" className={classes.header}>
            <span className={classes.capability}>{name}</span>
          </Typography>
        </Grid>
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
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    margin: spacing(1),
    padding: spacing(2, 3, 3),
  },
  highlight: {
    backgroundColor: 'aliceblue',
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  recommendedSkills: PropTypes.array.isRequired,
  contactSkills: PropTypes.array.isRequired,
  addSkill: PropTypes.func.isRequired,
  deleteSkill: PropTypes.func.isRequired,
  addSkillSuggestion: PropTypes.func.isRequired,
};

export default withStyles(styles)(CapabilitySkills);