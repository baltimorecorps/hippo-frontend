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

const OpportunitiesPage = ({
  classes,
  opportunities,
  getAllOpportunities,
  apps,
  getAllApplications,
  contactId,
  submittedIds,
  contact,
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

  if (!contact || !opportunities) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.container}>
        <Paper className={classes.headerPaper}>
          <Typography
            component="h1"
            variant="h5"
            align="left"
            className={classes.header}
          >
            Place for Purpose Opportunities
          </Typography>
        </Paper>
        {opportunities.map(
          (opportunity, index) =>
            opportunity.is_active === true && (
              <Paper className={classes.opportunityPaper} key={index}>
                <div className={classes.headerContainer}>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.title}
                  >
                    {opportunity.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.organization}
                  >
                    {opportunity.org_name || ''}
                  </Typography>
                </div>
                <div className={classes.opportunityContent}>
                  <div className={classes.opportunityDescription}>
                    <Typography className={classes.description}>
                      {opportunity.short_description}
                      <br />
                    </Typography>
                    <Typography className={classes.link}>
                      {createExternalLink(
                        'View full description',
                        opportunity.gdoc_link,
                        classes.link
                      )}
                    </Typography>
                  </div>
                  <div className={classes.applyButton}>
                    {contact
                      ? contact.programs.map((eachProgram, index) =>
                          eachProgram.program.id === opportunity.program_id &&
                          eachProgram.is_approved === true ? (
                            submittedIds.includes(opportunity.id) ? (
                              <Button
                                onClick={() =>
                                  onClickViewAppButton(opportunity.id)
                                }
                                variant="contained"
                                color="primary"
                                key={index}
                              >
                                View Application
                              </Button>
                            ) : (
                              <Button
                                onClick={() =>
                                  onClickApplyButton(opportunity.id)
                                }
                                variant="contained"
                                color="primary"
                                key={index}
                              >
                                Apply
                              </Button>
                            )
                          ) : null
                        )
                      : null}
                  </div>
                </div>
              </Paper>
            )
        )}
      </div>
    );
  }
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
  opportunityPaper: {
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
  opportunityContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  opportunityDescription: {
    marginRight: spacing(2),
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('xs')]: {
      marginBottom: spacing(1),
    },
    [breakpoints.down('sm')]: {
      marginBottom: spacing(2),
      marginRight: spacing(0),
      alignSelf: 'center',
    },
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      paddingBottom: spacing(1),
      marginBottom: spacing(1),
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: palette.primary.link,
    textIndent: '25px',
    alignSelf: 'flex-end',
    marginTop: spacing(1),
    [breakpoints.down('sm')]: {
      alignSelf: 'center',
      marginTop: spacing(0),
      textIndent: '0px',
    },
  },
  description: {
    textAlign: 'justify',
    textIndent: '25px',
  },
  applyButton: {
    maxWidth: '100%',
  },
  title: {
    fontWeight: 700,
    fontSize: '22px',
    [breakpoints.down('xs')]: {
      fontSize: '20px',
    },
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
  },
});

export default withStyles(styles)(OpportunitiesPage);
