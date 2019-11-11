import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const DegreeDropdown = ({onChange, value}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      inputProps={{
        name: 'degree',
        id: 'degree',
      }}
    >
      {DegreeDropdown.options.map(({key, value}) => (
        <MenuItem key={key} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
};

DegreeDropdown.options = [
  {key: 'high_school', text: 'High School', value: 'High School'},
  {key: 'associates', text: 'Associates', value: 'Associates'},
  {key: 'undergraduate', text: 'Undergraduate', value: 'Undergraduate'},
  {key: 'masters', text: 'Masters', value: 'Masters'},
  {key: 'doctoral', text: 'Doctoral', value: 'Doctoral'},
];

export default DegreeDropdown;
