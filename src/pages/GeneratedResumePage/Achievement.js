import React from 'react';
import format from 'date-fns/format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Achievement = ({date, name, description}) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={3}>
        <Typography component='h4' variant='p'>
          {format(date, 'MMM yyyy')}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography component='h5' variant='h6'>
          {name}
        </Typography>
        <Typography component='p' variant='p'>
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Achievement;
