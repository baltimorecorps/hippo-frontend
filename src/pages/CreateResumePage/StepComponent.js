import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import ProgressContext from 'lib/context/ProgressContext';
import ResumeContext from 'lib/context/ResumeContext';
import ResumePreview from './ResumePreview';
import ResumeBuilder from './ResumeBuilder';

const StepComponent = ({classes}) => {
  const stepType = ProgressContext.useStepType();
  const context = useContext(ResumeContext);
  const setName = event => {
    const input = event.target;
    const name = input.value;
    ResumeContext.setName({name, context});
  };

  if (stepType === 'name') {
    return (
      <Grid container justify="center">
        <Grid item xs={6}>
          <form>
            <TextField
              id="name"
              name="name"
              label="Name"
              required={true}
              fullWidth={true}
              autoFocus={true}
              autoComplete="false"
              onChange={setName}
            />
          </form>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justify="space-between">
      <Grid item xs={6} className={classes.preview}>
        <ResumePreview />
      </Grid>
      <Grid item xs={6}>
        <ResumeBuilder />
      </Grid>
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  preview: {
    transform: 'scale(0.7)',
    transformOrigin: 'top',
  },
});

export default withStyles(styles)(StepComponent);
