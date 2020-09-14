import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const FilterByProgramsSelector = ({
  classes,
  handleChangeFilter,
  value,
  programs,
}) => {
  const programNames = programs.map(program => program.replace(/ /g, '-'));

  return (
    <Paper
      square
      style={{
        borderRadius: '2px',
        alignSelf: 'flex-start',
        marginBottom: '20px',
      }}
    >
      <FormControl className={classes.formControl} variant="outlined">
        <Select
          color="primary"
          displayEmpty
          labelId="programs_selectors"
          value={value}
          onChange={handleChangeFilter}
          inputProps={{
            name: 'programs_selectors',
            id: 'programs_selectors',
            'data-testid': 'programs_selectors',
          }}
        >
          {programs.map((program, index) => (
            <MenuItem
              key={index}
              id={`filter-${programNames[index]}`}
              data-testid={`filter-${programNames[index]}`}
              value={program}
            >
              {program}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

FilterByProgramsSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  programs: PropTypes.array.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  formControl: {
    backgroundColor: palette.primary.main,
    minWidth: 100,
  },
});

export default withStyles(styles)(FilterByProgramsSelector);
