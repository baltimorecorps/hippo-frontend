import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import ContactInfoForm from '../AboutMe/forms/ContactInfoForm';
import DemographicForm from '../AboutMe/forms/DemographicForm';
import InterestsAndGoalsForm from '../AboutMe/forms/InterestsAndGoalsForm';
import ProgramsAndEligibilityForm from '../AboutMe/forms/ProgramsAndEligibilityForm';

import mockData from '../AboutMe/mockData';
import mockDataEmpty from '../AboutMe/mockDataEmpty';

const AboutMeForms = ({
  // contact,
  onSubmit,
  onCloseAllForms,
  onClickEdit,
  classes,
}) => {
  // const contact = mockData;
  const contact = mockDataEmpty;
  const email = contact.email_primary ? contact.email_primary.email : '';

  const [openForms, setOpenForms] = useState({
    contact_info: false,
    interests_goals: false,
    programs_eligibility: false,
    demographic_info: false,
  });
  return (
    <Grid container justify="center">
      <ContactInfoForm contact={contact} onSubmit={onSubmit} />
      <InterestsAndGoalsForm profile={contact.profile} onSubmit={onSubmit} />
      <DemographicForm profile={contact.profile} onSubmit={onSubmit} />
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
