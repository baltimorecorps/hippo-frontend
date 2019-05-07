import React from 'react';
import GeneratedResumePage from './GeneratedResumePage';
import resumeInfo from './resumeInfo';

const Container = () => {
  return (
    <GeneratedResumePage
      achievements={resumeInfo.achievements}
      contactInfo={resumeInfo.contactInfo}
      experiences={resumeInfo.experiences}
      skillGroups={resumeInfo.skillGroups}
    />
  );
};

export default Container;
