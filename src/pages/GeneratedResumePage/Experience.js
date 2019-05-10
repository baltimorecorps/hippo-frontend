import React from 'react';
import formatDate from 'lib/formatDate';
import Typography from '@material-ui/core/Typography';

const Experience = ({ startDate, endDate, orgName, positionName, feats }) => {
  return (
    <div>
      <Typography component="h4" variant="h5">
        {formatDate(startDate, 'MMM yyyy')} to {endDate ? formatDate(endDate, 'MMM yyyy') : 'Present'}
      </Typography>
      <Typography component="h4" variant="h6">
        {positionName}, {orgName}
      </Typography>
      {feats.map((feat) => (
        <Typography key={feat.text} component="p" variant="body1">
          {feat.text}
        </Typography>
      ))}
    </div>
  );
};

export default Experience;
