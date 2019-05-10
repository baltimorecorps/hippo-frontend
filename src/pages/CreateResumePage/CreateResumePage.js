import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ResumeContext from 'lib/context/ResumeContext';
import ProgressContext from 'lib/context/ProgressContext';
import Header from './Header';
import StepComponent from './StepComponent';
import ProgressBar from './ProgressBar';

const CreateResumePage = () => {
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <ResumeContext.StorageWrapper>
        <ProgressContext.StorageWrapper>
          <Header />
          <StepComponent />
          <ProgressBar />
        </ProgressContext.StorageWrapper>
      </ResumeContext.StorageWrapper>
    </DragDropContextProvider>
  );
};

export default CreateResumePage;
