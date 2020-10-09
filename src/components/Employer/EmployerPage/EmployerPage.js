import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import RoleCards from 'components/Internal/OpportunitiesBoard/RoleCards';

const EmployerPage = ({classes, opportunity, getOrgOpportunity}) => {
  let {opportunityId} = useParams();

  useEffect(() => {
    getOrgOpportunity(opportunityId);
  }, [getOrgOpportunity, opportunityId]);

  if (!opportunity) {
    return <div>...Loading Employer Page</div>;
  } else {
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            className={classes.header}
          >
            {opportunity.org_name}
          </Typography>
        </Paper>
        <RoleCards
          opportunity={opportunity}
          applications={opportunity.applications}
          page="employer"
        />
      </div>
    );
  }
};

EmployerPage.propTypes = {
  opportunity: PropTypes.shape({
    status: PropTypes.string.isRequired,
    application: PropTypes.array,
    program_id: PropTypes.number.isRequired,
    short_description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    gdoc_link: PropTypes.string.isRequired,
    org_name: PropTypes.string.isRequired,
  }),
  getOrgOpportunity: PropTypes.func.isRequired,
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
});

export default withStyles(styles)(EmployerPage);
