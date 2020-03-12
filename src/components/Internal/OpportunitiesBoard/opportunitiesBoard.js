import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import RoleCards from './RoleCards';
import PartnershipsNavBar from '../PartnershipsNavBar';

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
        <PartnershipsNavBar />
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            className={classes.header}
          >
            Internal Opportunities Board
          </Typography>
        </Paper>
        <div className={classes.cardContainer}>
          {opportunities.map((opportunity, index) => (
            <RoleCards
              key={index}
              opportunity={opportunity}
              applications={opportunity.applications}
              toViewApplication={toViewApplication}
            />
          ))}
        </div>
      </div>
    );
  }
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
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
    width: '95%',
    padding: spacing(2, 3, 3),
    margin: spacing(1.5),
  },
  header: {
    [breakpoints.up('sm')]: {
      fontSize: '24px',
    },
    fontSize: '20px',
  },
  cardContainer: {
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
