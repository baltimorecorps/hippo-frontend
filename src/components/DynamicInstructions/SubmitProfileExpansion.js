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
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

import {dynamicInstructionLabels} from './defaultValues';
import get from 'lodash.get';

const SubmitProfileExpansion = ({instructions, classes}) => {
  const isCompletedAboutMe = get(instructions, 'about_me.is_complete', false);
  const isCompletedProfile = get(instructions, 'profile.is_complete', false);
  const aboutMeValues = get(instructions, 'about_me.components', false);
  const experienceValues = get(instructions, 'profile.components', false);

  const aboutMeChecks = [];
  Object.entries(dynamicInstructionLabels.about_me).forEach(
    ([labelKey, labelName]) =>
      Object.entries(aboutMeValues).forEach(([apiKey, apiValue]) => {
        if (apiKey === labelKey)
          aboutMeChecks.push({content: labelName, checked: apiValue});
      })
  );

  const experienceChecks = [];
  Object.entries(dynamicInstructionLabels.profile).forEach(
    ([labelKey, labelName]) =>
      Object.entries(experienceValues).forEach(([apiKey, apiValue]) => {
        if (apiKey === labelKey) {
          if (apiKey === 'add_experience') {
            experienceChecks.push({
              content: labelName.is_complete,
              checked: apiValue.is_complete,
              components: [
                {
                  content: labelName.components.add_achievements,
                  checked: apiValue.components.add_achievements,
                },
                {
                  content: labelName.components.tag_skills,
                  checked: apiValue.components.tag_skills,
                },
              ],
            });
          } else {
            experienceChecks.push({content: labelName, checked: apiValue});
          }
        }
      })
  );

  const afterSubmitHelpText =
    '* After you submit your profile, our staff will review your value alignment and profile to determine your eligibility for Place for Purpose.  If/once you are approved, you will receive an email communication of your acceptance.  Also, the email will provide you with a link to schedule your consultation and watch the “Place for Purpose How to Apply.”  Scheduling the consultation and watching the video tutorial is required to  access the job portal to apply for opportunities. ';

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
          {aboutMeChecks.map((option, index) => (
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
          {experienceChecks.map((option, index) => (
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
              {option.components &&
                option.components.map((subOption, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        style={{
                          color: subOption.checked ? '#2f5be0' : '#c7c7c7',
                        }}
                        checked={subOption.checked}
                        name={subOption.content}
                        checkedIcon={<CheckCircleIcon />}
                        icon={<CheckCircleOutlinedIcon />}
                      />
                    }
                    className={classes.subCheckbox}
                    label={subOption.content}
                  />
                ))}
            </React.Fragment>
          ))}
        </div>
        <Button
          variant="contained"
          // onClick={onSubmit}
          align="end"
          className={classes.submitButton}
          disabled={!isCompletedAboutMe || !isCompletedProfile ? true : false}
        >
          Submit profile for review
        </Button>
        <Typography variant="body2" component="p" className={classes.helpText}>
          {afterSubmitHelpText}
        </Typography>
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
    marginLeft: '55px',
  },
  checkbox: {
    width: '100%',
    textAlign: 'left',
    [breakpoints.up('md')]: {
      marginLeft: '20px',
    },
  },
  subCheckbox: {
    marginLeft: '55px',
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
  helpText: {
    color: 'grey',
    fontSize: '13px',
    margin: '10px 20px',
    textAlign: 'justify',
    textIndent: '25px',
  },
});

export default withStyles(styles)(SubmitProfileExpansion);
