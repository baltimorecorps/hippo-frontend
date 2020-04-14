import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const capabilityStyles = ({breakpoints, palette, spacing}) => ({
  root: {
    borderRadius: '20px',
    height: '24px',
    backgroundColor: 'white',
    border: 'solid 1px rgba(0,0,0,0.23)',
    margin: '2px',
  },
  highlighted: {
    borderRadius: '20px',
    height: '24px',
    backgroundColor: palette.primary.main,
    margin: '2px',
  },
  input: {
    padding: '0px',
    margin: '0px 12px',
  },
});
const CapabilityInput = withStyles(capabilityStyles)(
  ({classes, highlight, ...props}) => (
    <Input
      classes={{
        root: highlight ? classes.highlighted : classes.root,
        input: classes.input,
      }}
      {...props}
    />
  )
);

const selectStyles = ({breakpoints, palette, spacing}) => ({
  select: {
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    height: '32px',
  },
  iconHidden: {
    display: 'none',
  },
});
const CapabilitySelect = withStyles(selectStyles)(
  ({classes, skills, capability, onSkillsChange}) => {
    const capabilitySkills = skills
      .filter(skill => skill.capability_id === capability.id)
      .map(skill => skill.name);
    const handleChange = event => {
      const newSkills = event.target.value.map(name => ({
        name,
        capability_id: capability.id,
      }));
      onSkillsChange(
        skills
          .filter(skill => skill.capability_id !== capability.id)
          .concat(newSkills)
      );
    };

    return (
      <FormControl key={capability.id}>
        <Select
          displayEmpty={true}
          classes={{
            root: classes.select,
            icon: classes.iconHidden,
          }}
          disableUnderline
          input={<CapabilityInput highlight={capabilitySkills.length > 0} />}
          multiple
          onChange={handleChange}
          value={capabilitySkills}
          renderValue={selected => capability.name}
        >
          <MenuItem disabled value="">
            <b>{capability.name}</b>
          </MenuItem>
          {capability.skills.map(skill => (
            <MenuItem key={skill.id} value={skill.name}>
              {skill.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

const AchievementInput = React.forwardRef(
  (
    {
      achievement,
      capabilities,
      onSkillsChange,
      onTextChange,
      onIconClick,
      classes,
      onKeyPress,
      errors,
    },
    ref
  ) => {
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
            value={achievement.description}
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
          {capabilities &&
            capabilities.map(capability => {
              return (
                <CapabilitySelect
                  key={capability.id}
                  capability={capability}
                  skills={achievement.skills}
                  onSkillsChange={onSkillsChange}
                />
              );
            })}
          <FormHelperText className={classes.formHelperText}>
            {achievement.description.length > 750 && errors.achievements_error}
          </FormHelperText>
        </Grid>
      </Grid>
    );
  }
);

AchievementInput.propTypes = {
  achievement: PropTypes.object.isRequired,
  capabilities: PropTypes.arrayOf(PropTypes.object),
  onSkillsChange: PropTypes.func,
  onTextChange: PropTypes.func.isRequired,
  onIconClick: PropTypes.func,
  classes: PropTypes.object.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

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
  iconHidden: {
    display: 'none',
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
