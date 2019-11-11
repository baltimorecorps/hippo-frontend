import React, {useContext, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import ProgressContext from 'lib/context/ProgressContext';

const ProgressBar = ({classes}) => {
  const {progress: activeStep, setProgress} = useContext(ProgressContext);
  const [completedSteps, setCompleted] = useState(
    ProgressContext.steps.map(step => false)
  );
  const handleCompleted = () => {
    setCompleted([
      ...completedSteps.slice(0, activeStep),
      true,
      ...completedSteps.slice(activeStep + 1),
    ]);
    if (activeStep < ProgressContext.steps.length - 1) {
      setProgress({progress: activeStep + 1});
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="stretch"
      className={classes.container}
    >
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>
          <Grid item>
            <Button
              disabled={activeStep === 0}
              onClick={() => setProgress({progress: activeStep - 1})}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={activeStep >= ProgressContext.steps.length - 1}
              onClick={() => setProgress({progress: activeStep + 1})}
            >
              Next
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleted}
            >
              Complete Step
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          className={classes.root}
        >
          {ProgressContext.steps.map(({name}, index) => (
            <Step key={name} completed={completedSteps[index]}>
              <StepButton
                onClick={() => setProgress({progress: index})}
                className={classes.stepButton}
              >
                {name}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
};

const styles = ({spacing}) => ({
  container: {
    position: 'absolute',
    bottom: 0,
  },
  root: {
    width: '100%',
  },
  stepButton: {
    outline: 0,
  },
});

export default withStyles(styles)(ProgressBar);
