import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ContactInfoDisplay from './defaultDisplays/ContactInfoDisplay';
import ContactInfoForm from './forms/ContactInfoForm';
import DemographicForm from './forms/DemographicForm';
import DemographicDisplay from './defaultDisplays/DemographicDisplay';
import InterestsAndGoalsForm from './forms/InterestsAndGoalsForm';
import ValueAlignmentForm from './forms/ValueAlignmentForm';
import ValueAlignmentDisplay from './defaultDisplays/ValueAlignmentDisplay';
import InterestsAndGoalsDisplay from './defaultDisplays/InterestsAndGoalsDisplay';
import ProgramsAndEligibilityForm from './forms/ProgramsAndEligibilityForm.container';
import ProgramsAndEligibilityDisplay from './defaultDisplays/ProgramsAndEligibilityDisplay';

import mockData from './mockData';
import mockDataEmpty from './mockDataEmpty';

const AboutMeForms = ({
  // contact,
  onSubmit,
  onCloseAllForms,
  onClickEdit,
  classes,
}) => {
  const contact = mockData;
  // const contact = mockDataEmpty;

  const [openForms, setOpenForms] = useState({
    contact_info: false,
    value_alignment: false,
    interests_goals: false,
    programs_eligibility: false,
    demographic_info: false,
  });
  return (
    <Grid container justify="center" style={{width: '100%'}}>
      <ExpansionPanel defaultExpanded={true} className={classes.expansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.header}
        >
          <Typography className={classes.headerText}>
            Candidate Information
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {openForms.contact_info ? (
            <ContactInfoForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenForms({...openForms, contact_info: false})
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <ContactInfoDisplay
                contact={contact}
                isOnEditMode={true}
                onClickEdit={() =>
                  setOpenForms({...openForms, contact_info: true})
                }
              />
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={true} className={classes.expansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.header}
        >
          <Typography className={classes.headerText}>
            Interests and Goals
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {openForms.interests_goals ? (
            <InterestsAndGoalsForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenForms({...openForms, interests_goals: false})
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <InterestsAndGoalsDisplay
                profile={contact.profile}
                onClickEdit={() =>
                  setOpenForms({...openForms, interests_goals: true})
                }
              />
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={true} className={classes.expansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.header}
        >
          <Typography className={classes.headerText}>
            Value Alignment
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {openForms.value_alignment ? (
            <ValueAlignmentForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenForms({...openForms, value_alignment: false})
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <ValueAlignmentDisplay
                profile={contact.profile}
                onClickEdit={() =>
                  setOpenForms({...openForms, value_alignment: true})
                }
              />
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={true} className={classes.expansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.header}
        >
          <Typography className={classes.headerText}>
            Programs and Eligibility
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {openForms.programs_eligibility ? (
            <ProgramsAndEligibilityForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenForms({...openForms, programs_eligibility: false})
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <ProgramsAndEligibilityDisplay
                contact={contact}
                onClickEdit={() =>
                  setOpenForms({...openForms, programs_eligibility: true})
                }
              />
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={true} className={classes.expansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.header}
        >
          <Typography className={classes.headerText}>
            Demographic Information
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {openForms.demographic_info ? (
            <DemographicForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenForms({...openForms, demographic_info: false})
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <DemographicDisplay
                contactId={contact.id}
                profile={contact.profile}
                onClickEdit={() =>
                  setOpenForms({...openForms, demographic_info: true})
                }
              />
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
};

AboutMeForms.propTypes = {
  contact: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseAllForms: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  expansionPanel: {
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(1),
    width: '100%',
  },
  header: {
    backgroundColor: '#d9d9d9',
  },
  extraPadding: {
    width: '100%',
    padding: '10px 30px 0px 30px',
  },
});

export default withStyles(styles)(AboutMeForms);
