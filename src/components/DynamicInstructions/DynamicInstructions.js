import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import SubmitProfileExpansion from './SubmitProfileExpansion';
import ApplyOpportunitiesExpansion from './ApplyOpportunitiesExpansion';

const DynamicInstructions = ({
  getDynamicInstructions,
  id,
  instructions,
  classes,
}) => {
  useEffect(() => {
    if (!id || !instructions) getDynamicInstructions(id);
  }, [id, instructions, getDynamicInstructions]);

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
      <SubmitProfileExpansion instructions={instructions} />
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
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '15px',
  },
});

export default withStyles(styles)(DynamicInstructions);