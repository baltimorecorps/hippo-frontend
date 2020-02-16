import React, {useEffect} from 'react';
import {createClickTracking} from 'lib/helperFunctions/helpers';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CapabilitySkills from './CapabilitySkills';
import SkillSelect from 'components/Skills/SkillSelect';

import Link from '@material-ui/core/Link';

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
  contactId,
  capabilities,
  contactCapabilities,
  allSkills,
  otherSkills,
  getCapabilities,
  getContactCapabilities,
  addContactSkill,
  addSkillSuggestion,
  deleteSkillSuggestion,
  deleteContactSkill,
  updateContactSkills,
  contactSkills,
  addSkill,
  deleteSkill,
  onChange,
  onClickMore,
}) => {
  useEffect(() => {
    if (!capabilities) {
      getCapabilities();
    }
  }, [capabilities, getCapabilities]);

  useEffect(() => {
    if (contactId && !contactCapabilities) {
      getContactCapabilities(contactId);
    }
  }, [contactId, contactCapabilities, getContactCapabilities]);

  let isOtherSkill = {};
  if (otherSkills) {
    otherSkills.forEach(skill => {
      isOtherSkill[skill.id] = true;
    });
  }

  let capabilitySkills = [];
  if (allSkills) {
    capabilitySkills = allSkills.filter(skill => !isOtherSkill[skill.id]);
  }

  const updateOtherSkills = newOtherSkills =>
    updateContactSkills(
      contactId,
      capabilitySkills.concat(newOtherSkills || [])
    );

  const onClickMoreHandler = () => {
    createClickTracking(
      'Sidebar Drawer',
      `Open Drawer (Skills)`,
      `Click more... under skill section`
    );
    onClickMore('skills');
  };

  return (
    <Grid container>
      <Grid item>
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
                Tell us more to help your resume stand out
              </Typography>
            </Grid>
            <Grid container alignItems="center">
              <Typography
                variant="subtitle1"
                component="p"
                className={classes.helpText}
              >
                Do you have any of these
              </Typography>
              <Link
                component="button"
                variant="body2"
                onClick={onClickMoreHandler}
                className={classes.moreDetails}
              >
                top skills employers are looking for?
              </Link>
            </Grid>
          </Grid>

          <Grid container>
            {capabilities &&
              capabilities.map(({id, name, recommended_skills}) => {
                let contactSkills = [];
                if (contactCapabilities && contactCapabilities[id]) {
                  contactSkills = contactCapabilities[id].skills.concat(
                    contactCapabilities[id].suggested_skills || []
                  );
                }
                return (
                  <Grid item xs={12} md={4} key={name}>
                    <CapabilitySkills
                      id={id}
                      name={name}
                      recommendedSkills={recommended_skills.map(
                        obj => obj.skill
                      )}
                      contactSkills={contactSkills}
                      addSkill={skill => addContactSkill(contactId, skill)}
                      deleteSkill={skill =>
                        deleteSkillSuggestion(contactId, id, skill)
                      }
                      addSkillSuggestion={skill =>
                        addSkillSuggestion(contactId, id, skill)
                      }
                    />
                  </Grid>
                );
              })}
            <Grid item xs={12}>
              <Paper className={classes.element}>
                <Typography variant="h5" component="h2">
                  Additional Skills
                </Typography>
                <SkillSelect
                  id='other'
                  value={otherSkills || []}
                  onChange={updateOtherSkills}
                />
              </Paper>
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
    [breakpoints.down('xs')]: {
      margin: spacing(0.2),
    },
  },
  element: {
    padding: spacing(2, 3, 3),
    margin: spacing(1),
  },
  container: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },

  moreDetails: {
    marginLeft: '5px',
    color: palette.primary.link,
    fontSize: '15px',
    alignSelf: 'center',
    '&:hover': {
      fontWeight: 'bold',
      textDecoration: 'none',
      fontSize: '15px',
    },
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
