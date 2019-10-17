import React, {useContext} from "react";
import StorageContext from "./StorageContext";

const ProgressContext = React.createContext();

ProgressContext.StorageWrapper = ({children}) => (
  <StorageContext
    context={ProgressContext}
    storageKey="resumeProgress"
    value={{progress: 0}}
    setterName="setProgress"
  >
    {children}
  </StorageContext>
);

const useProgress = () => {
  const {progress} = useContext(ProgressContext);
  return progress;
};

const useStepType = () => {
  const progress = useProgress();
  return ProgressContext.steps[progress].type;
};

const useStepName = () => {
  const progress = useProgress();
  return ProgressContext.steps[progress].name;
};

ProgressContext.useProgress = useProgress;
ProgressContext.useStepType = useStepType;
ProgressContext.useStepName = useStepName;

ProgressContext.steps = [
  {
    name: "Name Your Resume",
    type: "name",
  },
  {
    name: "Select Work",
    type: "work",
  },
  {
    name: "Select Education",
    type: "education",
  },
  {
    name: "Select Service",
    type: "service",
  },
  {
    name: "Select Skills",
    type: "skills",
  },
];

export default ProgressContext;
