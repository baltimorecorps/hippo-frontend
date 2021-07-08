import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Card, ButtonGroup, Button, Box} from '@material-ui/core'


const useStyles = makeStyles(({breakpoints, palette, spacing}) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: palette.background.paper,
      border: '2px solid #000',
      padding: spacing(2, 4, 3),
    },
    title1: {
      textAlign: 'center'
    },
    title2: {
      fontSize: "1rem",
      lineHeight: "25px",
      textTransform: "uppercase",
      textAlign:'center'
},
  container:{
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2)
      
  },
 
  
  }));



const OpportunitiesNav =({program})=>{
    const classes = useStyles()
    let name, description,link_left,link_left_name,link_right,link_right_name, email;

    switch (program) {
        default:
            name='Place for Purpose'
            description='Place for Purpose connects professionals to meaningful employment within the social sector. What separates Place for Purpose from other job sites is the human interaction from our team throughout the process. Consultations provide an additional layer of support for candidates in their job search. In understanding your professional goals, we are able to encourage you to apply for positions that are the best fit for your skills, experience, and values.'
            link_left='/opportunities/fellowship'
            link_right='/opportunities/mayoral-fellowship'
            link_left_name='Baltimore Corps Fellowship'
            link_right_name='Mayoral Fellowship'
          break;
        case 'Fellowship':
            name='Baltimore Corps Fellowship'
            description='The jobs listed here are full time roles with the additional commitment to our 10-month Baltimore Corps Fellowship program. Fellowship programming includes race & equity workshops, online-learning assignments including a Change Recommendation capstone project and presentation, as well as professional development and networking opportunities. Fellows can expect to engage in programming and online-learning for approximately 4 to 6 hours per month.'
            link_left='/opportunities/mayoral-fellowship'
            link_right='/opportunities'
            link_left_name='Mayoral Fellowship'
            link_right_name='Place for Purpose'
            email='fellowship@baltimorecorps.org'
            break;
            
        case 'Mayoral Fellowship':
            name='Mayoral Fellowship'
            description='The Mayoral Fellowship is an opportunity that provides a 10-week, full-time, placement in a mayoral office or Baltimore City agency. Placements are based on the Fellow’s background and interests, coupled with the needs of city agencies and departments.'
            link_left='/opportunities/'
            link_right='/opportunities/fellowship'
            link_left_name='Place for Purpose'
            link_right_name='Baltimore Corps Fellowship'
            email=''
        
           }

    return(
        <Card className={classes.container}>
            <Typography
            color="secondary"
            component="h1"
            variant="h5"
            className={classes.title1}
            data-testid="page-header"
            >   
            {name} Opportunities 
            </Typography>
            <Typography
              style={{padding: '1%'}}
              gutterBottom
              variant="body1"
              component="p"
              align="justify"
            >{description}</Typography>
            <Typography
            gutterBottom
            variant="h6"
            component="h1"
            className={classes.title2}
            color="primary"
            >   
            View other opportunities:
            </Typography>
            <Box display='flex' justifyContent='space-evenly' width='80%' margin='0 auto' >
            <ButtonGroup variant="text" color="secondary"         orientation="vertical"
>
            <Button  component={Link} to={link_left}>{link_left_name}</Button>
            <Button  component={Link} to={link_right}>{link_right_name}</Button>
            </ButtonGroup>
            </Box>

        </Card>
    )
}

export default OpportunitiesNav