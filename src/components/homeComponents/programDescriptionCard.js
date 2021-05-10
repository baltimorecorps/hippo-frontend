import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = {
    title: {
        fontSize: "1rem",
        lineHeight: "25px",
        textTransform: "uppercase"
    },
    underline: {
        width: "50%",
        minWidth: "25rem",
        borderTop: "2px solid #ffcc33"
    },
    desc: {
        width: "80%",
        margin: "1rem 0 2rem 0"
    }
}

function ProgramDescriptionCard(props) {
    return (
        <>
        <Typography
            gutterBottom
            variant="h4"
            component="h1"
            style={styles.title}
            color="primary"
        >                    
            {props.title}
        </Typography>
        <hr style={styles.underline} />
        <Typography
            gutterBottom
            // className={classes.bcCopy}
            variant="body1"
            component="p"
            style={styles.desc}
        >                    
            {props.description}
        </Typography>
        </>
    )
}

export default ProgramDescriptionCard