import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const AchievementInput = React.forwardRef(
  ({value, onTextChange, onIconClick, classes, onKeyPress, errors}, ref) => {
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
      <Grid container>
        <Grid item xs={1} align="end">
          <KeyboardArrowRightIcon className={classes.arrowIcon} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            placeholder="Add Responsibilities/Achievements"
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
              classes: {input: classes.resize},
              disableUnderline: !isFocused,
              endAdornment: endAdornment,
            }}
          />

          <FormHelperText className={classes.formHelperText}>
            {value.length > 750 && errors.achievements_error}
          </FormHelperText>
        </Grid>
      </Grid>
    );
  }
);

const styles = ({breakpoints, palette, spacing}) => ({
  input: {
    width: '100%',
    marginTop: '0px',
    padding: '0px',
    marginBottom: spacing(0),
  },
  focused: {
    '&$focused': {},
  },
  resize: {
    fontSize: 16,
    padding: '0px',
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
  arrowIcon: {
    paddingTop: '6px',
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
  },
});

export default withStyles(styles)(AchievementInput);
