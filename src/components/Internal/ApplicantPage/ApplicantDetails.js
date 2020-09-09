import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ApplicantContactShort from './ApplicantContactShort';

import {
  raceLabels,
  roleLabels,
  programsCompletedLabels,
} from '../../AboutMe/defaultData';
import {getListOfAnswers} from 'lib/helperFunctions/helpers';

const ApplicantPage = ({classes, applicant}) => {
  if (!applicant) {
    return <div>loading...</div>;
  }

  const {status, program_apps, profile} = applicant;
  const {
    gender,
    gender_other,
    pronoun,
    pronoun_other,
    race,
    years_exp,
    job_search_status,
    hear_about_us,
    hear_about_us_other,
    roles,
    previous_bcorps_program,
    programs_completed,
    needs_help_programs,
    current_edu_status,
    current_job_status,
    address_primary,
  } = profile;

  const applicantRace = getListOfAnswers(race, raceLabels);

  let hearAboutUs = hear_about_us;
  if (hear_about_us === 'Other') hearAboutUs = hear_about_us_other;
  if (
    hear_about_us !== 'Other' &&
    hear_about_us_other &&
    hear_about_us_other.length > 0
  )
    hearAboutUs = `${hear_about_us}: ${hear_about_us_other}`;

  const interestedPrograms = [];
  program_apps.forEach(program => {
    if (program.is_interested === true) {
      interestedPrograms.push(program.program.name);
    }
  });

  let roleAnswer = roles && getListOfAnswers(roles, roleLabels);
  let programsCompletedAnswer =
    programs_completed &&
    getListOfAnswers(programs_completed, programsCompletedLabels);

  return (
    <div className={classes.detailsContainer}>
      <ApplicantContactShort applicant={applicant} />
      <div style={{marginTop: '10px'}}></div>
      <Typography variant="body1" component="p" className={classes.content}>
        <strong>Profile status:</strong>{' '}
        {status[0].toUpperCase() + status.slice(1)}
        <br />
        <strong>Location:</strong>{' '}
        {address_primary
          ? `${address_primary.city}, ${address_primary.state}`
          : '-'}
      </Typography>

      <Typography variant="body1" component="p" className={classes.content}>
        <strong>Race:</strong>{' '}
        {applicantRace.length > 0
          ? applicantRace.reduce((raceA, raceB) => {
              return (raceA += ` ,${raceB}`);
            })
          : '-'}
        <br />
        <strong>Gender:</strong> {gender || '-'}{' '}
        {gender_other && ` (${gender_other})`}
        <br />
        <strong>Pronoun:</strong> {pronoun || '-'}{' '}
        {pronoun_other && ` (${pronoun_other})`}
        <br />
        <strong>Hear about us:</strong> {hearAboutUs || '-'}{' '}
      </Typography>
      <Typography variant="body1" component="p" className={classes.content}>
        <strong>Experience:</strong> {years_exp || '-'}
        <br />
        <strong>Student:</strong> {current_edu_status || '-'}
        <br />
        <strong>Employment:</strong> {current_job_status || '-'}
        <br />
        <strong>Job search status:</strong> {job_search_status || '-'}
        <br />
      </Typography>

      <Typography variant="body1" component="p" className={classes.content}>
        <strong> Interested roles:</strong>{' '}
        {roleAnswer.length > 0
          ? roleAnswer.reduce((roleA, roleB) => {
              return (roleA += `, ${roleB}`);
            })
          : '-'}
      </Typography>

      <Typography variant="body1" component="p" className={classes.content}>
        <strong>Have participated programs:</strong>{' '}
        {previous_bcorps_program ? 'Yes' : 'No'}
        <br />
        <strong>Completed programs:</strong>{' '}
        {programsCompletedAnswer && programsCompletedAnswer.length > 0
          ? programsCompletedAnswer.reduce((programA, programB) => {
              return (programA += `, ${programB}`);
            })
          : '-'}
        <br />
      </Typography>

      <Typography variant="body1" component="p" className={classes.content}>
        <strong> Needs help about programs:</strong>{' '}
        {needs_help_programs ? 'Yes' : 'No'}
        <br />
        <strong> Interested programs:</strong>{' '}
        {interestedPrograms.length > 0
          ? interestedPrograms.reduce((raceA, raceB) => {
              return (raceA += `, ${raceB}`);
            })
          : '-'}
        <br />
      </Typography>
    </div>
  );
};

ApplicantPage.propTypes = {
  classes: PropTypes.object,
  contactId: PropTypes.number,
  applications: PropTypes.arrayOf(PropTypes.object),
  applicant: PropTypes.object,
};

const styles = ({breakpoints, palette, spacing}) => ({
  detailsContainer: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: '20px',
    [breakpoints.up('md')]: {
      marginRight: '15px',
      marginBottom: '0px',
    },
  },
  content: {
    marginBottom: '10px',
  },
  titleAndOrgContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingBottom: spacing(1.5),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      paddingBottom: spacing(1),
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  seeProfileLink: {
    color: palette.primary.link,
    padding: '2px 5px',
    cursor: 'pointer',
  },
  name: {
    fontWeight: 700,
    fontSize: '20px',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  email: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
    textAlign: 'center',
  },
});

export default withStyles(styles)(ApplicantPage);
