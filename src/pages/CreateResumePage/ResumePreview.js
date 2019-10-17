import React from "react";
import GeneratedResumePage from "pages/GeneratedResumePage/GeneratedResumePage.container";
import ResumeContext from "lib/context/ResumeContext";

const ResumePreview = () => {
  const resumeInfo = ResumeContext.useInfo();

  return (
    <GeneratedResumePage
      achievements={resumeInfo.achievements}
      contactInfo={resumeInfo.contactInfo}
      experiences={resumeInfo.experiences}
      skillGroups={resumeInfo.skillGroups}
    />
  );
};

export default ResumePreview;
