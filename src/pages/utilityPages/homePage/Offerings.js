import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ProgramCard from './OfferingCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main: {
        marginTop: 0,
        padding: "1rem 1rem 2rem 1rem"
    },
    title: {
        fontSize: "20px",
        margin: "5px",
        '@media only screen and (min-width: 600px)': {
            fontSize: "30px",
            margin: "18px"
        },
        '@media only screen and (min-width: 960px)': {
            fontSize: "35px",
            margin: "20px"
        },
    }
})

function Offerings() {
    const styles = useStyles()
    return (
        <Box width={"100%"} mt={3} bgcolor="primary.main" className={styles.main}>
            <Typography color="inherit" align="center" gutterBottom variant="h5" component="h2" className={styles.title}>
                Place for Purpose Offers
            </Typography>

            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <ProgramCard 
                        image='/images/offerings/offering-1.jpg' 
                        title='Meaningful Opportunities' 
                        text='We curate meaningful, mission-driven positions within the social sector!' 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <ProgramCard 
                        image='/images/offerings/offering-2.jpg' 
                        title='A Hiring Partner' 
                        text='We commit to working closely with our partners - we’re on your team!' 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <ProgramCard 
                        image='/images/offerings/offering-3.jpg' 
                        title='Equity Collaborator' 
                        text='Equity and inclusion are at the heart of everything we do!' 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
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