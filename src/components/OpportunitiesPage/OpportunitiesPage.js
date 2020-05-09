import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {
  createExternalLink,
  createClickTracking,
} from 'lib/helperFunctions/helpers';
import EachOpportunity from './EachOpportunity';
import {
  sortAllOpportunitiesByCategory,
  sortByCategory,
} from '../../lib/helperFunctions/helpers';

const OpportunitiesPage = ({
  classes,
  opportunities,
  getAllOpportunities,
  apps,
  getAllApplications,
  contactId,
  submittedIds,
  contact,
  page,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!apps && contact) {
      getAllApplications(contact.id);
    }
  }, [apps, getAllApplications, contact]);

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
  const noMayoralOpportunities = opportunities.filter(
    opp => opp.program_name !== 'Mayoral Fellowship'
  );

  switch (page) {
    case 'Mayoral Fellowship':
      header = 'Mayoral Fellowship';
      const MF_opportunities = opportunities.filter(
        opp => opp.program_name === 'Mayoral Fellowship'
      );
      renderedOpportunities = sortByCategory(MF_opportunities, 'title');
      break;

    case 'Place for Purpose':
      header = 'Place for Purpose';
      const PFP_opportunities = opportunities.filter(
        opp => opp.program_name === 'Place for Purpose'
      );
      renderedOpportunities = sortByCategory(PFP_opportunities, 'title');
      break;

    case 'Fellowship':
      header = 'Fellowship';
      const fellowship_opportunities = opportunities.filter(
        opp => opp.program_name === 'Place for Purpose'
      );
      renderedOpportunities = sortByCategory(fellowship_opportunities, 'title');
      break;

    case 'main':
      header = '';
      renderedOpportunities = sortAllOpportunitiesByCategory(
        noMayoralOpportunities,
        'title'
      );
      break;

    default:
      header = '';
      renderedOpportunities = sortAllOpportunitiesByCategory(
        noMayoralOpportunities,
        'title'
      );
      break;
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.headerPaper}>
        <Typography
          component="h1"
          variant="h5"
          align="left"
          className={classes.header}
        >
          {`${header} Opportunities`}
        </Typography>
      </Paper>
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
  },
  header: {
    textAlign: 'center',
  },
  headerPaper: {
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
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
});

export default withStyles(styles)(OpportunitiesPage);
