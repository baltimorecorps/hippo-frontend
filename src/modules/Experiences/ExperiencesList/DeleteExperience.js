import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const DeleteExperience = ({ experience, onDelete, classes, handleCancel }) => {
  const experienceName = `${experience.host} - ${experience.title}`;

  return (
    <Dialog open={true}>
      <DialogContent className={classes.dialogContent}>
        <Typography align="center">
          Are you sure you want to delete
          <br />
          <span className={classes.experienceName}>{experienceName}</span>?
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
  dialogContent: {
    width: '350px',
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
      backgroundColor: '#d10d0d',
      color: '#ffffff',
      borderColor: '#bf0b0b',
    },
  },
  experienceName: {
    fontWeight: '700',
  },
});

export default withStyles(styles)(DeleteExperience);
