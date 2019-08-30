import React from 'react';
import { Link } from 'react-router-dom';
import CardGroup from 'components/CardGroup';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import applicationCardItems from './applicationCardItems';
import opportunityCardItems from './opportunityCardItems';
import talentCardItems from './talentCardItems';

const TalentHome = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Grid container style={{ backgroundColor: 'lightblue', padding: 20, marginBottom: 20 }}>
          <Grid item xs={12} sm={6}>
            <h1>Billy Daly</h1>
            <p>
              <Link to="/profile">
                <Button variant="contained">View Your Profile-></Button>
              </Link>
            </p>
          </Grid>

          <Grid item>
            <Link to="/profile">
              <Button variant="contained">Update Education</Button>
            </Link>
            <Divider style={{ margin: '20px 0' }}/>
            <Link to="/profile">
              <Button variant="contained">Update Work Experience</Button>
            </Link>
          </Grid>
        </Grid>

        <Grid container direction="column" style={styles.section}>
          <h2>Opportunities Recommended for You</h2>
          <CardGroup items={opportunityCardItems} />
        </Grid>

        <Grid container direction="column" style={styles.section}>
          <h2>Your Applications</h2>
          <CardGroup items={applicationCardItems} />
        </Grid>

        <Grid container direction="column" style={styles.section}>
          <h2>You may want to connect with</h2>
          <CardGroup items={talentCardItems} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
};

export default TalentHome;
