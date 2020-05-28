import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import RoleCards from './RoleCards';
import PartnershipsNavBar from 'components/Internal/PartnershipsPage/PartnershipsNavBar';
import {sortAllOpportunitiesByCategory} from 'lib/helperFunctions/opportunitiesHelpers';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const InternalOpportunityBoard = ({
  classes,
  opportunities,
  getAllInternalOpportunities,
  fellowshipOpps,
  mayoralOpps,
  placeForPurposeOpps,
}) => {
  useEffect(() => {
    getAllInternalOpportunities();
  }, [getAllInternalOpportunities]);

  const sortedOpportunities = sortAllOpportunitiesByCategory(
    opportunities,
    'org_name'
  );

  let theOpportunities = [];

  const [value, setValue] = React.useState(1);

  const handleChangeFilter = (event, newValue) => {
    setValue(newValue);
  };

  switch (value) {
    case 0:
      theOpportunities = sortedOpportunities;
      break;
    case 1:
      theOpportunities = sortAllOpportunitiesByCategory(
        fellowshipOpps,
        'org_name'
      );
      break;
    case 2:
      theOpportunities = sortAllOpportunitiesByCategory(
        mayoralOpps,
        'org_name'
      );
      break;
    case 3:
      theOpportunities = sortAllOpportunitiesByCategory(
        placeForPurposeOpps,
        'org_name'
      );
      break;
    default:
      theOpportunities = sortedOpportunities;
      break;
  }

  if (theOpportunities.length === 0) return <div>loading...</div>;

  if (!theOpportunities) {
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
        <div className={classes.filterAndFormContainer}>
          <Paper square className={classes.tabsContainer}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChangeFilter}
              aria-label="disabled tabs example"
              className={classes.tabs}
            >
              <Tab label="All" className={classes.tab} />
              <Tab label="Fellowship" className={classes.tab} />
              <Tab label="Mayoral Fellowship" className={classes.tab} />
              <Tab label="Place for Purpose" className={classes.tab} />
            </Tabs>
          </Paper>
        </div>
        <div className={classes.cardContainer}>
          {theOpportunities.map((opportunity, index) => (
            <RoleCards
              key={index}
              opportunity={opportunity}
              applications={opportunity.applications}
              page="internal"
            />
          ))}
        </div>
      </div>
    );
  }
};

InternalOpportunityBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  opportunities: PropTypes.arrayOf(
    PropTypes.shape({
      short_description: PropTypes.string.isRequired,
      applications: PropTypes.arrayOf(PropTypes.object).isRequired,
      org_name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      program_id: PropTypes.number.isRequired,
      gdoc_link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      cycle_id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
  getAllInternalOpportunities: PropTypes.func.isRequired,
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

  tabsContainer: {
    marginRight: '10px',
    marginBottom: '10px',

    [breakpoints.up(1340)]: {
      marginBottom: '0px',
    },
  },
  tabs: {
    display: 'flex',
    flexDirection: 'column',
  },
  tab: {
    backgroundColor: palette.secondary.main,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default withStyles(styles)(InternalOpportunityBoard);
