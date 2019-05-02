import React from 'react';
import format from 'date-fns/format';
import Typography from '@material-ui/core/Typography';

const Experience = ({ startDate, endDate, orgName, positionName, feats }) => {
  return (
    <div>
      <Typography component="h4" variant="h5">
        {format(startDate, 'MMM yyyy')} to {endDate ? format(endDate, 'MMM yyyy') : 'Present'}
      </Typography>
      <Typography component="h4" variant="h6">
        {positionName}, {orgName}
      </Typography>
      {feats.map((feat) => (
        <Typography component="p" variant="p">
          {feat.text}
        </Typography>
      ))}
    </div>
  );
};

export default Experience;
