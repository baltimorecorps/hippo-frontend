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
import InterestsAndGoalsDisplay from './defaultDisplays/InterestsAndGoalsDisplay';
import ProgramsAndEligibilityForm from './forms/ProgramsAndEligibilityForm';
import ProgramsAndEligibilityDisplay from './defaultDisplays/ProgramsAndEligibilityDisplay';

const AboutMeForms = ({
  contact,
  onSubmit,
  onCloseAllForms,
  onClickEdit,
  classes,
}) => {
  const email = contact.email_primary ? contact.email_primary.email : '';

  const [openContactInfoForm, setOpenContactInfoForm] = useState(false);
  const [openInterestsGoalsForm, setOpenInterestsGoalsForm] = useState(false);
  const [
    openProgramsEligibilityForm,
    setOpenProgramsEligibilityForm,
  ] = useState(false);
  const [openDemographicForm, setOpenDemographicForm] = useState(false);
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
            Contact Information
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {openContactInfoForm ? (
            <ContactInfoForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() => setOpenContactInfoForm(false)}
            />
          ) : (
            <div className={classes.extraPadding}>
              <ContactInfoDisplay
                firstName={contact.first_name}
                lastName={contact.last_name}
                email={email}
                phone={contact.phone_primary}
                onClickEdit={() => setOpenContactInfoForm(true)}
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
          {openInterestsGoalsForm ? (
            <InterestsAndGoalsForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() => setOpenInterestsGoalsForm(false)}
            />
          ) : (
            <div className={classes.extraPadding}>
              <InterestsAndGoalsDisplay
                contact={contact}
                onClickEdit={() => setOpenInterestsGoalsForm(true)}
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
          {openProgramsEligibilityForm ? (
            <ProgramsAndEligibilityForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() => setOpenProgramsEligibilityForm(false)}
            />
          ) : (
            <div className={classes.extraPadding}>
              <ProgramsAndEligibilityDisplay
                contact={contact}
                onClickEdit={() => setOpenProgramsEligibilityForm(true)}
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
          {openDemographicForm ? (
            <DemographicForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() => setOpenDemographicForm(false)}
            />
          ) : (
            <div className={classes.extraPadding}>
              <DemographicDisplay
                contact={contact}
                onClickEdit={() => setOpenDemographicForm(true)}
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
