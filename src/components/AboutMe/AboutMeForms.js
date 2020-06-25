import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BasicInfoForm from './BasicInfoForm';
import DemographicForm from './DemographicForm';
import InterestsAndGoalsForm from './InterestsAndGoalsForm';
import ProgramsAndEligibilityForm from './ProgramsAndEligibilityForm';

const AboutMeForms = ({contact, onSubmit, onCloseForm, classes}) => {
  return (
    <Grid container justify="center">
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Contact Information
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <BasicInfoForm
            contact={contact}
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Interests and Goals
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <InterestsAndGoalsForm
            contact={contact}
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Programs and Eligibility
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ProgramsAndEligibilityForm
            contact={contact}
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Demographic Information
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <DemographicForm
            contact={contact}
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
};

AboutMeForms.propTypes = {
  contact: PropTypes.object.isRequired,
  //   lastName: PropTypes.string.isRequired,
  //   email: PropTypes.string,
  //   phone: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({});

export default withStyles(styles)(AboutMeForms);
