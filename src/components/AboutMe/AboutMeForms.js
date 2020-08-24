import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import _get from 'lodash.get';
import ContactInfoDisplay from './defaultDisplays/ContactInfoDisplay';
import ContactInfoForm from './forms/ContactInfoForm';
import InterestsAndGoalsForm from './forms/InterestsAndGoalsForm';
import ValueAlignmentForm from './forms/ValueAlignmentForm';
import ValueAlignmentDisplay from './defaultDisplays/ValueAlignmentDisplay';
import InterestsAndGoalsDisplay from './defaultDisplays/InterestsAndGoalsDisplay';
import ProgramsAndEligibilityForm from './forms/ProgramsAndEligibilityForm.container';
import ProgramsAndEligibilityDisplay from './defaultDisplays/ProgramsAndEligibilityDisplay';
import EachExpansionPanel from './EachExpansionPanel';

const AboutMeForms = ({
  contact,
  onSubmit,
  openAboutMeForms,
  setOpenAboutMeForms,
  classes,
}) => {
  const aboutMe = _get(contact.instructions.about_me, 'components', {
    candidate_information: true,
    interests: true,
    programs: true,
    value_alignment: true,
  });

  const {candidate_information, interests, programs, value_alignment} = aboutMe;

  return (
    <Grid container justify="center" style={{width: '100%'}}>
      <EachExpansionPanel
        PanelTextHeader="Candidate Information"
        isOnEditMode={openAboutMeForms.candidate_information}
        neededAnswer={!candidate_information}
        content={
          openAboutMeForms.candidate_information ? (
            <ContactInfoForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenAboutMeForms({
                  ...openAboutMeForms,
                  candidate_information: false,
                })
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <ContactInfoDisplay
                contact={contact}
                isOnEditMode={true}
                onClickEdit={() =>
                  setOpenAboutMeForms({
                    ...openAboutMeForms,
                    candidate_information: true,
                  })
                }
              />
            </div>
          )
        }
      />

      <EachExpansionPanel
        PanelTextHeader="Value Alignments"
        isOnEditMode={openAboutMeForms.value_alignment}
        neededAnswer={!value_alignment}
        content={
          openAboutMeForms.value_alignment ? (
            <ValueAlignmentForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenAboutMeForms({
                  ...openAboutMeForms,
                  value_alignment: false,
                })
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <ValueAlignmentDisplay
                contact={contact}
                onClickEdit={() =>
                  setOpenAboutMeForms({
                    ...openAboutMeForms,
                    value_alignment: true,
                  })
                }
              />
            </div>
          )
        }
      />

      <EachExpansionPanel
        PanelTextHeader="Interests and Goals"
        isOnEditMode={openAboutMeForms.interests}
        neededAnswer={!interests}
        content={
          openAboutMeForms.interests ? (
            <InterestsAndGoalsForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenAboutMeForms({
                  ...openAboutMeForms,
                  interests: false,
                })
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <InterestsAndGoalsDisplay
                contact={contact}
                onClickEdit={() =>
                  setOpenAboutMeForms({
                    ...openAboutMeForms,
                    interests: true,
                  })
                }
              />
            </div>
          )
        }
      />

      <EachExpansionPanel
        PanelTextHeader="Programs and Eligibility"
        isOnEditMode={openAboutMeForms.programs}
        neededAnswer={!programs}
        content={
          openAboutMeForms.programs ? (
            <ProgramsAndEligibilityForm
              contact={contact}
              onSubmit={onSubmit}
              onCloseForm={() =>
                setOpenAboutMeForms({
                  ...openAboutMeForms,
                  programs: false,
                })
              }
            />
          ) : (
            <div className={classes.extraPadding}>
              <ProgramsAndEligibilityDisplay
                contact={contact}
                onClickEdit={() =>
                  setOpenAboutMeForms({
                    ...openAboutMeForms,
                    programs: true,
                  })
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
