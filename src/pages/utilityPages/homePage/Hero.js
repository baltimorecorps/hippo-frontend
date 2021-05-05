import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function Hero() {
    return (
        <Grid container>
            <Grid item>
                <Typography color="inherit" align="center" variant="h2">
                    PLACE FOR PURPOSE
                </Typography>

                <Typography color="inherit" align="center" variant="h5">
                    is a service that connects talented community members facing challenges finding employment in the social impact sector with organizations that have taken an internal and external commitment to equity and racial justice.
                </Typography>

                <Typography color="inherit" align="center" variant="h5">
                Create an account or log in to create a Baltimore Corps community profile. Get access to job opportunities and development opportunities in the Baltimore Corps network.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    // onClick={onClickLogInHandler}
                    >
                    Log in / Sign up
                </Button>
            </Grid>
        </Grid>
    )
}

export default Hero