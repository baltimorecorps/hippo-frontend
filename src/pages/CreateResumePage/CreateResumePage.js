import React from 'react';
import Grid from '@material-ui/core/Grid';
import ResumeContext from 'lib/context/ResumeContext';
import ResumePreview from './ResumePreview';
import ResumeBuilder from './ResumeBuilder';

const CreateResumePage = () => {
  return (
    <ResumeContext.StorageWrapper>
      <Grid container justify="space-between">
        <Grid item xs={6}>
          <ResumePreview />
        </Grid>
        <Grid item xs={6}>
          <ResumeBuilder />
        </Grid>
      </Grid>
    </ResumeContext.StorageWrapper>
  );
};

export default CreateResumePage;
