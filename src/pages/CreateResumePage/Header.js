import React from 'react';
import Typography from '@material-ui/core/Typography';
import ProgressContext from 'lib/context/ProgressContext';
import ResumeContext from 'lib/context/ResumeContext';

const Header = () => {
  const stepName = ProgressContext.useStepName();
  const {name: resumeName} = ResumeContext.useInfo();
  return (
    <React.Fragment>
      <Typography align="center" component="h1" variant="h4">
        Name: "{resumeName}"
      </Typography>
      <Typography align="center" component="h2" variant="h5">
        Step: {stepName}
      </Typography>
    </React.Fragment>
  );
};

export default Header;
