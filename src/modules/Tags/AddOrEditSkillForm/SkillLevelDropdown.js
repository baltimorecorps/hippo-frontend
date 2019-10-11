import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import getTextScore from 'modules/Tags/utilities/getTextScore';
import withStyles from '@material-ui/core/styles/withStyles';

const SkillLevelDropdown = ({ onChange, value, classes }) => {
  return (
    <Select
      className={classes.select}
      value={value || 0}
      onChange={onChange}
      inputProps={{
        name: 'skillLevel',
        id: 'skillLevel',
      }}
    >
      {SkillLevelDropdown.options.map((level) => (
        <MenuItem key={level} value={level}>
          {getTextScore(level)}
        </MenuItem>
      ))}
    </Select>
  );
};

SkillLevelDropdown.options = [1, 2, 3, 4];

const styles = ({ breakpoints, palette, spacing }) => ({
  select: {
    width: 300,
  },
});

export default withStyles(styles)(SkillLevelDropdown);
