import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

const AchievementInput = ({ label, value, onTextChange, onIconClick, classes, onKeyPress }) => {
  return (
    <TextField
      type="text"
      label={label}
      value={value}
      fullWidth
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
              <Icon>delete</Icon>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

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
