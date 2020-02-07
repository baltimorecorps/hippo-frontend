import React, {useState} from 'react';
import {createClickTracking, createALink} from '../../lib/helpers';
import terms from '../../lib/terms-and-policy/services-terms.pdf';
import policy from '../../lib/terms-and-policy/privacy -policy.pdf';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiPhoneNumber from 'material-ui-phone-number';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";

const useForm = (submit) => {
  const [values, setValues] = useState({});
  let history = useHistory();

  const handleSubmit = () => {
    (async () => {
      const result = await submit(values);
      if (result && result.statusCode == 201) {
        history.push("/opportunities");
      }
    })();
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return [values, handleChange, handleSubmit];
};

const OpportunityForm = ({classes, addOpportunity}) => {
  const [values, handleChange, handleSubmit] = useForm(addOpportunity);
  const [errors, setErrors] = useState({});

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
    shrink: true,
  };

  const inputProps = {classes: {input: classes.resize}, autoComplete: 'off'};

  const submit = () => {
    //const {isError, err} = newProfileValidator(values);
    const isError = false;
    const err = {};

    if (isError) {
      setErrors(err);
    } else {
      handleSubmit();
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography
        component="h1"
        variant="h5"
        align="left"
        className={classes.paperHeader}
      >
        Add new Opportunity
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container direction="column">
          <TextField
            required
            id="title"
            label="Title"
            className={classes.textField}
            name="title"
            value={values.title || ''}
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.title_error || null}
          </FormHelperText>
          <TextField
            required
            id="short-description"
            label="Short Description"
            className={classes.textField}
            multiline
            name="short_description"
            value={values.short_description || ''}
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.shortDescription_error || null}
          </FormHelperText>
          <TextField
            required
            id="link"
            label="Link to full job description (Google Doc)"
            name="gdoc_link"
            value={values.gdoc_link || ''}
            onChange={handleChange}
            className={classes.textField}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.email_error || null}
          </FormHelperText>
        </Grid>
      </form>
      <Button
        onClick={submit}
        variant="contained"
        color="primary"
        className={classes.createButton}
      >
        Create Opportunity
      </Button>
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  header: {
    padding: spacing(2, 3, 0),
  },
  container: {
    marginBottom: spacing(3),
  },
  textField: {
    marginBottom: spacing(0),
  },
  actions: {
    padding: spacing(0, 3),
    marginBottom: spacing(3),
  },
  resize: {
    fontSize: 18,
  },
  labelRoot: {
    fontSize: 18,
  },
  labelFocused: {
    fontSize: 19,
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
    marginBottom: '4px',
  },
  paper: {
    padding: spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      minWidth: '400px',
    },
    [breakpoints.up('xl')]: {
      minWidth: '800px',
    },
  },
  paperHeader: {
    margin: spacing(0, 0, 2),
  },
  createButton: {
    fontWeight: 600,
    margin: spacing(2, 0, 0, 0),
  },
  link: {
    color: palette.primary.link,

    '&:hover': {
      color: '#2556f7',
    },
  },
  checkbox: {
    display: 'inline',
    margin: 0,
    padding: 0,
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 17px 0 0',
    fontSize: '14px',
  },
});

OpportunityForm.propTypes = {};

export default withStyles(styles)(OpportunityForm);
