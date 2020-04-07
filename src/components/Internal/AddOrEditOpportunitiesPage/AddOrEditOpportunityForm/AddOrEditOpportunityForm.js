import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {createClickTracking, createALink} from 'lib/helperFunctions/helpers';
import terms from 'lib/pdf_files/services-terms.pdf';
import policy from 'lib/pdf_files/privacy -policy.pdf';

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
import {useHistory} from 'react-router-dom';
import {opportunityValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useForm = (initialValues, onSubmit, closeForm) => {
  // const [values, setValues] = useState({});
  const [update, values] = useFormUpdate(initialValues);

  const handleSubmit = () => {
    onSubmit(values);
  };

  const handleChange = event => {
    event.persist();
    update(event.target.name)(event.target.value);
  };

  return [values, handleChange, handleSubmit];
};

const AddOrEditOpportunityForm = ({
  classes,
  opportunity,
  onSubmit,
  type,
  closeForm,
}) => {
  const [values, handleChange, handleSubmit] = useForm(opportunity, onSubmit);
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
    const {isError, err} = opportunityValidator(values);

    if (isError) {
      setErrors(err);
    } else {
      handleSubmit();
      closeForm();
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between">
        <Typography
          component="h1"
          variant="h5"
          align="left"
          className={classes.paperHeader}
        >
          {type === 'add' ? 'Add New Opportunity' : 'Update Opportunity'}
        </Typography>
        <IconButton
          edge="end"
          aria-label="cancel form"
          onMouseDown={closeForm}
          className={classes.iconButton}
        >
          <CloseIcon />
        </IconButton>
      </Grid>

      <form noValidate autoComplete="off">
        <Grid container direction="column">
          <TextField
            required
            id="organization"
            label="Organization"
            className={classes.textField}
            name="org_name"
            value={values.org_name || ''}
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.orgName_error || null}
          </FormHelperText>
          <TextField
            required
            id="title"
            label="Job Title"
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
            rows={4}
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
            {errors.link_error || null}
          </FormHelperText>
        </Grid>
      </form>
      <Grid container justify="flex-end">
        <Button
          onClick={submit}
          variant="contained"
          color="primary"
          className={classes.createButton}
        >
          {type === 'add' ? 'Add New Opportunity' : 'Update'}
        </Button>
      </Grid>
    </Paper>
  );
};

AddOrEditOpportunityForm.propTypes = {
  classes: PropTypes.object.isRequired,
  opportunity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    cycle_id: PropTypes.number.isRequired,
    gdoc_link: PropTypes.string.isRequired,
    org_name: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
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
    fontSize: 16,
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
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
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
  iconButton: {
    flexBasis: '50px',
    padding: spacing(0.2),
    '&:hover': {
      color: 'black',
    },
  },
});

export default withStyles(styles)(AddOrEditOpportunityForm);
