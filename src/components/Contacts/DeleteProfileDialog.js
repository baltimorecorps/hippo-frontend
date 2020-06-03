import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const DeleteProfileDialog = ({classes, contact, onDelete, handleCancel}) => {
  const theContact = (
    <strong>
      {contact.first_name} {contact.last_name} (id: {contact.id})
    </strong>
  );
  return (
    <Dialog open={true} data-testid="confirm-delete-dialog">
      <DialogContent className={classes.dialogContent}>
        <Typography align="center">
          Are you sure you want to delete <br />
          {theContact} profile?
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction} align="between">
        <Button
          className={classes.delete}
          variant="outlined"
          onClick={() => onDelete(contact.id)}
          data-testid="confirm-delete-button"
        >
          Yes, Delete
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
          data-testid="confirm-not-delete-button"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteProfileDialog.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func,
};

const styles = ({breakpoints, palette, spacing}) => ({
  dialogContent: {
    [breakpoints.up('sm')]: {
      width: '350px',
    },
  },
  dialogAction: {
    padding: '0 20px 20px 20px',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-between',
    [breakpoints.up('sm')]: {
      width: '350px',
    },
  },
  delete: {
    '&:hover': {
      backgroundColor: palette.error.main,
      color: '#ffffff',
      borderColor: palette.error.dark,
    },
  },
});

export default withStyles(styles)(DeleteProfileDialog);
