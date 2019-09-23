import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

// const RACES = [
//   {
//     value: 'asian',
//     label: 'Asian',
//   },
//   {
//     value: 'african-american',
//     label: 'African-american',
//   },
// ];
// const GENDERS = [
//   {
//     value: 'female',
//     label: 'Female',
//   },
//   {
//     value: 'male',
//     label: 'Male',
//   },
//   {
//     value: 'other',
//     label: 'Other',
//   },
// ];

const useForm = (addNewContact) => {
  const [values, setValues] = useState({});

  const handleSubmit = () => {
    values.email_primary = {
      is_primary: true,
      email: values.email,
    };
    addNewContact(values);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return [values, handleChange, handleSubmit];
};

const AddContact = ({ classes, addNewContact }) => {
  const [open, setOpen] = useState(false);
  const [values, handleChange, handleSubmit] = useForm(addNewContact);
  const submit = () => {
    handleSubmit();
    setOpen(false);
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  const inputProps = { classes: { input: classes.resize, shrink: false } };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setOpen(true)}
      >
        New Profile
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.header}>
          Add New Profile
        </DialogTitle>

        <DialogContent className={classes.container}>
          <form noValidate autoComplete="off">
            <Grid container direction="column">
              <TextField
                required
                id="first-name"
                label="First Name"
                className={classes.textField}
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <TextField
                required
                id="last-name"
                label="Last Name"
                className={classes.textField}
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <TextField
                required
                id="email"
                label="Primary Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={classes.textField}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />

              <TextField
                required
                id="phone"
                label="Primary Phone"
                name="phone_primary"
                value={values.phone_primary}
                onChange={handleChange}
                className={classes.textField}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
            </Grid>
          </form>
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Button onClick={submit} variant="contained" color="primary">
            Create Profile
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

AddContact.propTypes = {
  classes: PropTypes.object.isRequired,
  addNewContact: PropTypes.func.isRequired,
};

const styles = ({ breakpoints, palette, spacing }) => ({
  header: {
    padding: spacing(2, 3, 0),
  },
  container: {
    marginBottom: spacing(3),
  },
  textField: {
    marginBottom: spacing(1.5),
  },
  actions: {
    padding: spacing(0, 3),
    marginBottom: spacing(3),
  },
  resize: {
    fontSize: 17,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 20,
  },
});

export default withStyles(styles)(AddContact);
