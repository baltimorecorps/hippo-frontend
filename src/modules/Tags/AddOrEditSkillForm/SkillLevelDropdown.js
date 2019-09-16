import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import getTextScore from 'modules/Tags/utilities/getTextScore';

const SkillLevelDropdown = ({onChange, value}) => {
  return (
    <Select
      value={value || 0}
      onChange={onChange}
      inputProps={{
        name: 'skillLevel',
        id: 'skillLevel',
      }}
    >
      {SkillLevelDropdown.options.map(level =>
        <MenuItem key={level} value={level}>
          {getTextScore(level)}
        </MenuItem>
      )}
    </Select>
  );
};

SkillLevelDropdown.options = [1, 2, 3, 4];

export default SkillLevelDropdown;
