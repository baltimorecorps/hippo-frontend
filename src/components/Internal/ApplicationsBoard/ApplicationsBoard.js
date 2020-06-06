import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ApproveNewApplicantForm from './ApproveNewApplicantForm';
import ApplicationCards from './ApplicationCards';
import PartnershipsNavBar from '../PartnershipsPage/PartnershipsNavBar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
  // const toViewApplication = opportunityId => {
  //   history.push(`/application/${opportunityId}/review`);
  // };

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

  const candidates = [
    {
      first_name: 'Bay',
      last_name: 'Chairangsaris',
      email: 'bay@baltimorecorps.org',
      programs: ['Place for Purpose', 'Fellowship'],
    },
    {
      first_name: 'Billy',
      last_name: 'Daly',
      email: 'billy@baltimorecorps.org',
      programs: ['Mayoral Fellowship'],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@baltimorecorps.org',
      programs: ['Place for Purpose', 'Mayoral Fellowship'],
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@baltimorecorps.org',
      programs: ['Fellowship'],
    },
  ];

  console.log(applicants);

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

      {/* <div className={classes.cardContainer}>
        {applicants &&
          applicants.map((applicant, index) => (
            <ApplicationCards
              key={index}
              contactId={applicant.contact.id}
              applicant={applicant}
              applications={applicant.applications}
              page="internal"
            />
          ))}
      </div> */}
      {applicants.map((applicant, index) => (
        <Paper
          className={`${classes.paper} ${classes.applicantsPaper}`}
          key={index}
        >
          <div className={classes.profileIconContainer}>
            <AccountBoxIcon className={classes.profileIcon} />
          </div>
          <div className={classes.nameEmailContainer}>
            <Typography component="p" variant="body1" className={classes.name}>
              {applicant.contact.first_name} {applicant.contact.last_name}
            </Typography>
            <Typography component="p" variant="body1" className={classes.email}>
              ({applicant.contact.email})
            </Typography>
          </div>
          <div className={classes.programTagsContainer}>
            {candidates[0].programs.map((program, index) => (
              <div className={classes.programTags} key={index}>
                {program}
              </div>
            ))}
          </div>
        </Paper>
      ))}
    </div>
  );
};

ApplicationsBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllContactsShort: PropTypes.func.isRequired,
  approveNewApplicants: PropTypes.func.isRequired,
  getAllInternalApplicants: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      first_name: PropTypes.string,
      id: PropTypes.number,
      last_name: PropTypes.string,
    })
  ).isRequired,
  applicants: PropTypes.arrayOf(
    PropTypes.shape({
      is_active: PropTypes.bool.Required,
      applications: PropTypes.array,
      contact: PropTypes.object.isRequired,
      id: PropTypes.number.Required,
      program_id: PropTypes.number.Required,
      is_approved: PropTypes.bool.Required,
    })
  ).isRequired,
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
  applicantsPaper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
  profileIcon: {
    fontSize: '60px',
    color: palette.primary.link,
    [breakpoints.up('sm')]: {
      marginRight: '10px',
    },
  },
  nameEmailContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [breakpoints.up('sm')]: {
      marginRight: '20px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  name: {
    fontSize: '22px',
  },
  email: {
    color: 'grey',
  },
  programTagsContainer: {
    display: 'flex',

    [breakpoints.up('sm')]: {
      justifySelf: 'flex-end',
      marginLeft: 'auto',
    },
  },
  programTags: {
    border: '1px solid grey',
    padding: '3px 8px',
    margin: '5px 3px',
    borderRadius: '5px',
    [breakpoints.up('sm')]: {
      marginRight: '10px',
    },
  },
});

export default withStyles(styles)(ApplicationsBoard);
