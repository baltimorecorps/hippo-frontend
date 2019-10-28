import React from 'react';
import List from '@material-ui/core/List';
import AchievementsListItem from './AchievementsListItem';

const AchievementsList = ({ achievements }) => {
  return (
    <List dense disablePadding>
      {achievements
        .filter((item) => item.description)
        .map((item) => (
          <AchievementsListItem key={item.id} text={item.description} />
        ))}
    </List>
  );
};

export default AchievementsList;
