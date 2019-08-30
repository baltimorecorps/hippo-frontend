import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const AchievementInput = ({label, value, onTextChange, onIconClick}) => {
  return (
    <TextField
      type="text"
      label={label}
      value={value}
      fullWidth
      margin="normal"
      onChange={onTextChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="delete achievement"
              onClick={onIconClick}
            >
              <Icon>delete</Icon>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AchievementInput;
