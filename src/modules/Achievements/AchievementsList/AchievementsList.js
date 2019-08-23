import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import AchievementsListItem from './AchievementsListItem';

const AchievementsList = ({achievements}) => {
  return (
    <React.Fragment>
      <Typography gutterBottom variant="h5" component="p">
        Achievements
      </Typography>
      <List>
        {achievements.filter(item => item.description).map((item) =>
          <AchievementsListItem key={item.id} text={item.description} />
        )}
      </List>
    </React.Fragment>
  );
};

export default AchievementsList;
