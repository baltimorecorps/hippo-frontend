import React, {useState} from 'react';
import {createClickTracking, createALink} from 'lib/helperFunctions/helpers';
import terms from 'assets/pdf/services-terms.pdf';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiPhoneNumber from 'material-ui-phone-number';
import Checkbox from '@material-ui/core/Checkbox';

import {newProfileValidator} from 'lib/formHelpers/formValidator';

const useForm = (addNewContact, accountId, emailSuggest) => {
  const initValues = {};
  if (accountId) {
    initValues.account_id = accountId;
  }
  if (emailSuggest) {
    initValues.email = emailSuggest;
  }

  const [values, setValues] = useState(initValues);

  const handleSubmit = () => {
    addNewContact(values);
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckBoxChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.checked,
    }));
  };

  return [values, handleChange, handleSubmit, handleCheckBoxChange];
};

const AddContact = ({
  classes,
  addNewContact,
  dialog,
  accountId,
  emailSuggest,
}) => {
  const [open, setOpen] = useState(false);
  const [values, handleChange, handleSubmit, handleCheckBoxChange] = useForm(
    addNewContact,
    accountId,
    emailSuggest
  );
  const [errors, setErrors] = useState({});
  const [creatingContact, setCreatingContact] = useState(false);

  const submit = () => {
    const {isError, err} = newProfileValidator(values);

    if (isError) {
      setErrors(err);
    } else {
      setCreatingContact(true);
      handleSubmit();
      setOpen(false);
    }
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
    shrink: true,
  };

  const inputProps = {
    classes: {input: classes.resize},
    autoComplete: 'off',
    'data-testid': 'text_field',
  };

  const handlePhoneInput = value => {
    values.phone_primary = value;
  };

  const termsLink = createALink('Terms of Use', terms, classes.link);
  const policyLink = createALink(
    'Privacy Policy',
    'https://www.baltimorecorps.org/privacy-policy',
    classes.link
  );

  const checkboxLabel = (
    <span>
      I agree to the {termsLink} and {policyLink}
    </span>
  );

  const clickSubmitHandler = () => {
    createClickTracking(
      'Creating New Contact',
      'Add/Create New Contact/Account',
      'Click submit on add new contact form'
    );
    submit();
  };

  const termsAndPrivacyHandler = e => {
    e.persist();
    handleCheckBoxChange(e);

    let result = '';
    if (e.target.checked) {
      result = 'Agree';
    } else {
      result = 'Disagree';
    }
    createClickTracking(
      'Creating New Contact',
      `Click ${result} on terms and privacy checkbox`,
      `Click ${result} checkbox on terms and privacy checkbox`
    );
  };

  // It's kind of gross to have this component have two different forms
  // it renders in, but the <DialogActions> element makes this difficult to
  // factor out
  const form = (
    <form noValidate autoComplete="off">
      <Grid container direction="column">
        <TextField
          data-testid="first_name"
          required
          id="first-name"
          label="First Name"
          className={classes.textField}
          name="first_name"
          value={values.first_name || ''}
          onChange={handleChange}
          InputLabelProps={inputLabelProps}
          inputProps={inputProps}
        />
        <FormHelperText className={classes.formHelperText}>
          {errors.firstName_error || null}
        </FormHelperText>
        <TextField
          data-testid="last_name"
          required
          id="last-name"
          label="Last Name"
          className={classes.textField}
          name="last_name"
          value={values.last_name || ''}
          onChange={handleChange}
          InputLabelProps={inputLabelProps}
          inputProps={inputProps}
        />
        <FormHelperText className={classes.formHelperText}>
          {errors.lastName_error || null}
        </FormHelperText>
        <TextField
          data-testid="email"
          required
          id="email"
          label="Email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
          className={classes.textField}
          InputLabelProps={inputLabelProps}
          inputProps={inputProps}
        />
        <FormHelperText className={classes.formHelperText}>
          {errors.email_error || null}
        </FormHelperText>
        <MuiPhoneNumber
          required
          name="phone_primary"
          label="Phone"
          defaultCountry={'us'}
          value={values.phone_primary}
          onChange={handlePhoneInput}
          InputLabelProps={inputLabelProps}
          inputProps={inputProps}
          className={classes.textField}
          disableAreaCodes
        />
        <FormHelperText className={classes.formHelperText}>
          {errors.phonePrimary_error || null}
        </FormHelperText>
        <Grid item className={classes.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox
                name="terms_agreement"
                checked={values.terms_agreement || false}
                onChange={termsAndPrivacyHandler}
                value={values.terms_agreement || false}
                inputProps={{'data-testid': `clickable_terms_agreement`}}
                data-testid="terms_agreement"
              />
            }
            className={classes.checkbox}
          />
          <Typography
            component="p"
            variant="body2"
            className={classes.checkboxLabel}
          >
            {checkboxLabel}
          </Typography>
        </Grid>
        <FormHelperText className={classes.formHelperText}>
          {errors.termsAgreement_error || null}
        </FormHelperText>
      </Grid>
    </form>
  );

  let showThis = (
    <div data-testid="creating_profile">Creating your profile....</div>
  );
  if (!creatingContact) {
    showThis = (
      <Paper className={classes.paper} data-testid="add_contact_form">
        <Typography
          component="h1"
          variant="h5"
          align="left"
          className={classes.paperHeader}
          data-testid="add_contact_form_header"
        >
          Profile Basics
        </Typography>
        {form}
        <Button
          onClick={clickSubmitHandler}
          variant="contained"
          color="primary"
          className={classes.createButton}
          data-testid="create_profile_button"
        >
          Create Profile
        </Button>
      </Paper>
    );
  }

  if (dialog) {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => setOpen(true)}
          style={{fontWeight: 700}}
        >
          New Profile
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.header}>
            <span style={{fontWeight: 700}}>Add New Profile</span>
          </DialogTitle>

          <DialogContent className={classes.container}>{form}</DialogContent>

          <DialogActions className={classes.actions}>
            <Button
              onClick={clickSubmitHandler}
              variant="contained"
              color="primary"
              style={{fontWeight: 600}}
            >
              Create Profile
            </Button>
            <Button
              onClick={() => setOpen(false)}
              color="primary"
              style={{fontWeight: 600}}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  } else {
    return showThis;
  }
};

AddContact.propTypes = {
  classes: PropTypes.object.isRequired,
  addNewContact: PropTypes.func.isRequired,
  dialog: PropTypes.bool,
  accountId: PropTypes.string,
  emailSuggest: PropTypes.string,
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

export default withStyles(styles)(AddContact);
