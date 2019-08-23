import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const AchievementsListItem = ({text}) => {
  return (
    <ListItem>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default AchievementsListItem;
