import React  from 'react'
import Grid from '@material-ui/core/Grid';
import LoginAction from './logIn'



const OpportunitiesPeak = ({opportunities, getAllOpportunities}, props) => {

  // getAllOpportunities()

  
  return(
    <Grid justify='center' alignItems='center' container>
        {/* Commented out in prep for 
        <Grid item xs={12}>
        <Typography
            gutterBottom
            variant="h6"
            component="h1"
            style={{marginBottom:'3%'}}
            color="primary"
        >                    
            Some of our current openings include: 
        </Typography>
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rect" width={210} height={118}>Current Randomized Potential Role</Skeleton>
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rect" width={210} height={118}>Current Randomized Potential Role</Skeleton>
        </Grid> */}
        <Grid item xs={12}>    
        <LoginAction text={'Log in to learn more about these roles!'}/>
        </Grid>
    </Grid>
    )
}
  
export default OpportunitiesPeak;
  