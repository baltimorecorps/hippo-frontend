import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ApplicantContactShort from './ApplicantContactShort';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ApplicantValueAlignment = ({classes, applicant, handleClose}) => {
  if (!applicant) {
    return <div>loading...</div>;
  }
  return (
    <React.Fragment>
      <Grid className={classes.topContainer}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          className={classes.backButton}
        >
          <ArrowBackIosIcon /> Back
        </Button>
        <Paper className={classes.headerPaper}>
          <ApplicantContactShort applicant={applicant} />
        </Paper>
      </Grid>

      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <Typography variant="h6" component="h2" className={classes.header}>
            Value Alignment{' '}
          </Typography>
          <IconButton
            onClick={handleClose}
            aria-label="close filter form"
            style={{padding: '5px'}}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider style={{width: '100%', marginBottom: '10px'}} />

        <div className={classes.section}>
          <Typography
            variant="body1"
            component="p"
            className={classes.questions}
          >
            Why is racial equity work in Baltimore important to you?
          </Typography>
          <Typography variant="body1" component="p" className={classes.answers}>
            {applicant.profile.value_question1 || '-'}
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography
            variant="body1"
            component="p"
            className={classes.questions}
          >
            How has your background and experiences prepared you for today’s
            work in Baltimore’s social impact sector? *
          </Typography>
          <Typography variant="body1" component="p" className={classes.answers}>
            {applicant.profile.value_question2 || '-'}
          </Typography>
        </div>
      </Paper>
    </React.Fragment>
  );
};

ApplicantValueAlignment.propTypes = {
  classes: PropTypes.object,
  contactId: PropTypes.number,
  applications: PropTypes.arrayOf(PropTypes.object),
  applicant: PropTypes.object,
};

const styles = ({breakpoints, palette, spacing}) => ({
  headerPaper: {
    marginBottom: '10px',
    padding: spacing(1, 3),
  },
  backButton: {
    marginBottom: spacing(1),
    height: '40px',
  },
  valueAlignmentButton: {
    marginBottom: spacing(3),
  },
  topContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  paper: {
    width: '100%',
    padding: spacing(2, 3, 3, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginBottom: '10px',
  },
  section: {
    marginBottom: '20px',
  },
  questions: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  answers: {
    textIndent: '25px',
    textAlign: 'justify',
  },
});

export default withStyles(styles)(ApplicantValueAlignment);
