import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    align: 'center',
    margin: '0 auto',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '30ch',
  },
}));

export default function MayoralAuth({handleClose}) {
  const initialState = {
    password: '',
    showPassword: false,
  };

  const classes = useStyles();
  const [values, setValues] = React.useState(initialState);

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    let {password} = values;
    if (password === 'Mayoral22Fellow$hip!') {
      handleClose();
    } else {
      setValues(initialState);
    }
  };

  return (
    <div className={classes.root}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <FormControl onSubmit={handleSubmit}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            color="secondary"
            style={{margin: '1% auto'}}
            onClick={handleSubmit}
            data-testid="submit_button"
          >
            submit
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
