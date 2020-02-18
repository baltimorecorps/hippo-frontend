import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {createExternalLink} from 'lib/helperFunctions/helpers';

const InterestForm = ({classes, startText, back, next}) => {
  const [text, setText] = useState(startText);
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <Typography
            variant="h5"
            component="h1"
            style={{
              fontWeight: '700',
            }}
          >
              Tell us why you're interested
          </Typography>
        </div>
          <TextField 
            variant="outlined"
            value={text}
            onChange={(ev) => {setText(ev.target.value);}}
            multiline
          />
              <Button onClick={back}>Back</Button>
              <Button
                onClick={() => next(text)}
                color="primary"
                variant="contained">Next</Button>
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
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },

});

export default withStyles(styles)(InterestForm);
