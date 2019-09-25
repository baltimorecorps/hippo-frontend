import React from 'react';
import Typography from '@material-ui/core/Typography';

const AchievementsListItem = ({ text }) => {
  return (
    // <div style={{ width: '100%' }}>
    <Typography
      variant="body1"
      component="p"
      style={{ padding: '0px 0px 0px 15px', wordWrap: 'break-word', marginBottom: '5px' }}
      paragraph={true}
    >
      {text}
    </Typography>
    // </div>
  );
};

export default AchievementsListItem;
