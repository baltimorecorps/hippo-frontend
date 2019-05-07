import React, {useContext} from 'react';
import ReactSelect from 'react-select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import ResumeContext from 'lib/context/ResumeContext';
import ProgressContext from 'lib/context/ProgressContext';

import experienceOptions from './experienceOptions';

const getOptionLabel = ({orgName, positionName}) => `${orgName} | ${positionName}`;
const isOptionSelected = ({id}, options) => !! options.find(o => o.id === id);

const ResumeBuilder = ({ achievements, contactInfo, experiences, skillGroups, classes }) => {
  const context = useContext(ResumeContext);
  const {experiences: selectedExperiences, skillGroups: selectedSkillGroups} = ResumeContext.useInfo();
  const type = ProgressContext.useStepType();
  const onChange = (experience, changeType) => {
    // changeType
    // 'clear' | 'create-option' | 'deselect-option' |
    // 'pop-value' | 'remove-value' | 'select-option' | 'set-value'
    ResumeContext.addExperience({type, experience, context});
  };

  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <ReactSelect
                placeholder={`Select ${type}...`}
                options={experienceOptions}
                getOptionLabel={getOptionLabel}
                isOptionSelected={isOptionSelected}
                onChange={onChange}
              />
            </Grid>
            <ul>
              {type !== 'skills' && selectedExperiences[type].map(({positionName, orgName}) =>
                <li key={`${positionName}.${orgName}`}>
                  {orgName} | {positionName}
                </li>
              )}
              {type === 'skills' && selectedSkillGroups.map(({name: groupName, skills}) =>
                <React.Fragment key={groupName}>
                  {skills.map(({name: skillName}) =>
                    <li key={`${groupName}.${skillName}`}>
                      {groupName} | {skillName}
                    </li>
                  )}
                </React.Fragment>
              )}
            </ul>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  paper: {
    marginTop: spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
  },
});

export default withStyles(styles)(ResumeBuilder);
