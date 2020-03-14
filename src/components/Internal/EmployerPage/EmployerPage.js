import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';

// import RoleCards from './RoleCards';

const EmployerPage = ({classes, opportunity, getOrgOpportunity}) => {
  let {opportunityId} = useParams();
  //   console.log(opportunityId);

  useEffect(() => {
    getOrgOpportunity(opportunityId);
  }, [getOrgOpportunity, opportunityId]);

  let history = useHistory();

  const toViewApplication = opportunityId => {
    history.push(`/application/${opportunityId}/review`);
  };

  console.log(opportunity);

  if (!opportunity) {
    return <div>...Loading Employer Page</div>;
  } else {
    return (
      <div className={classes.container}>
        Employer
        {/* {opportunities.map((opportunity, index) => (
          <RoleCards
            key={index}
            opportunity={opportunity}
            applications={opportunity.applications}
          
          />
        ))} */}
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

export default withStyles(styles)(EmployerPage);
