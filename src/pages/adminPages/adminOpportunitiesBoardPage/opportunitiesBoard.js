import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import RoleCards from '../../../components/adminCardComponents/RoleCards';
import PartnershipsNavBar from 'components/navbarComponents/partnershipNav/PartnershipsNavBar';
import {filterOpportunitiesByPrograms} from 'lib/helperFunctions/opportunitiesHelpers';
import FilterByProgramsTabs from 'components/opportunitiesComponents/FilterByProgramsSelector';

const InternalOpportunityBoard = ({
  classes,
  opportunities,
  getAllInternalOpportunities,
}) => {
  useEffect(() => {
    getAllInternalOpportunities();
  }, [getAllInternalOpportunities]);

  const [value, setValue] = React.useState('Fellowship');
  const programs = [
    'All Programs',
    'Fellowship',
    'Mayoral Fellowship',
    'Place for Purpose',
  ];

  let theOpportunities = filterOpportunitiesByPrograms(
    opportunities,
    value,
    programs
  );

  const handleChangeFilter = event => {
    event.persist();
    setValue(event.target.value);
  };

  if (!theOpportunities || theOpportunities.length === 0) {
    return <div data-testid="loading">...Loading</div>;
  } else {
    return (
      <div className={classes.container}>
        <PartnershipsNavBar />
        <div className={classes.filterByProgramsContainer}>
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
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      padding: spacing(2, 3, 3),
      margin: spacing(1.5),
    },
  },
  filterByProgramsContainer: {
    [breakpoints.up('md')]: {
      alignSelf: 'flex-start',
      marginLeft: '15%',
    },
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
