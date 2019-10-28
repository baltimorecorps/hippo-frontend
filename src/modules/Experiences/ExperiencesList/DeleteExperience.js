import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const DeleteExperience = ({ experience, onDelete, classes, handleCancel }) => {
  return (
    <Dialog className={classes.modal} open={true}>
      <DialogContent className={classes.dialogContent}>
        <Typography align="center">
          Are you sure you want to delete this experience?
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction} align="between">
        <Button
          className={classes.delete}
          variant="outlined"
          onClick={() => onDelete(experience)}
        >
          Delete
        </Button>

        <Button variant="contained" color="secondary" onClick={handleCancel}>
          No, Go Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  modal: {},
  dialogContent: {
    width: '350px',
    margin: '0',
  },
  dialogAction: {
    width: '350px',
    paddingBottom: '20px',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  delete: {
    '&:hover': {
      backgroundColor: '#b00000',
      color: '#ffffff',
    },
  },
});

export default withStyles(styles)(DeleteExperience);
