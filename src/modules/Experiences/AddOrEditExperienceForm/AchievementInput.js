import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

const AchievementInput = ({ label, value, onTextChange, onIconClick, classes }) => {
  return (
    <TextField
      type="text"
      label={label}
      value={value}
      fullWidth
      margin="normal"
      onChange={onTextChange}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" aria-label="delete achievement" onClick={onIconClick}>
              <Icon>delete</Icon>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  modal: {
    //width: 600,
    //margin: 'auto',
  },
  formControl: {
    width: '45%',
    marginBottom: spacing(2),
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
