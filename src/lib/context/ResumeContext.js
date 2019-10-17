import React, {useContext} from "react";
import StorageContext from "./StorageContext";

const ResumeContext = React.createContext();

ResumeContext.StorageWrapper = ({children}) => (
  <StorageContext
    context={ResumeContext}
    storageKey="resume"
    value={ResumeContext.defaultValues}
    setterName="setResumeInfo"
  >
    {children}
  </StorageContext>
);

const useInfo = () => {
  const resumeInfo = useContext(ResumeContext);
  return resumeInfo;
};

ResumeContext.useInfo = useInfo;

ResumeContext.addExperience = ({type, experience, context}) => {
  const {setResumeInfo, experiences, ...info} = context;

  setResumeInfo({
    ...info,
    experiences: {
      ...experiences,
      [type]: experiences[type].concat(experience),
    },
  });
};

ResumeContext.setName = ({name, context}) => {
  const {setResumeInfo, ...info} = context;

  setResumeInfo({
    ...info,
    name,
  });
};

ResumeContext.defaultValues = {
  name: "",
  achievements: [],
  contactInfo: {
    name: "",
    roles: [],
    title: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
  },
  experiences: {
    work: [],
    service: [],
    education: [],
  },
  skillGroups: [],
};

export default ResumeContext;
