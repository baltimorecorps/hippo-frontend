import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import AddOrEditOpportunityForm from './AddOrEditOpportunityForm';
import EachOpportunity from '../../CandidateOpportunitiesPage/EachOpportunity';
import PartnershipsNavBar from '../PartnershipsPage/PartnershipsNavBar';
import {filterOpportunitiesByPrograms} from 'lib/helperFunctions/opportunitiesHelpers';
import FilterByProgramsTabs from '../../CandidateOpportunitiesPage/FilterByProgramsSelector';
import AddIcon from '@material-ui/icons/Add';

const AddOrEditOpportunitiesPage = ({
  classes,
  opportunities,
  getAllOpportunities,
  addOpportunity,
  updateOpportunity,
  deactivateRole,
  activateRole,
}) => {
  let history = useHistory();

  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  const [showForm, setShowForm] = useState(false);

  // TODO: make dropdown selection for cycle_id and Program_id in the future
  const blankOpportunity = {
    gdoc_link: '',
    title: '',
    cycle_id: 1,
    short_description: '',
    org_name: '',
  };

  const addNewOpportunity = async values => {
    const result = await addOpportunity(values);
    if (result && Number(result.statusCode) === 201) {
      history.push('/internal/add-or-edit-opportunities');
    }
  };

  const updateExistingOpportunity = async values => {
    const result = await updateOpportunity(values);
    if (result && Number(result.statusCode) === 200) {
      history.push('/internal/add-or-edit-opportunities');
    }
  };
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

  if (!theOpportunities || theOpportunities.length === 0)
    return <div>loading...</div>;

  return (
    <div className={classes.container}>
      <PartnershipsNavBar />

      <div
        className={classes.filterAndFormContainer}
        style={showForm ? {flexDirection: 'column'} : null}
      >
        <FilterByProgramsTabs
          handleChangeFilter={handleChangeFilter}
          value={value}
          programs={programs}
        />
        {showForm ? (
          <AddOrEditOpportunityForm
            type="add"
            opportunity={blankOpportunity}
            onSubmit={addNewOpportunity}
            closeForm={() => setShowForm(false)}
          />
        ) : (
          <Grid className={classes.buttonContainer}>
            <Button
              onClick={() => setShowForm(true)}
              variant="contained"
              color="primary"
              data-testid="open-add-new-opp-form-btn"
            >
              <AddIcon style={{margin: '5px'}} /> Add New Opportunity
            </Button>
          </Grid>
        )}
      </div>

      {theOpportunities.map((opportunity, index) => (
        <EachOpportunity
          key={index}
          opportunity={opportunity}
          audience="internal"
          updateExistingOpportunity={updateExistingOpportunity}
          deactivateRole={deactivateRole}
          activateRole={activateRole}
        />
      ))}
    </div>
  );
};

AddOrEditOpportunitiesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  opportunities: PropTypes.array.isRequired,
  getAllOpportunities: PropTypes.func.isRequired,
  addOpportunity: PropTypes.func.isRequired,
  updateOpportunity: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    marginTop: spacing(1),
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing(2),
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
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },

  filterAndFormContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default withStyles(styles)(AddOrEditOpportunitiesPage);
