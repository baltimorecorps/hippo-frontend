import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography style={{width:'80%', margin: 'auto 0'}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '35vh',
    margin: '3% 0',
    padding:'1.5%'
  },
  pageHeader:{
      alignSelf: 'center'
  }
});

const ProgramDescriptions =()=>{
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
         {/* <Typography
                    gutterBottom
                    variant="h6"
                    component="h1"
                    className={classes.pageHeader}
                    >
                    Our Programs
                    </Typography> */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Mayoral Fellowship Opportunities" {...a11yProps(0)} />
        <Tab label="Place for Purpose Opportunities" {...a11yProps(1)} />
        <Tab label="Fellowship Opportunities" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
      The Mayoral Fellowship is an opportunity that provides a 10-week, full-time, placement in a mayoral office or Baltimore City agency. Placements are based on the Fellow’s background and interests, coupled with the needs of city agencies and departments. 
      </TabPanel>
      <TabPanel value={value} index={1}>
      Place for Purpose connects professionals to meaningful employment within the social sector. What separates Place for Purpose from other job sites is the human interaction from our team throughout the process. Consultations provide an additional layer of support for candidates in their job search. In understanding your professional goals, we are able to encourage you to apply for positions that are the best fit for your skills, experience, and values.
      </TabPanel>
      <TabPanel value={value} index={2}>
      The Baltimore Corps Fellowship is our flagship program. Our Fellowship places candidates in social impact careers, alongside an intensive year-long, cohort based program designed to provide professional development, networking, collaboration, and equity and racial justice training.  
      </TabPanel>
    </Paper>
  );
}

export default ProgramDescriptions