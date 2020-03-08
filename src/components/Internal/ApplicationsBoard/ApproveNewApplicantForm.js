import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const ApproveNewApplicantForm = ({classes, options, approveNewApplicants}) => {
  let selectedApplicants = [];

  const onChange = (event, values) => {
    selectedApplicants = values.map(value => value.contact);
    console.log(selectedApplicants);
  };

  const approve = () => {
    console.log('approve value', selectedApplicants);
    const programId = 1;
    // approveNewApplicants(programId, selectedApplicants);
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Approve New Applicant
      </Typography>
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
      width: '50%',
    },
    [breakpoints.down('md')]: {
      width: '60%',
    },
    [breakpoints.down('sm')]: {
      width: '70%',
      padding: spacing(2, 1),
    },
    [breakpoints.down('xs')]: {
      width: '95%',
      padding: spacing(1, 0),
    },
  },
  searchBarContainer: {
    // backgroundColor: 'sss',
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
    marginBottom: spacing(3),
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
});

export default withStyles(styles)(ApproveNewApplicantForm);
