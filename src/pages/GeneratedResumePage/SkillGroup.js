import React from 'react';
import Typography from '@material-ui/core/Typography';

const SkillGroup = ({name, skills}) => {
  return (
    <React.Fragment>
      <Typography component="h4" variant="h6">
        {name}
      </Typography>
      {skills.map(skill => (
        <Typography key={skill.name} component="p" variant="body1">
          {skill.name} - {skill.years} years
        </Typography>
      ))}
    </React.Fragment>
  );
};

export default SkillGroup;
