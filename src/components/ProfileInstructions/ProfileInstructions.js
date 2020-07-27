import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ProfileInstructions = ({classes}) => {
  const AboutMeSteps = [
    {content: 'Contact information (Address)', checked: true},
    {content: 'Value alignment', checked: false},
    {content: 'Programs and eligibility', checked: true},
    {content: 'Interests and goals', checked: false},
    {content: 'Demographic questions (optional)', checked: false},
  ];
  const ExperienceSteps = [
    {content: 'Add skills', checked: true},
    {content: 'Add all relevant experience', checked: false},
    {content: 'Add education, certificates, or training', checked: true},
    {content: 'Add portfolio or work products (optional)', checked: false},
  ];
  return (
    <Paper className={classes.instructions}>
      <div className={classes.headerContainer}>
        <Typography
          variant="h5"
          component="h1"
          style={{
            fontWeight: '700',
          }}
        >
          Instructions
        </Typography>
      </div>

      <ExpansionPanel defaultExpanded={true} className={classes.expansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.expansionHeader}
        >
          <Typography className={classes.expansionHeaderText}>
            Submit Your Profile
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionDetails}>
          <Typography variant="body1" component="h3" className={classes.steps}>
            <span className={classes.stepNum}>Step 1:</span> Complete About Me
            section.
          </Typography>
          <div className={classes.checkboxesContainer}>
            {AboutMeSteps.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    // style={{
                    //   color: '#3fbd33',
                    // }}
                    checked={option.checked}
                    name={option.content}
                  />
                }
                className={classes.checkbox}
                label={option.content}
              />
            ))}
          </div>
          <Typography variant="body1" component="h3" className={classes.steps}>
            <span className={classes.stepNum}>Step 2:</span> Complete your
            profile by filling out the sections below.
          </Typography>
          <div className={classes.checkboxesContainer}>
            {ExperienceSteps.map((option, index) => (
              <React.Fragment key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      // style={{
                      //   color: '#3fbd33',
                      // }}
                      checked={option.checked}
                      name={option.content}
                    />
                  }
                  className={classes.checkbox}
                  label={option.content}
                />
                {option.content === 'Add all relevant experience' && (
                  <div>
                    <Typography
                      variant="body1"
                      component="h3"
                      className={classes.list}
                    >
                      <span className={classes.listSymbol}>✵</span> Add
                      responsibilities
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h3"
                      className={classes.list}
                    >
                      <span className={classes.listSymbol}>✵</span> Tag skills
                      to each experience under responsibilities
                    </Typography>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            // onClick={onSubmit}
            align="end"
            className={classes.submitButton}
            disabled
          >
            Submit profile for review
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  instructions: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(2, 3, 3),
    paddingBottom: spacing(3),
    marginTop: spacing(5),
    [breakpoints.down('sm')]: {
      margin: spacing(0.2),
      width: '100%',
    },
  },
  expansionPanel: {
    backgroundColor: '#f2f2f2',
  },
  expansionHeader: {
    backgroundColor: '#d9d9d9',
  },
  expansionHeaderText: {
    fontWeight: '500',
    fontSize: '18px',
  },
  expansionDetails: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f1f1f1',
  },
  headerContainer: {
    // paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  steps: {
    // fontSize: '17px',
  },
  stepNum: {
    marginRight: '3px',
  },

  checkboxesContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '10px',
  },
  checkbox: {
    width: '100%',
    textAlign: 'left',
    [breakpoints.up('md')]: {
      marginLeft: '20px',
    },
  },
  list: {
    marginLeft: '60px',
    marginBottom: '5px',
  },
  listSymbol: {marginRight: '5px', fontSize: '18px'},
  submitButton: {
    alignSelf: 'center',
  },
});

export default withStyles(styles)(ProfileInstructions);
