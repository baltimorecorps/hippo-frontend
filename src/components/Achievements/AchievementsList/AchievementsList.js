import React from 'react';
import List from '@material-ui/core/List';
import AchievementsListItem from './AchievementsListItem';

const AchievementsList = ({achievements, onSelect, selected}) => {
  return (
    <List dense disablePadding>
      {achievements
        .filter(item => item.description)
        .map(item => (
          <AchievementsListItem
            key={item.id}
            text={item.description}
            onSelect={onSelect && onSelect(item.id)}
            selected={selected && selected[item.id]}
          />
        ))}
    </List>
  );
};

export default AchievementsList;
