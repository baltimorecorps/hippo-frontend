import React from 'react';
import ResumeContext from 'lib/context/ResumeContext';
import ProgressContext from 'lib/context/ProgressContext';
import Header from './Header';
import StepComponent from './StepComponent';
import ProgressBar from './ProgressBar';

const CreateResumePage = () => {
  return (
    <ResumeContext.StorageWrapper>
      <ProgressContext.StorageWrapper>
        <Header />
        <StepComponent />
        <ProgressBar />
      </ProgressContext.StorageWrapper>
    </ResumeContext.StorageWrapper>
  );
};

export default CreateResumePage;
