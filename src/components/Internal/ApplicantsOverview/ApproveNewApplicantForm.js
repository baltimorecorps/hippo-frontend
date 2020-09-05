import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const ApproveNewApplicantForm = ({
  classes,
  submittedApplicants,
  getSubmittedContacts,
  approveNewContactsStatus,
  showApproveForm,
  setShowApproveForm,
  // closeForm,
}) => {
  useEffect(() => {
    getSubmittedContacts();
  }, [getSubmittedContacts]);

  const [selectedValues, setSelectedValues] = useState([]);
  const [applicantIds, setApplicantIds] = useState([]);

  const options = submittedApplicants.map(contact => {
    return {
      name: `${contact.first_name} ${contact.last_name} (${contact.email})`,
      id: contact.id,
      contact: contact,
    };
  });

  const onChange = (event, values) => {
    setSelectedValues(values);
    setApplicantIds(
      values.map(value => {
        return {id: value.id};
      })
    );
  };

  const approve = async () => {
    await approveNewContactsStatus(applicantIds);
    setShowApproveForm(false);
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  return (
    // <Paper className={classes.paper}>
    <Dialog
      maxWidth="md"
      open={showApproveForm}
      onClose={() => setShowApproveForm(false)}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
    >
      {/* <Grid container justify="space-between" className={classes.formHeader}> */}
      <DialogTitle id="form-dialog-title" style={{padding: '10px 20px'}}>
        <Typography className={classes.dialogTitle}>
          <span> Approve New Applicants </span>
          <IconButton
            edge="end"
            aria-label="close approve form"
            onMouseDown={() => setShowApproveForm(false)}
            style={{padding: '5px'}}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>

      {/* </Grid> */}

      {/* <div className={classes.searchBarContainer}> */}
      <DialogContent className={classes.dialogContent}>
        <Autocomplete
          multiple
          id="approve-contact-text-field"
          getOptionLabel={option => option.name}
          options={[...selectedValues, ...options]}
          filterSelectedOptions
          className={classes.searchBar}
          onChange={onChange}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Search by applicant's name or email"
              className={classes.searchBar}
              InputLabelProps={inputLabelProps}
            />
          )}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.approveButton}
          onClick={approve}
          variant="contained"
          color="primary"
        >
          Approve
        </Button>
      </DialogActions>
      {/* </div> */}
      {/* </Paper> */}
    </Dialog>
  );
};

ApproveNewApplicantForm.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      contact: PropTypes.shape({
        email: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        last_name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  approveNewContactsStatus: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 17,
    [breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
  labelFocused: {
    fontSize: 19,
    color: '#000000',
    [breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
  dialog: {
    // padding: spacing(2, 3, 3),
    marginTop: '20px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '700px',
    // margin: '0 auto',
  },
  dialogTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
  },
  dialogActions: {
    padding: '20px',
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: spacing(3),
    backgroundColor: '#f7f7f7',
    [breakpoints.down('sm')]: {
      width: '95%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing(3, 2),
    },
    [breakpoints.down('xs')]: {
      padding: spacing(2, 1),
    },
  },
  formHeader: {
    marginBottom: spacing(2.5),
  },
  searchBar: {
    width: '95%',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  approveButton: {
    marginTop: spacing(2),
  },
  iconButton: {
    flexBasis: '50px',
    padding: spacing(0.2),
    '&:hover': {
      color: 'black',
    },
  },
});

export default withStyles(styles)(ApproveNewApplicantForm);
