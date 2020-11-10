import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import PartnershipsNavBar from '../PartnershipsPage/PartnershipsNavBar';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ApplicationsCard from '../Cards/ApplicationsCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ApplicantDetails from './ApplicantDetails';
import DescriptionIcon from '@material-ui/icons/Description';
import ApplicantValueAlignment from './ApplicantValueAlignment';

const ApplicantPage = ({
  classes,
  contactId,
  applications,
  applicant,
  getContactApplications,
  getContact,
}) => {
  useEffect(() => {
    if (!applications) getContactApplications(contactId);
  }, [getContactApplications, contactId, applications]);
  useEffect(() => {
    if (!applicant) getContact(contactId);
  }, [getContact, contactId, applicant]);

  let history = useHistory();
  const backToApplicantsBoard = () => {
    history.push(`/internal/applicants-board`);
  };

  const [openValueAlignment, setOpenValueAlignment] = useState(false);

  if (!applications || !applicant) {
    return <div data-testid="loading">loading...</div>;
  }

  return (
    <div className={classes.container} data-testid="applicant_page">
      <PartnershipsNavBar />
      {!openValueAlignment && (
        <React.Fragment>
          <Grid className={classes.buttonContainer}>
            <Button
              onClick={() => backToApplicantsBoard()}
              variant="contained"
              color="primary"
              className={classes.backButton}
              data-testid="back_to_applicants_board_button"
            >
              <ArrowBackIosIcon /> Back to Applicants Board
            </Button>
          </Grid>

          <Paper className={classes.paper} data-testid="applicant_page_content">
            <div className={classes.subContainer}>
              <ApplicantDetails applicant={applicant} />
              <div className={classes.rightDetails}>
                <Button
                  onClick={() => setOpenValueAlignment(true)}
                  variant="contained"
                  color="primary"
                  className={classes.valueAlignmentButton}
                  data-testid="see_value_alignment_button"
                >
                  <DescriptionIcon style={{marginRight: '10px'}} /> Value
                  Alignment
                </Button>
                <ApplicationsCard
                  applicant={applicant}
                  applications={applications}
                  contactId={contactId}
                />
              </div>
            </div>
          </Paper>
        </React.Fragment>
      )}

      {openValueAlignment && (
        <ApplicantValueAlignment
          applicant={applicant}
          handleClose={() => setOpenValueAlignment(false)}
        />
      )}
    </div>
  );
};

ApplicantPage.propTypes = {
  classes: PropTypes.object,
  contactId: PropTypes.number,
  applications: PropTypes.arrayOf(PropTypes.object),
  applicant: PropTypes.object,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '85%',
      maxWidth: '85%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '75%',
      maxWidth: '75%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '60%',
      maxWidth: '60%',
    },
    margin: spacing(1.5),
  },

  backButton: {
    marginBottom: spacing(1),
  },
  valueAlignmentButton: {
    marginBottom: spacing(3),
  },
  paper: {
    width: '100%',
    padding: spacing(2, 3, 3),
    margin: spacing(1.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  subContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: spacing(1),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  },
  rightDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

export default withStyles(styles)(ApplicantPage);
