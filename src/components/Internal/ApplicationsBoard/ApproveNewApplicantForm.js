import React, {useState} from 'react';
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

const ApproveNewApplicantForm = ({
  classes,
  options,
  approveNewApplicants,
  closeForm,
}) => {
  let selectedApplicants = [];

  const onChange = (event, values) => {
    selectedApplicants = values.map(value => value.contact);
  };

  const approve = async () => {
    const programId = 1;
    await approveNewApplicants(programId, selectedApplicants);
    closeForm();
    window.location.reload(false);
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" className={classes.formHeader}>
        <Typography variant="h5" component="h1">
          Approve New Applicants
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
      <div className={classes.searchBarContainer}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={options}
          getOptionLabel={option => option.name}
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
        <Button
          className={classes.approveButton}
          onClick={approve}
          variant="contained"
          color="primary"
        >
          Approve
        </Button>
      </div>
    </Paper>
  );
};

ApproveNewApplicantForm.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      contact_id: PropTypes.number.isRequired,
      contact: PropTypes.shape({
        email: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        last_name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  approveNewApplicants: PropTypes.func.isRequired,
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
  paper: {
    width: '50%',
    marginTop: spacing(1),
    padding: spacing(3, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    [breakpoints.down('lg')]: {
      width: '65%',
    },
    [breakpoints.down('md')]: {
      width: '70%',
    },
    [breakpoints.down('sm')]: {
      width: '85%',
      padding: spacing(2, 1),
    },
    [breakpoints.down('xs')]: {
      width: '95%',
      padding: spacing(1, 0),
    },
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
