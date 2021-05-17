import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Card, Container, Button, Box} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title1: {
      fontSize: "1.4rem",
      lineHeight: "25px",
      textTransform: "uppercase",
      textAlign:'center'
  },
  container:{
      display:"flex",
      padding:'1%',
      alignItems:'center',
      justifyContent:'center',
      width:'80vw'
      
  },
  
  }));


const content=[
    {   name:'Place for Purpose',
        description:'Place for Purpose connects professionals to meaningful employment within the social sector. What separates Place for Purpose from other job sites is the human interaction from our team throughout the process. Consultations provide an additional layer of support for candidates in their job search. In understanding your professional goals, we are able to encourage you to apply for positions that are the best fit for your skills, experience, and values.',
        link_left:'/fellowship',
        link_right:'/mayoral-fellowship',
        link_left_name:'Fellowship',
        link_right_name:'Mayoral Fellowship'
    },
    {   name:'Fellowship',
        description:'The jobs listed here are full time roles with the additional commitment to our 10-month Baltimore Corps Fellowship program. Fellowship programming includes race & equity workshops, online-learning assignments including a Change Recommendation capstone project and presentation, as well as professional development and networking opportunities. Fellows can expect to engage in programming and online-learning for approximately 6 to 8 hours per month.',
        link_left:'/mayoral-fellowship',
        link_right:'/',
        link_left_name:'Mayoral Fellowship',
        link_right_name:'Place for Purpose',


    },
    {   name:'Mayoral Fellowship',
        description:'The Mayoral Fellowship is an opportunity that provides a 10-week, full-time, placement in a mayoral office or Baltimore City agency. Placements are based on the Fellow’s background and interests, coupled with the needs of city agencies and departments.',
        link_left:'/',
        link_right:'/fellowship',
        link_left_name:'Place for Purpose',
        link_right_name:'Fellowship'
        
        }
]

const OpportunitiesNav =({program})=>{
    
 const test = content.filter(prog => prog.name.includes(program))
 console.log(program,test)
    return(
        // <Card>
        //     <Typography
        //     gutterBottom
        //     variant="h4"
        //     component="h1"
        //     className={classes.title1}
        //     color="secondary"
        //     >   
        //     {name} Opportunities 
        //     </Typography>
        //     <Typography
        //       style={{padding: '1%'}}
        //       gutterBottom
        //       variant="body1"
        //       component="p"
        //       align="justify"
        //     >{description}</Typography>
        //     View other opportunities:
        //     <Box>
        //         <Button variant="outlined" color="primary" component={Link} to={link_left}>{link_left_name}</Button>
        //     <Button variant="outlined" color="primary" component={Link} to={link_right}>{link_right_name}</Button>
        //     </Box>

        // </Card>
        <></>
    )
}

export default OpportunitiesNav