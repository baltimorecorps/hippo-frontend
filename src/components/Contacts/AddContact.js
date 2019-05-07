import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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
        <DialogTitle id="form-dialog-title">Add New Profile</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <Grid container direction="column" justify="flex-start" alignItems="flex-start">
              <TextField
                required
                id="standard-name"
                label="First Name"
                className={classes.textField}
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="standard-name"
                label="Last Name"
                className={classes.textField}
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="email"
                label="Primary Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
              />

              <TextField
                required
                id="phone"
                label="Primary Phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
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

const styles = ({ breakpoints, palette, spacing, theme }) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '50px',
  },
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

export default withStyles(styles)(AddContact);
