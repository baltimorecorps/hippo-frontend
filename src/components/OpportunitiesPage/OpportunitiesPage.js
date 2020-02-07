import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

const OpportunitiesPage = ({classes, opportunities, getAllOpportunities}) => {
  let history = useHistory();

  const handleClick = () => {
    history.push('/new-opportunity');
  };

  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  console.log(opportunities);

  return (
    <Grid xs={12} item justify="center">
      <ul>
        {Object.values(opportunities).map(opportunity => (
          <li key={opportunity.id}>{opportunity.title}</li>
        ))}
      </ul>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        className={classes.createButton}
      >
        Add New Opportunity
      </Button>
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({});

export default withStyles(styles)(OpportunitiesPage);
