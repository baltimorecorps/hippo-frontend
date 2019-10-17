import React from "react";
import AchievementsListItem from "./AchievementsListItem";

const AchievementsList = ({achievements}) => {
  return (
    <React.Fragment>
      {achievements
        .filter(item => item.description)
        .map(item => (
          <AchievementsListItem key={item.id} text={item.description} />
        ))}
    </React.Fragment>
  );
};

export default AchievementsList;
