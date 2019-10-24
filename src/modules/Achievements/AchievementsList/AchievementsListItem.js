import React from 'react';
import Typography from '@material-ui/core/Typography';

const AchievementsListItem = ({ text }) => {
  return (
    <Typography
      variant="body1"
      component="p"
      style={{
        padding: '0px 0px 0px 15px',
        wordWrap: 'break-word',
        marginBottom: '0px',
        fontSize: '14px',
        color: '#2e2e2e',
      }}
      paragraph={true}
    >
      {text}
    </Typography>
  );
};

export default AchievementsListItem;
