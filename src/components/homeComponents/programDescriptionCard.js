import React from 'react'
import Typography from '@material-ui/core/Typography'

function ProgramDescriptionCard(props) {
    return (
        <>
        <Typography
            gutterBottom
            variant="h4"
            component="h1"
            // className={classes.pageHeader}
        >                    
            {props.title}
        </Typography>
        <Typography
            gutterBottom
            // className={classes.bcCopy}
            variant="body1"
            component="p"
            style={{ maxWidth:'80%'}}
        >                    
            {props.description}
        </Typography>
        </>
    )
}

export default ProgramDescriptionCard