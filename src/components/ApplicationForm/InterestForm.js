import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {createExternalLink} from 'lib/helpers';
import Grid from '@material-ui/core/Grid';
import {interestValidator} from '../../lib/formValidator';
import FormHelperText from '@material-ui/core/FormHelperText';

const InterestForm = ({
  classes,
  startText,
  back,
  next,
  opportunity,
  application,
}) => {
  const [text, setText] = useState(startText);
  const [errors, setErrors] = useState({});

  const submit = text => {
    const {isError, err} = interestValidator(text);
    // const isError = false;
    // const err = {};

    if (isError) {
      setErrors(err);
    } else {
      next(text);
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.opportunityContent}>
          <div className={classes.headerContainer}>
            <Typography variant="h5" component="h1" className={classes.header}>
              Interest Statement
            </Typography>
          </div>
          <div>
            <Typography variant="h6" component="h2" className={classes.title}>
              {opportunity.title}
            </Typography>
          </div>
          <div className={classes.opportunityDescription}>
            <Typography className={classes.description}>
              {opportunity.short_description}
              <br />
            </Typography>
            <Typography className={classes.link}>
              {createExternalLink(
                'View full description',
                opportunity.gdoc_link,
                classes.link
              )}
            </Typography>
          </div>
        </div>
        <div>
          <Typography
            variant="h6"
            component="h1"
            className={classes.interestHeader}
          >
            Tell us why you're interested
          </Typography>
        </div>
        <div className={classes.interestHelptext}>
          <Typography variant="body2" component="p">
            Let employers know why you are excited about this opportunity and
            how your skills and experiences are a good fit.
          </Typography>
        </div>
        {application.status === 'submitted' ? (
          <Typography className={classes.interestStatement}>
            {application.interest_statement}
          </Typography>
        ) : (
          <Grid container justify="center" align="center" direction="column">
            <TextField
              variant="outlined"
              value={text}
              onChange={ev => {
                setText(ev.target.value);
              }}
              multiline
              rows={10}
              className={classes.interest}
            />
            <FormHelperText className={classes.formHelperText}>
              {errors.interestText_error || null}
            </FormHelperText>
          </Grid>
        )}
      </Paper>
      <Paper className={classes.stickyFooter}>
        <div className={classes.buttonContainer}>
          <Button
            onClick={back}
            className={classes.buttons}
            color="secondary"
            variant="contained"
          >
            Back
          </Button>
          <Button
            onClick={() => submit(text)}
            color="primary"
            variant="contained"
            className={classes.buttons}
          >
            Next
          </Button>
        </div>
      </Paper>
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(1),
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
    [breakpoints.up('lg')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    maxWidth: '1000px',

    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
  header: {
    fontWeight: 700,
    textAlign: 'center',

    [breakpoints.up('sm')]: {
      // textAlign: 'left',
    },
  },
  title: {
    marginBottom: spacing(1),
    fontWeight: 'bold',
  },
  interest: {
    width: '100%',
  },
  interestHeader: {
    fontWeight: '700',
  },
  interestHelptext: {
    marginBottom: spacing(1),
    color: palette.primary.midGray,
    fontSize: '15px',
    fontWeight: 'normal',
  },
  stickyFooter: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0 ',
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
  },
  buttons: {
    marginLeft: spacing(1),
  },
  link: {
    color: palette.primary.link,
    textIndent: '25px',
    alignSelf: 'flex-end',
    marginTop: spacing(1),
    [breakpoints.down('xs')]: {
      alignSelf: 'center',
    },
  },
  description: {
    textAlign: 'justify',
    textIndent: '25px',
  },
  opportunityContent: {
    marginBottom: spacing(2),
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
    marginBottom: '4px',
  },
  interestStatement: {
    textIndent: '25px',
    textAlign: 'justify',
  },
});

export default withStyles(styles)(InterestForm);
