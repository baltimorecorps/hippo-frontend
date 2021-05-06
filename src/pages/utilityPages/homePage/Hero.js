import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const styles = {
    box: {
        backgroundImage: "url(/images/unity.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "100vh",
    },
    opaque: {
        content: "",
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        border: "5px solid red"
    },
    contents: {
        background: "#fafafa",
        opacity: "0.7"
    }
}

function Hero() {
    return (
        <Box style={styles.box}>
            <Box style={styles.opaque}></Box>
            <Grid container justify="center" style={styles.contents}>
                <Grid item xs={10} sm={10} md={8} lg={6} xl={4}>
                    <Typography color="inherit" align="center" gutterBottom variant="h2" component="h2">
                        PLACE FOR PURPOSE
                    </Typography>

                    <Typography color="inherit" align="center" gutterBottom variant="body1" component="p">
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
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Hero