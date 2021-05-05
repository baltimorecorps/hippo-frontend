import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function Applying() {
    return (
        <Box width={"100%"} mt={3}>
            <Grid container justify="center">
                <Grid item xs={10} sm={10} md={8} lg={6} xl={4}>
                    <Typography color="inherit" align="center" gutterBottom variant="h3" component="h3">
                        APPLYING FOR A ROLE
                    </Typography>

                    {/* <Typography color="inherit" align="center" gutterBottom variant="body1" component="p">
                        is a service that connects talented community members facing challenges finding employment in the social impact sector with organizations that have taken an internal and external commitment to equity and racial justice.
                    </Typography>

                    <Typography color="inherit" align="center" gutterBottom variant="body2" component="p">
                        Create an account or log in to create a Baltimore Corps community profile. Get access to job opportunities and development opportunities in the Baltimore Corps network.
                    </Typography>

                    <Box align="center" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            // onClick={onClickLogInHandler}
                            >
                            Log in / Sign up
                        </Button>
                    </Box> */}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Applying