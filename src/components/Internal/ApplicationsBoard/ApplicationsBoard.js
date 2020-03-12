import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ApproveNewApplicantForm from './ApproveNewApplicantForm';
import ApplicationCards from './ApplicationCards';
import PartnershipsNavBar from '../PartnershipsNavBar';

const ApplicationsBoard = ({
  classes,
  getAllContactsShort,
  approveNewApplicants,
  getAllInternalApplicants,
  contacts,
  applicants,
}) => {
  useEffect(() => {
    getAllContactsShort();
  }, [getAllContactsShort]);
  useEffect(() => {
    getAllInternalApplicants();
  }, [getAllInternalApplicants]);

  const [showForm, setShowForm] = useState(false);

  let history = useHistory();

  const toViewApplication = opportunityId => {
    history.push(`/application/${opportunityId}/review`);
  };

  if (!applicants) {
    return <div>...Loading</div>;
  }

  let options = {};
  options = contacts.map(contact => {
    return {
      name: `${contact.first_name} ${contact.last_name} (${contact.email})`,
      contact_id: contact.id,
      contact: contact,
    };
  });

  return (
    <div className={classes.container}>
      <PartnershipsNavBar />
      <Paper className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          className={classes.header}
        >
          Internal Applications Board
        </Typography>
      </Paper>
      {showForm ? (
        <ApproveNewApplicantForm
          options={options}
          approveNewApplicants={approveNewApplicants}
          closeForm={() => setShowForm(false)}
        />
      ) : (
        <Grid className={classes.buttonContainer}>
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            color="primary"
            className={classes.createButton}
          >
            Approve New Applicant
          </Button>
        </Grid>
      )}

      <div className={classes.cardContainer}>
        {applicants &&
          applicants.map((applicant, index) => (
            <ApplicationCards
              key={index}
              contactId={applicant.contact.id}
              applicant={applicant}
              applications={applicant.applications}
              toViewApplication={toViewApplication}
            />
          ))}
      </div>
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),

    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '95%',
    padding: spacing(2, 3, 3),
    margin: spacing(1.5),
  },
  header: {
    [breakpoints.up('sm')]: {
      fontSize: '24px',
    },
    fontSize: '20px',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(2),
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      //   width: '100%',
      alignItems: 'center',
      justifyContent: 'center',

      flexDirection: 'column',
    },
    [breakpoints.down('md')]: {},
    [breakpoints.down('xl')]: {},
  },
});

export default withStyles(styles)(ApplicationsBoard);
