import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import {useHistory} from 'react-router-dom';

import {dynamicInstructionContents} from './defaultValues';
import get from 'lodash.get';
import CheckboxesWithToolTips from './CheckboxesWithToolTips';

const SubmitProfileExpansion = ({
  instructions,
  status,
  onSubmit,
  isExpanded,
  setOpenAboutMeSection,
  openAboutMeForms,
  setOpenAboutMeForms,
  classes,
}) => {
  const isCompletedAboutMe = get(instructions, 'about_me.is_complete', false);
  const isCompletedProfile = get(instructions, 'profile.is_complete', false);
  const aboutMeValues = get(instructions, 'about_me.components', false);
  const experienceValues = get(instructions, 'profile.components', false);
  let history = useHistory();

  const aboutMeChecks = [];
  Object.entries(dynamicInstructionContents.about_me).forEach(
    ([labelKey, labelName]) =>
      Object.entries(aboutMeValues).forEach(([apiKey, apiValue]) => {
        if (apiKey === labelKey)
          aboutMeChecks.push({
            content: labelName.content,
            checked: apiValue,
            helpText: labelName.helpText || null,
            scrollToThisForm: '#about-me-section',
            setOpenThisForm: () => {
              setOpenAboutMeSection(true);
              setOpenAboutMeForms({
                ...openAboutMeForms,
                [apiKey]: true,
              });
            },
          });
      })
  );

  const sectionIds = {
    tag_skills: '#skills-section',
    add_experience: '#work-section',
    add_education: '#education-section',
    add_portfolio: '#portfolio-section',
  };

  const experienceChecks = [];
  Object.entries(dynamicInstructionContents.profile).forEach(
    ([labelKey, labelName]) =>
      Object.entries(experienceValues).forEach(([apiKey, apiValue]) => {
        if (apiKey === labelKey) {
          if (apiKey === 'add_experience') {
            experienceChecks.push({
              content: labelName.is_complete.content,
              checked: apiValue.is_complete,
              helpText: labelName.is_complete.helpText,
              scrollToThisForm: sectionIds[apiKey],
              components: Object.entries(labelName.components).map(
                ([key, value]) => {
                  const components = {};
                  Object.values(apiValue.components).forEach(apiComponent => {
                    components.content = value.content;
                    components.checked = apiComponent[key];
                    components.helpText = value.helpText;
                  });
                  return components;
                }
              ),
            });
          } else {
            experienceChecks.push({
              content: labelName.content,
              checked: apiValue,
              helpText: labelName.helpText,
              scrollToThisForm: sectionIds[apiKey],
            });
          }
        }
      })
  );

  const afterSubmitHelpText =
    '* After you submit your profile, our staff will review your value alignment and profile to determine your eligibility for Place for Purpose.  If/once you are approved, you will receive an email communication of your acceptance.  Also, the email will provide you with a link to schedule your consultation and watch the “Place for Purpose How to Apply.”  Scheduling the consultation and watching the video tutorial is required to  access the job portal to apply for opportunities. ';

  let isDisabledSubmitButton = true;
  let submitButtonText = 'Submit profile for review';

  if (status === 'created' && isCompletedAboutMe && isCompletedProfile) {
    isDisabledSubmitButton = false;
  } else if (status === 'submitted') {
    submitButtonText = 'Waiting for review';
  }

  const handleSubmit = () => {
    console.log('submit profile for review');
    onSubmit();
  };

  const applyForRoles = () => {
    history.push(`/opportunities/`);
  };
  return (
    <ExpansionPanel
      defaultExpanded={isExpanded}
      className={classes.expansionPanel}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.expansionHeader}
        data-testid="submit-profile-header"
      >
        <Typography className={classes.expansionHeaderText}>
          <AccountCircleSharpIcon className={classes.headerIcon} /> Complete and
          Submit Your Profile{' '}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionDetails}>
        <a href="#about-me-section" onClick={() => setOpenAboutMeSection(true)}>
          <Typography
            variant="body1"
            component="h3"
            className={classes.stepText}
          >
            <span className={classes.stepNum}>Step 1:</span> Complete About Me
            section{' '}
            {instructions.about_me.is_complete === false && (
              <span style={{color: 'red'}}> *</span>
            )}
          </Typography>
        </a>

        <div className={classes.checkboxesContainer}>
          <CheckboxesWithToolTips listOfOptions={aboutMeChecks} />
        </div>
        <Typography variant="body1" component="h3" className={classes.stepText}>
          <span className={classes.stepNum}>Step 2:</span> Complete your profile
          by filling out the sections below{' '}
          {instructions.profile.is_complete === false && (
            <span style={{color: 'red'}}> *</span>
          )}
        </Typography>
        <div className={classes.checkboxesContainer}>
          <CheckboxesWithToolTips listOfOptions={experienceChecks} />
        </div>
        {status === 'approved' ? (
          <Button
            variant="contained"
            onClick={applyForRoles}
            className={classes.submitButton}
            data-testid="apply-roles-button"
          >
            Start applying for roles
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            className={classes.submitButton}
            disabled={isDisabledSubmitButton}
            data-testid="submit-button"
          >
            {submitButtonText}
          </Button>
        )}
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
    fontSize: '24px',
    [breakpoints.up('sm')]: {
      fontSize: '28px',
    },
  },
  expansionHeaderText: {
    fontWeight: '500',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  expansionDetails: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '10px 25px 10px 25px',
    [breakpoints.up('sm')]: {
      padding: '20px 30px',
    },
  },
  headerContainer: {
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  stepText: {
    fontSize: '15px',
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
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
    [breakpoints.up('sm')]: {
      marginLeft: '55px',
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
  afterSubmitHelpText: {
    color: 'grey',
    fontSize: '13px',
    margin: '10px 10px 5px 10px',
    textAlign: 'justify',
    [breakpoints.up('sm')]: {
      textIndent: '25px',
      margin: '15px 20px 5px 20px',
    },
  },
});

export default withStyles(styles)(SubmitProfileExpansion);
