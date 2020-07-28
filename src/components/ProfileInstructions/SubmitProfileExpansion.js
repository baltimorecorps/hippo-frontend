import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

const SubmitProfileExpansion = ({classes}) => {
  const AboutMeSteps = [
    {
      content: 'Candidate information: address and demographic info (optional)',
      checked: true,
    },
    {content: 'Programs and eligibility', checked: true},
    {content: 'Interests and goals', checked: false},
    {content: 'Value alignment', checked: false},

    // {content: 'Demographic questions (optional)', checked: false},
  ];
  const ExperienceSteps = [
    {content: 'Add skills', checked: true},
    {content: 'Add all relevant experience', checked: false},
    {content: 'Add education, certificates, or training', checked: true},
    {content: 'Add portfolio or work products (optional)', checked: false},
  ];

  return (
    <ExpansionPanel defaultExpanded={true} className={classes.expansionPanel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.expansionHeader}
      >
        <Typography className={classes.expansionHeaderText}>
          <AccountCircleSharpIcon className={classes.headerIcon} /> Complete and
          Submit Your Profile
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionDetails}>
        <Typography variant="body1" component="h3" className={classes.steps}>
          <span className={classes.stepNum}>Step 1:</span> Complete About Me
          section
        </Typography>
        <div className={classes.checkboxesContainer}>
          {AboutMeSteps.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  style={{
                    color: option.checked ? '#2f5be0' : '#c7c7c7',
                  }}
                  checked={option.checked}
                  name={option.content}
                  checkedIcon={<CheckCircleIcon />}
                  icon={<CheckCircleOutlinedIcon />}
                />
              }
              className={classes.checkbox}
              label={option.content}
            />
          ))}
        </div>
        <Typography variant="body1" component="h3" className={classes.steps}>
          <span className={classes.stepNum}>Step 2:</span> Complete your profile
          by filling out the sections below
        </Typography>
        <div className={classes.checkboxesContainer}>
          {ExperienceSteps.map((option, index) => (
            <React.Fragment key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{
                      color: option.checked ? '#2f5be0' : '#c7c7c7',
                    }}
                    checked={option.checked}
                    name={option.content}
                    checkedIcon={<CheckCircleIcon />}
                    icon={<CheckCircleOutlinedIcon />}
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
                    <ArrowForwardIosOutlinedIcon
                      className={classes.listSymbol}
                    />
                    Add responsibilities
                  </Typography>
                  <Typography
                    variant="body1"
                    component="h3"
                    className={classes.list}
                  >
                    <ArrowForwardIosOutlinedIcon
                      className={classes.listSymbol}
                    />
                    Tag skills to each experience under responsibilities
                  </Typography>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <Button
          variant="contained"
          //   color="primary"
          // onClick={onSubmit}
          align="end"
          className={classes.submitButton}
          disabled
        >
          Submit profile for review
        </Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  expansionPanel: {
    backgroundColor: '#f5f5f5',
  },
  expansionHeader: {
    backgroundColor: '#f5f5f5',
  },
  headerIcon: {
    marginRight: '10px',
    fontSize: '28px',
  },
  expansionHeaderText: {
    fontWeight: '500',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
  },
  expansionDetails: {
    padding: '20px 30px',

    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
    display: 'flex',
    justifyContent: 'space-between',
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
    display: 'flex',
    alignItems: 'center',
  },
  listSymbol: {margin: '0px 5px 0px 8px', fontSize: '16px'},

  submitButton: {
    marginTop: '8px',
    fontSize: '16px',
    alignSelf: 'center',
    padding: '7px 20px',
    backgroundColor: '#2858eb',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1846d9',
    },
  },
});

export default withStyles(styles)(SubmitProfileExpansion);
