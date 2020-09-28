import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';

const ApplicantPage = ({classes, applicant}) => {
  let history = useHistory();

  const toProfile = contactId => {
    history.push(`/profile/${contactId}`);
  };
  if (!applicant) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleAndOrgContainer}>
        <Typography variant="body1" component="p" className={classes.name}>
          {`${applicant.first_name} ${applicant.last_name}`}
        </Typography>
        <Typography variant="body1" component="p" className={classes.email}>
          {applicant.email}
        </Typography>
        <Typography variant="body1" component="p" className={classes.email}>
          {applicant.phone_primary}
        </Typography>
      </div>

      <Link
        onClick={() => toProfile(applicant.id)}
        className={classes.seeProfileLink}
      >
        <Typography variant="body1" component="h1">
          See Profile
        </Typography>
      </Link>
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
  titleAndOrgContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  seeProfileLink: {
    color: palette.primary.link,
    padding: '2px 5px',
    cursor: 'pointer',
  },
  name: {
    fontWeight: 700,
    fontSize: '20px',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  email: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
    textAlign: 'center',
  },
});

export default withStyles(styles)(ApplicantPage);
