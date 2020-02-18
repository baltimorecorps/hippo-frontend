import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';

const ConfirmationPage = ({classes}) => {
  let history = useHistory();

  const toProfile = () => {
    history.push('/profile');
  };
  const toOpportunities = () => {
    history.push('/opportunities');
  };
  return (
    <Paper className={classes.paper}>
      <CheckCircleOutlineSharpIcon className={classes.icon} />
      <Typography variant="h4" component="h2" className={classes.header}>
        Your application has been submitted.
      </Typography>
      <Typography variant="body1" component="h2" className={classes.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod delectus
        quam exercitationem aut, possimus veniam suscipit temporibus, fugiat ea
        illo nam est nesciunt beatae error ab rerum aspernatur? Quod delectus
        quam exercitationem aut, possimus veniam suscipit temporibus, fugiat ea
        illo nam est nesciunt beatae error ab rerum aspernatur?
      </Typography>
      <div className={classes.buttonContainer}>
        <Button onClick={toProfile} variant="contained" color="secondary">
          Back to Profile
        </Button>
        <Button onClick={toOpportunities} variant="contained" color="primary">
          View More Opportunities
        </Button>
      </div>
    </Paper>
  );
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
});

export default withStyles(styles)(ConfirmationPage);
