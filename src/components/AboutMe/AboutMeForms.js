import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import ContactInfoDisplay from './defaultDisplays/ContactInfoDisplay';
import ContactInfoForm from './forms/ContactInfoForm';
import InterestsAndGoalsForm from './forms/InterestsAndGoalsForm';
import ValueAlignmentForm from './forms/ValueAlignmentForm';
import ValueAlignmentDisplay from './defaultDisplays/ValueAlignmentDisplay';
import InterestsAndGoalsDisplay from './defaultDisplays/InterestsAndGoalsDisplay';
import ProgramsAndEligibilityForm from './forms/ProgramsAndEligibilityForm.container';
import ProgramsAndEligibilityDisplay from './defaultDisplays/ProgramsAndEligibilityDisplay';
import EachExpansionPanel from './EachExpansionPanel';

const AboutMeForms = ({contact, onSubmit, classes}) => {
  const [openForms, setOpenForms] = useState({
    contact_info: false,
    value_alignment: false,
    interests_goals: false,
    programs_eligibility: false,
    demographic_info: false,
  });
  return (
    <Grid container justify="center" style={{width: '100%'}}>
      <EachExpansionPanel
        PanelTextHeader="Candidate Information"
        content={
          openForms.contact_info ? (
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
          )
        }
      />

      <EachExpansionPanel
        PanelTextHeader="Value Alignments"
        content={
          openForms.value_alignment ? (
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
                contact={contact}
                onClickEdit={() =>
                  setOpenForms({...openForms, value_alignment: true})
                }
              />
            </div>
          )
        }
      />

      <EachExpansionPanel
        PanelTextHeader="Interests and Goals"
        content={
          openForms.interests_goals ? (
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
                contact={contact}
                onClickEdit={() =>
                  setOpenForms({...openForms, interests_goals: true})
                }
              />
            </div>
          )
        }
      />

      <EachExpansionPanel
        PanelTextHeader="Programs and Eligibility"
        content={
          openForms.programs_eligibility ? (
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
          )
        }
      />
    </Grid>
  );
};

AboutMeForms.propTypes = {
  contact: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  extraPadding: {
    width: '100%',
    padding: '10px 30px 0px 30px',
  },
});

export default withStyles(styles)(AboutMeForms);
