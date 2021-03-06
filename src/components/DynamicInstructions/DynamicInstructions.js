import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import SubmitProfileExpansion from './dynamicInstructionComponents/SubmitProfileExpansion';
import ApplyOpportunitiesExpansion from './dynamicInstructionComponents/ApplyOpportunitiesExpansion';

const DynamicInstructions = ({
  getDynamicInstructions,
  submitProfileForReview,
  id,
  instructions,
  status,
  openAboutMeForms,
  setOpenAboutMeForms,
  expandPanel,
  setExpandPanel,
  classes,
}) => {
  if (instructions == null) {
    return <div data-testid="loading">loading...</div>;
  }
  return (
    <Paper className={classes.instructions}>
      <div className={classes.headerContainer}>
        <Typography
          variant="h5"
          component="h1"
          style={{
            fontWeight: '700',
          }}
          data-testid="instructions"
        >
          Instructions
        </Typography>
      </div>
      <SubmitProfileExpansion
        instructions={instructions}
        status={status}
        isExpanded={status !== undefined ? status !== 'approved' : false}
        onSubmit={() => submitProfileForReview(id)}
        openAboutMeForms={openAboutMeForms}
        setOpenAboutMeForms={setOpenAboutMeForms}
        expandPanel={expandPanel}
        setExpandPanel={setExpandPanel}
      />
      <ApplyOpportunitiesExpansion 
        status={status}
        className={classes.applyExpansion}
        isExpanded={status !== undefined ? status === 'approved' : false}
      />
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  instructions: {
    width: '100%',
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
