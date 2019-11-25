import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CapabilitySkills from './CapabilitySkills';
import SkillSelect from 'components/SkillSelect';

// TODO: Eventually this info will need to find a home on the backend
const CAPABILITIES = [
  {
    name: 'Project Management',
    skills: ['Budgeting', 'Scheduling', 'Project Planning', 'Leadership'],
  },
  {
    name: 'Communication',
    skills: [
      'Report Writing',
      'Presenting',
      'Documentation',
      'Technical Requirements',
    ],
  },
  {
    name: 'Data Analysis',
    skills: ['Metrics', 'Statistics', 'Microsoft Excel', 'SQL', 'R'],
  },
  {
    name: 'Software Development',
    skills: [
      'Scripting',
      'Web Development',
      'Python',
      'Database Administration',
    ],
  },
];

const SkillsSection = ({
  classes,
  header,
  contactSkills,
  addSkill,
  deleteSkill,
  onChange,
}) => {
  let capSkillMap = {};
  CAPABILITIES.forEach((cap) => {
    cap.skills.forEach((skill) => {
      capSkillMap[skill] = true;
    });
  });

  const capSkills = contactSkills.filter(
    (skill) => capSkillMap[skill.name])

  const additionalSkills = contactSkills.filter(
    (skill) => !capSkillMap[skill.name])

  const deleteSkillShim = (skill) => {
    const skills = contactSkills.filter(
      contactSkill => contactSkill.name !== skill
    )
    console.log(skill, skills, contactSkills)
    onChange(skills)
  }

  const addSkillShim = (skill) => onChange(contactSkills.concat([{name: skill}]))
  

  const updateAdditionalSkills = (newAdditionalSkills) => onChange(capSkills.concat(newAdditionalSkills || []))
  

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify="space-between" className={classes.container}>
            <Grid item>
              <Typography
                variant="h5"
                component="h1"
                style={{
                  fontWeight: '700',
                }}
              >
                {header}
              </Typography>
            </Grid>
            <Grid container>
              {CAPABILITIES.map(({name, skills}) => (
                <Grid item xs={12} md={6} key={name}>
                  <CapabilitySkills
                    name={name}
                    capSkills={skills}
                    contactSkills={contactSkills}
                    addSkill={addSkillShim}
                    deleteSkill={deleteSkillShim}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Paper className={[classes.paper, classes.element]}>
                  <Typography variant="h5" component="h2">
                    Additional Skills
                  </Typography>
                    <SkillSelect 
                      value={additionalSkills} 
                      onChange={updateAdditionalSkills} 
                    />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: spacing(2, 3, 3),
  },
  element: {
    margin: spacing(1),
  },
});

SkillsSection.propTypes = {
  header: PropTypes.string.isRequired,
  contactSkills: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  deleteSkill: PropTypes.func.isRequired,
};

export default withStyles(styles)(SkillsSection);
