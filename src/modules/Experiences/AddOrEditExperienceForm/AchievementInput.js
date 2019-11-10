import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const AchievementInput = React.forwardRef(
  ({ value, onTextChange, onIconClick, classes, onKeyPress }, ref) => {
    const [isFocused, setFocused] = React.useState(false);

    let endAdornment;
    if (isFocused) {
      endAdornment = (
        <InputAdornment position="end">
          <IconButton
            edge="end"
            aria-label="delete achievement"
            className={classes.iconButton}
            onMouseDown={onIconClick}
          >
            <CloseIcon className={classes.delete} />
          </IconButton>
        </InputAdornment>
      );
    }
    return (
      <TextField
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={classes.input}
        type="text"
        inputRef={ref}
        value={value}
        fullWidth
        multiline
        margin="normal"
        onChange={onTextChange}
        onKeyPress={onKeyPress}
        InputProps={{
          classes: { input: classes.resize },
          disableUnderline: !isFocused,
          startAdornment: (
            <InputAdornment position="start">
              <KeyboardArrowRightIcon />
            </InputAdornment>
          ),
          endAdornment: endAdornment,
        }}
      />
    );
  },
);

const styles = ({ breakpoints, palette, spacing }) => ({
  input: {
    width: '100%',
    marginTop: '0px',
    marginBottom: spacing(0),
    padding: 0,
  },
  focused: {
    '&$focused': {},
  },
  resize: {
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  delete: {
    '&:hover': {
      backgroundColor: palette.error.main,
      color: '#ffffff',
      borderColor: palette.error.dark,
    },
  },
  iconButton: {
    padding: 0,
  },
});

export default withStyles(styles)(AchievementInput);
