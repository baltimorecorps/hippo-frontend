import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ProgramCard from './ProgramCard'

function Programs() {
    return (
        <Box width={"100%"} mt={3}>
            <Typography color="inherit" align="center" gutterBottom variant="h3" component="h3">
                OUR PROGRAMS
            </Typography>

            <Grid container justify="center">
                <Grid item xs={9} md={3}>
                    <ProgramCard />
                </Grid>
                <Grid item xs={9} md={3}>
                    <ProgramCard />
                </Grid>
                <Grid item xs={9} md={3}>
                    <ProgramCard />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Programs