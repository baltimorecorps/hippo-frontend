import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';

import RoleCards from './RoleCards';

const InternalOpportunityBoard = ({
  classes,
  opportunities,
  getAllInternalOpportunities,
}) => {
  useEffect(() => {
    getAllInternalOpportunities();
  }, [getAllInternalOpportunities]);

  let history = useHistory();

  const toViewApplication = opportunityId => {
    history.push(`/application/${opportunityId}/review`);
  };

  if (!opportunities) {
    return <div>...Loading</div>;
  } else {
    return (
      <div className={classes.container}>
        {opportunities.map((opportunity, index) => (
          <RoleCards
            key={index}
            opportunity={opportunity}
            applications={opportunity.applications}
            toViewApplication={toViewApplication}
          />
        ))}
      </div>
    );
  }
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(1),
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',

      flexDirection: 'column',
    },
    [breakpoints.down('md')]: {},
    [breakpoints.down('xl')]: {},
  },
});

export default withStyles(styles)(InternalOpportunityBoard);
