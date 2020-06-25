import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import BasicInfoForm from './BasicInfoForm';
import DemographicForm from './DemographicForm';
import InterestsAndGoalsForm from './InterestsAndGoalsForm';
import ProgramsAndEligibilityForm from './ProgramsAndEligibilityForm';

const AboutMeForms = ({contact, onSubmit, onCloseForm, classes}) => {
  return (
    <Grid container justify="center">
      <BasicInfoForm
        contact={contact}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
      <InterestsAndGoalsForm
        contact={contact}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
      <ProgramsAndEligibilityForm
        contact={contact}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
      <DemographicForm
        contact={contact}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
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
