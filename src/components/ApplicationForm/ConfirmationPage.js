import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import {createClickTracking} from 'lib/helperFunctions/helpers';

const ConfirmationPage = ({classes}) => {
  let history = useHistory();

  const toProfile = () => {
    history.push('/profile');
  };
  const toOpportunities = () => {
    history.push('/opportunities');
  };

  const onClickBackToProfile = () => {
    createClickTracking(
      'Confirmation Page after Submit Application',
      'Click Back to Profile',
      'Click Back to Profile'
    );
    toProfile();
  };
  const onClickViewMoreOpportunities = () => {
    createClickTracking(
      'Confirmation Page after Submit Application',
      'Click View More Opportunities',
      'Click View More Opportunities'
    );
    toOpportunities();
  };

  return (
    <Paper className={classes.paper}>
      <CheckCircleOutlineSharpIcon className={classes.icon} />
      <Typography variant="h4" component="h2" className={classes.header}>
        Your application has been submitted.
      </Typography>
      <Typography variant="body1" component="h2" className={classes.content}>
        Thank you for submitting your expression of interest for this position.
        We will be reviewing your submission and will be in touch soon with the
        status of this application. In the meantime feel free to reach out to us
        with any questions at
        <span className={classes.email}> partnerships@baltimorecorps.org</span>
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          onClick={onClickBackToProfile}
          variant="contained"
          color="secondary"
        >
          Back to Profile
        </Button>
        <Button
          onClick={onClickViewMoreOpportunities}
          variant="contained"
          color="primary"
        >
          View More Opportunities
        </Button>
      </div>
    </Paper>
  );
};

ConfirmationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
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
    width: '100%',
    height: '50%',
    padding: spacing(3),
    margin: spacing(2, 0),

    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    margin: spacing(3, 0),
  },
  content: {
    padding: spacing(0, 2, 2, 2),
    textIndent: '25px',
    textAlign: 'justify',
    marginBottom: spacing(2),
    marginTop: spacing(1),
  },
  buttonContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing(1),
  },
  icon: {
    color: '#059e00',
    fontSize: '100px',
  },
  email: {
    color: palette.primary.link,
  },
});

export default withStyles(styles)(ConfirmationPage);
