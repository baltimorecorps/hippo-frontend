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
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

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
          aboutMeChecks.push({
            content: labelName.content,
            checked: apiValue,
            helpText: labelName.helpText || null,
          });
      })
  );

  const experienceChecks = [];
  Object.entries(dynamicInstructionLabels.profile).forEach(
    ([labelKey, labelName]) =>
      Object.entries(experienceValues).forEach(([apiKey, apiValue]) => {
        if (apiKey === labelKey) {
          if (apiKey === 'add_experience') {
            experienceChecks.push({
              content: labelName.is_complete.content,
              checked: apiValue.is_complete,
              helpText: labelName.is_complete.helpText,

              components: [
                {
                  content: labelName.components.add_achievements.content,
                  checked: apiValue.components.add_achievements.content,
                  helpText: labelName.components.add_achievements.helpText,
                },
                {
                  content: labelName.components.tag_skills.content,
                  checked: apiValue.components.tag_skills.content,
                  helpText: labelName.components.tag_skills.helpText,
                },
              ],
            });
          } else {
            experienceChecks.push({
              content: labelName.content,
              checked: apiValue,
              helpText: labelName.helpText,
            });
          }
        }
      })
  );

  const afterSubmitHelpText =
    '* After you submit your profile, our staff will review your value alignment and profile to determine your eligibility for Place for Purpose.  If/once you are approved, you will receive an email communication of your acceptance.  Also, the email will provide you with a link to schedule your consultation and watch the “Place for Purpose How to Apply.”  Scheduling the consultation and watching the video tutorial is required to  access the job portal to apply for opportunities. ';

  const helpTextToolTips = (option, index, isSubContent) => {
    return (
      <Typography
        variant="body1"
        component="p"
        className={isSubContent ? classes.subContent : classes.content}
        key={index || null}
      >
        {option.content}{' '}
        {option.helpText && (
          <Tooltip
            title={
              <Typography style={{fontSize: '14px'}}>
                {option.helpText}
              </Typography>
            }
            placement="right"
          >
            <IconButton aria-label={option.helpText} style={{padding: '3px'}}>
              <InfoIcon className={classes.infoIcon} />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
    );
  };

  const checkboxesWithToolTips = listOfOptions => {
    return listOfOptions.map((option, index) => (
      <React.Fragment key={index}>
        <FormControlLabel
          control={
            <Checkbox
              style={{
                color: option.checked ? '#2f5be0' : '#c7c7c7',
              }}
              checked={option.checked}
              name={option.content}
              checkedIcon={
                <CheckCircleIcon style={{padding: '0px', margin: 0}} />
              }
              icon={<CheckCircleOutlinedIcon />}
            />
          }
          className={classes.checkbox}
          label={helpTextToolTips(option)}
        />{' '}
        {option.components &&
          option.components.map((subOption, index) =>
            helpTextToolTips(subOption, index, true)
          )}
      </React.Fragment>
    ));
  };

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
          {checkboxesWithToolTips(aboutMeChecks)}
        </div>
        <Typography variant="body1" component="h3" className={classes.steps}>
          <span className={classes.stepNum}>Step 2:</span> Complete your profile
          by filling out the sections below
        </Typography>
        <div className={classes.checkboxesContainer}>
          {checkboxesWithToolTips(experienceChecks)}
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
        <Typography
          variant="body2"
          component="p"
          className={classes.afterSubmitHelpText}
        >
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
    // display: 'inline',
    textAlign: 'left',
    [breakpoints.up('md')]: {
      marginLeft: '20px',
    },
  },
  subContent: {
    marginLeft: '45px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  arrowRightIcon: {
    fontSize: '18px',
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
  afterSubmitHelpText: {
    color: 'grey',
    fontSize: '13px',
    margin: '15px 20px 5px 20px',
    textAlign: 'justify',
    textIndent: '25px',
  },
  infoIcon: {
    // marginLeft: '7px',
    color: '#c4c4c4',
    fontSize: '26px',
    padding: '5px',
    // verticalAlign: 'bottom',
    // alignItems: 'center',
  },
});

export default withStyles(styles)(SubmitProfileExpansion);
