import React from 'react';
import Typography from '@material-ui/core/Typography';

const SkillGroup = ({name, skills}) => {
  return (
    <React.Fragment>
      <Typography component='h4' variant='h6'>
        {name}
      </Typography>
      {skills.map(skill =>
        <Typography component='p' variant='p'>
          {skill.name} - {skill.years} years
        </Typography>
      )}
    </React.Fragment>
  );
};

export default SkillGroup;
