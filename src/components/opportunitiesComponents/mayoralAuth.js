import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

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
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const initialState = {
    password: '',
    showPassword: false,
    errors: false,
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
    let {password, errors} = values;
    if (password === 'Mayoral22Fellow$hip!') {
      handleClose();
    } else {
      setValues({...values, errors: true});
      // delay(6000).then(setValues(initialState))
    }
  };

  return (
    <div className={classes.root}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <FormControl onSubmit={handleSubmit}>
          <Grid container direction="row" spacing="1" alignItems='center'>
            <Grid item>
              <InputLabel htmlFor="standard-adornment-password">
                Access Code
              </InputLabel>
              <Input
                variant="outlined"
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
            </Grid>
            <Grid item>
              <Button
                variant=""
                color="secondary"
                // style={{margin: '1% auto'}}
                onClick={handleSubmit}
                data-testid="submit_button"
              >
                submit
              </Button>
            </Grid>
          </Grid>
          {values.errors ? (
            <Typography
              style={{padding: '1%', color: 'red'}}
              gutterBottom
              variant="caption"
              component="p"
              align="center"
            >
              Sorry, these credentials are invalid.
            </Typography>
          ) : (
            ''
          )}
        </FormControl>{' '}
      </div>
    </div>
  );
}
