import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const ApproveNewApplicantForm = ({classes, options, approveNewApplicants}) => {
  let selectedApplicants = [];

  const approve = () => {
    console.log('approve value', selectedApplicants);
    const programId = 1;
    approveNewApplicants(programId, selectedApplicants);
  };

  const onChange = (event, values) => {
    selectedApplicants = values.map(value => value.contact);
    console.log(selectedApplicants);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Approve New Applicant
      </Typography>

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
            variant="outlined"
            label="Search by applicant's name or email"
            className={classes.searchBar}
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
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    width: '700px',
    marginTop: spacing(1),
    padding: spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  formHeader: {
    marginBottom: spacing(3),
  },
  searchBar: {
    minWidth: '80%',
    backgroundColor: 'white',
  },
  approveButton: {
    marginTop: spacing(2),
  },
});

export default withStyles(styles)(ApproveNewApplicantForm);
