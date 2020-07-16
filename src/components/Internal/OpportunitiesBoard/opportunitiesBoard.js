import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import RoleCards from './RoleCards';
import PartnershipsNavBar from 'components/Internal/PartnershipsPage/PartnershipsNavBar';
import {filterOpportunitiesByPrograms} from 'lib/helperFunctions/opportunitiesHelpers';
import FilterByProgramsTabs from '../../CandidateOpportunitiesPage/FilterByProgramsTabs';

const InternalOpportunityBoard = ({
  classes,
  opportunities,
  getAllInternalOpportunities,
}) => {
  useEffect(() => {
    getAllInternalOpportunities();
  }, [getAllInternalOpportunities]);

  const [value, setValue] = React.useState(1);
  const programs = ['Fellowship', 'Mayoral Fellowship', 'Place for Purpose'];

  let theOpportunities = filterOpportunitiesByPrograms(
    opportunities,
    value,
    programs
  );

  const handleChangeFilter = (event, newValue) => {
    setValue(newValue);
  };

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
          <FilterByProgramsTabs
            handleChangeFilter={handleChangeFilter}
            value={value}
            programs={programs}
          />
        </div>
        <div className={classes.cardContainer}>
          {theOpportunities.map((opportunity, index) => (
            <RoleCards
              key={index}
              opportunity={opportunity}
              applications={opportunity.applications}
              page="internal-opportunities-board"
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
      applications: PropTypes.arrayOf(PropTypes.object),
      org_name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      program_id: PropTypes.number.isRequired,
      gdoc_link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
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
});

export default withStyles(styles)(InternalOpportunityBoard);
