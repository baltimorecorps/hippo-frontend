import React, {useContext} from 'react';
import ReactSelect from 'react-select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import ResumeContext from 'lib/context/ResumeContext';

import experienceOptions from './experienceOptions';

const getOptionLabel = ({orgName, positionName}) => `${orgName} | ${positionName}`;
const isOptionSelected = ({id}, options) => !! options.find(o => o.id === id);

const ResumeBuilder = ({ achievements, contactInfo, experiences, skillGroups, classes }) => {
  const context = useContext(ResumeContext);
  const onChange = (experience, y) => {
    ResumeContext.addExperience({type: 'work', experience, context});
  };

  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <ReactSelect
                options={experienceOptions}
                getOptionLabel={getOptionLabel}
                isOptionSelected={isOptionSelected}
                onChange={onChange}
              />
            </Grid>
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
