import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import DeleteIcon from '@material-ui/icons/Delete';

const AchievementInput = React.forwardRef(({ label, value, onTextChange, onIconClick, classes, onKeyPress }, ref) => {
  return (
    <TextField
      type="text"
      inputRef={ref}
      label={label}
      value={value}
      fullWidth
      multiline
      margin="normal"
      onChange={onTextChange}
      onKeyPress={onKeyPress}
      className={classes.formControl}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused,
        },
      }}
      InputProps={{
        classes: { input: classes.resize },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" aria-label="delete achievement" onClick={onIconClick}>
              <DeleteIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

const styles = ({ breakpoints, palette, spacing }) => ({
  formControl: {
    width: '100%',
    marginTop: '3px',
    marginBottom: spacing(0.5),
  },
  resize: {
    fontSize: 17,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 20,
  },
});

export default withStyles(styles)(AchievementInput);
