import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {createExternalLink} from 'lib/helpers';

const OpportunitiesPage = ({classes, opportunities, getAllOpportunities}) => {
  let history = useHistory();

  const handleClick = () => {
    history.push('/new-opportunity');
  };

  const handleApply = opportunity_id => {
    history.push(`/application/${opportunity_id}`);
  };

  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  return (
    // TODO: Style this
    <div className={classes.container}>
      {Object.values(opportunities).map(opportunity => (
        <Paper className={classes.opportunityPaper}>
          <div className={classes.headerContainer}>
            <Typography
              variant="h5"
              component="h1"
              style={{
                fontWeight: '700',
              }}
            >
              {opportunity.title}
            </Typography>
          </div>
          <div className={classes.opportunityContent}>
            <div className={classes.opportunityDescription}>
              <Typography>
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
              <Button 
                onClick={() => handleApply(opportunity.id)}
                variant="contained" color="primary">
                Apply
              </Button>
            </div>
          </div>
        </Paper>
      ))}
      <Grid xs={12} md={8} className={classes.buttonContainer}>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          className={classes.createButton}
        >
          Add New Opportunity
        </Button>
      </Grid>
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
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  opportunityDescription: {
    marginRight: spacing(1),
    [breakpoints.down('sm')]: {
      marginBottom: spacing(2),
    },
    [breakpoints.up('md')]: {
      marginRight: spacing(8),
    },
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: palette.primary.link,
  },
});

export default withStyles(styles)(OpportunitiesPage);
