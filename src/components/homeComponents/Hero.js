import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import LoginAction from './logIn'


const styles = {
    box: {
        backgroundImage: 'url(/images/pfphero.jpg)',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    opaque: {
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        background: 'linear-gradient(177deg, rgba(223,232,227,0.42620798319327735) 0%, rgba(219,233,248,1) 100%)'


    },
    contents: {
        background: "#fafafa",
        opacity: "0.85",
        padding: "2rem 0",
        height:'auto',
        margin: '5% auto',
        // border:'solid yellow'
    }
  
}

function Hero() {
    return (
        <Box style={styles.box} mt={-2}>
            <Box style={styles.opaque}> </Box>
            <Grid container justify="center" style={styles.contents}>
                <Grid item xs={10} sm={10} md={8} lg={6} xl={4}>
                    <Typography color="inherit" align="center" gutterBottom variant="h2" component="h2">
                        PLACE FOR PURPOSE
                    </Typography>

                    <Typography color="inherit" align="center" gutterBottom variant="body1" component="p" style={{width:'80%'}}>
                        connects talented community members interested in employment in the social impact sector with organizations committed to equity and racial justice.
                    </Typography>

                    <Box align="center" mt={2}>
                        {/* <LoginAction text={'Log in / Sign up'}/> */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Hero