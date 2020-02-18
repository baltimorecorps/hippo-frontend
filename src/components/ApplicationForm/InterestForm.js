import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import {createExternalLink} from 'lib/helpers';
import Grid from '@material-ui/core/Grid';
import {interestValidator} from '../../lib/formValidator';
import FormHelperText from '@material-ui/core/FormHelperText';
import StickyFooter from './StickyFooter';

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

  const handleNext = text => {
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
                `https://docs.google.com/document/d/${opportunity.gdoc_id}`,
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
      <StickyFooter
        page="interest"
        back={back}
        handleNext={() => handleNext(text)}
        application={application}
      />
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(2),
    marginBottom: spacing(3),
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
  link: {
    color: palette.primary.link,
    marginTop: spacing(1),
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
    border: `${palette.primary.midGray} 1px solid`,
    padding: '10px',
  },
});

export default withStyles(styles)(InterestForm);
