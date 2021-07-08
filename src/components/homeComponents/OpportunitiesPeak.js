import React  from 'react'
import {Grid,Button} from '@material-ui/core';
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
        <Button
                  // href='www.google.com'
                  // onClick={() => onClickViewAppButton(opportunity.id)}
                  rel="noopener noreferrer" 
                  href='https://jobs.crelate.com/portal/baltimorecorps'
                  target="_blank"
                  variant="contained"
                  color="primary"
                  data-testid="view-app-btn"
                >
                  View Our Job Board              
            </Button>        
            </Grid>
    </Grid>
    )
}
  
export default OpportunitiesPeak;
  