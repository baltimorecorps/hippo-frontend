import React, {useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import ProgressContext from 'lib/context/ProgressContext';

const ProgressBar = ({classes}) => {
  const {progress: activeStep, setProgress} = useContext(ProgressContext);

  return (
    <Stepper alternativeLabel nonLinear activeStep={activeStep} className={classes.root}>
      {ProgressContext.steps.map(({name}, index) =>
        <Step key={name}>
          <StepButton onClick={() => setProgress({progress: index})} className={classes.stepButton}>
            {name}
          </StepButton>
        </Step>
      )}
    </Stepper>
  );
};

const styles = ({spacing}) => ({
  root: {
    width: '100%',
  },
  stepButton: {
    outline: 0,
  },
});

export default withStyles(styles)(ProgressBar);
