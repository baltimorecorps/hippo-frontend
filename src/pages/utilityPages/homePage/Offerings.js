import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ProgramCard from './OfferingCard'

const styles = {
    main: {
        marginTop: 0,
        padding: "1rem 0 2rem 0"
    }
}

function Offerings() {
    return (
        <Box width={"100%"} mt={3} bgcolor="primary.main" style={styles.main}>
            <Typography color="inherit" align="center" gutterBottom variant="h5" component="h2">
                Place for Purpose Offers
            </Typography>

            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <ProgramCard 
                        image='/images/offerings/offering-1.jpg' 
                        title='Meaningful Opportunities' 
                        text='We curate meaningful, mission-driven positions within the social sector!' 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProgramCard 
                        image='/images/offerings/offering-2.jpg' 
                        title='A Hiring Partner' 
                        text='We commit to working closely with our partners - we’re on your team!' 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProgramCard 
                        image='/images/offerings/offering-3.jpg' 
                        title='Equity Collaborator' 
                        text='Equity and inclusion are at the heart of what we do!' 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProgramCard 
                        image='/images/offerings/offering-4.jpg' 
                        title='Value of Time' 
                        text='Our team runs effective and equitable searches every 90 days!' 
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Offerings