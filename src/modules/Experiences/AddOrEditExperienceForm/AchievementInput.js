import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const AchievementInput = React.forwardRef(
  ({value, onTextChange, onDelete, classes, handleAdd, onChange}, ref) => {
    const [isFocused, setFocused] = React.useState(false);

    let onChangeFunc = onChange;
    if (onTextChange) {
      onChangeFunc = onTextChange;
    }

    const handleKeyPress = e => {
      e.persist();
      if (e.key === 'Enter') {
        if (value && /[^\r\n]+/.test(value)) {
          handleAdd();
          setFocused(true);
          e.preventDefault();
        }
      } else {
        onChangeFunc(e);
      }
    };

    let display;
    const handleBlur = () => {
      if (value.length < 1) {
        display = {display: 'none'};
      }
      setFocused(false);
    };

    let endAdornment;
    if (isFocused) {
      endAdornment = (
        <InputAdornment position="end">
          <IconButton
            edge="end"
            aria-label="delete achievement"
            className={classes.iconButton}
            onMouseDown={onDelete}
          >
            <CloseIcon className={classes.delete} />
          </IconButton>
        </InputAdornment>
      );
    }

    return (
      <Grid container style={display}>
        <Grid item xs={1} className={classes.center}>
          <KeyboardArrowRightIcon />
        </Grid>
        <Grid item xs={10}>
          <TextField
            placeholder="Add Responsibilities/Achievements"
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            className={classes.input}
            type="text"
            inputRef={ref || null}
            value={value}
            fullWidth
            multiline
            margin="normal"
            onChange={handleKeyPress}
            onKeyPress={handleKeyPress}
            InputProps={{
              classes: {input: classes.resize},
              disableUnderline: !isFocused,
              endAdornment: endAdornment,
            }}
          />
        </Grid>
      </Grid>
    );
  }
);

const styles = ({breakpoints, palette, spacing}) => ({
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
    },
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  center: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default withStyles(styles)(AchievementInput);
