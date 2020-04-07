import React from 'react';
import PropTypes from 'prop-types';
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

AchievementsList.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      skills: PropTypes.array,
      id: PropTypes.number.isRequired,
    })
  ),
};

export default AchievementsList;
