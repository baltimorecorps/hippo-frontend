import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';

import RoleCards from './RoleCards';

const InternalOpportunityBoard = ({
  classes,
  contactId,
  apps,
  getAllApplications,
  state,
  submittedApp,
  opportunities,
  getAllOpportunities,
}) => {
  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  let history = useHistory();

  const toViewApplication = opportunityId => {
    history.push(`/application/${opportunityId}/review`);
  };

  const appList1 = [
    {name: 'Firstname Lastname', contactId: 78},
    {name: 'Firstname Lastname', contactId: 78},
    {name: 'Firstname Lastname', contactId: 78},
    {name: 'Firstname Lastname', contactId: 78},
  ];
  const appList2 = [
    {name: 'Firstname Lastname', contactId: 78},
    {name: 'Firstname Lastname', contactId: 78},
    {name: 'Firstname Lastname', contactId: 78},
  ];
  const appList3 = [
    {name: 'Firstname Lastname', contactId: 78},
    {name: 'Firstname Lastname', contactId: 78},
  ];

  const appLists = [appList1, appList2, appList3];

  // need list of all opportunities with all applications with status
  // submitted, recommended(approved), interviewing on each opportunities

  console.log(opportunities);

  return (
    <div className={classes.container}>
      {opportunities.map(opportunity => (
        <RoleCards
          opportunity={opportunity}
          appLists={appLists}
          toViewApplication={toViewApplication}
        />
      ))}
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(1),
    [breakpoints.down('sm')]: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',

      flexDirection: 'column',
    },
    [breakpoints.down('md')]: {},
    [breakpoints.down('xl')]: {},
  },
});

export default withStyles(styles)(InternalOpportunityBoard);
