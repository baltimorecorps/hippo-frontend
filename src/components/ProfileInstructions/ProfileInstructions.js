import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import SubmitProfileExpansion from './SubmitProfileExpansion';
import ApplyOpportunitiesExpansion from './ApplyOpportunitiesExpansion';

const ProfileInstructions = ({classes}) => {
  return (
    <Paper className={classes.instructions}>
      <div className={classes.headerContainer}>
        <Typography
          variant="h5"
          component="h1"
          style={{
            fontWeight: '700',
          }}
        >
          Instructions
        </Typography>
      </div>
      <SubmitProfileExpansion />
      <ApplyOpportunitiesExpansion />
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  instructions: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(1.5, 1, 1),
    // paddingBottom: spacing(3),
    marginTop: spacing(5),
    [breakpoints.down('sm')]: {
      margin: spacing(0.2),
      width: '100%',
    },
    backgroundColor: '#d1d1d1',
    border: 'solid #c9c9c9 1px',
  },

  headerContainer: {
    marginBottom: spacing(1),
    // borderBottom: 'solid #e0e0e0 1px',
    // borderBottom: 'solid #ffcc33 1px',
    display: 'flex',
    justifyContent: 'space-between',
    // color: '#ffbf00',
    paddingLeft: '15px',
  },
});

export default withStyles(styles)(ProfileInstructions);
