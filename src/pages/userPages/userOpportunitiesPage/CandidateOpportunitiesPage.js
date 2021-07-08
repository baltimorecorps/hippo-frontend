import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {useHistory} from 'react-router-dom';
import {createClickTracking} from 'lib/helperFunctions/helpers';
import EachOpportunity from '../../../components/opportunitiesComponents/EachOpportunity';
import {
  filterOpportunitiesByPrograms,
  sortByCategory,
} from 'lib/helperFunctions/opportunitiesHelpers';

import FellowshipModal from '../../../components/opportunitiesComponents/fellowshipModal.js';
import OpportunitiesNav from '../../../components/opportunitiesComponents/opportunitiesNav';

const CandidateOpportunitiesPage = ({
  classes,
  opportunities,
  getAllOpportunities,
  getContactProfile,
  apps,
  getAllApplications,
  contactId,
  submittedIds,
  contact,
  page,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!contact && contactId) {
      getContactProfile(contactId);
    }
    if (contact) {
      getAllApplications(contact.id);
    }
  }, [apps, getAllApplications, contact, contactId, getContactProfile]);

  const toApply = opportunity_id => {
    history.push(`/application/${opportunity_id}`);
  };
  const toViewApplication = opportunity_id => {
    history.push(`/application/${opportunity_id}/review`);
  };

  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  const onClickApplyButton = opportunityId => {
    createClickTracking(
      'Opportunity',
      'Click Apply Button',
      'Click Apply Button'
    );
    toApply(opportunityId);
  };
  const onClickViewAppButton = opportunityId => {
    createClickTracking(
      'Opportunity',
      'Click Apply Button',
      'Click Apply Button'
    );
    toViewApplication(opportunityId);
  };

  let header = '';
  let renderedOpportunities = [];

  const [value, setValue] = React.useState('All Programs');
  const programs = ['All Programs', 'Place for Purpose', 'Fellowship'];
  // const [ fellowshipModal, setFellowshipModal ] = React.useState(false)

  renderedOpportunities = filterOpportunitiesByPrograms(
    opportunities,
    value,
    programs
  );

  if (page === 'Mayoral Fellowship') {
    header = page;
    const MF_opportunities = opportunities.filter(
      opp => opp.program_name === 'Mayoral Fellowship'
    );
    renderedOpportunities = sortByCategory(MF_opportunities, 'title');
  } else if (page === 'Fellowship') {
    header = page;
    const F_opportunities = opportunities.filter(
      opp => opp.program_name === 'Fellowship'
    );
    renderedOpportunities = sortByCategory(F_opportunities, 'title');
  } else {
    header = page;
    const PFP_opportunities = opportunities.filter(
      opp => opp.program_name === 'Place for Purpose'
    );
    renderedOpportunities = sortByCategory(PFP_opportunities, 'title');
  }

  const handleChangeFilter = event => {
    event.persist();
    setValue(event.target.value);
  };

  if (!renderedOpportunities || renderedOpportunities.length === 0)
    return <div>loading...</div>;

  return (
    <div className={classes.container}>
      <OpportunitiesNav program={page} />
      

      {page === 'main' ? '' : <FellowshipModal program={page} />}
      {renderedOpportunities.map(
        (opportunity, index) =>
          opportunity.is_active === true && (
            <EachOpportunity
              opportunity={opportunity}
              contact={contact}
              submittedIds={submittedIds}
              key={index}
              index={index}
              onClickViewAppButton={onClickViewAppButton}
              onClickApplyButton={onClickApplyButton}
              audience="candidates"
            />
          )
      )}
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(1),
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
  header: {
    textAlign: 'center',
  },
  headerPaper: {
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  spacer: {
    display: 'none',

    [breakpoints.up(1340)]: {
      width: '100%',
      display: 'block',

      marginBottom: spacing(2),
      marginTop: spacing(2),
    },
  },
});

export default withStyles(styles)(CandidateOpportunitiesPage);
