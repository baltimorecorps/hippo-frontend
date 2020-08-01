import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import get from 'lodash.get';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import {
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersArray,
} from './QuestionAnswerDisplayTemplates.js';

import {raceLabels} from '../defaultData';

const ContactInfoDisplay = ({contact, isOnEditMode, onClickEdit, classes}) => {
  const email = contact.email_primary ? contact.email_primary.email : '';
  const {first_name, last_name, phone_primary} = contact;
  const {street1, street2, city, state, zip_code, country} =
    contact && contact.profile != null && contact.profile.address_primary;

  // const profile = get(contact, 'profile', "");
  // console.log(profile, profile);

  let address_street2 = '';
  if (street2) address_street2 = `, ${street2}`;

  const address1 = `${street1}${address_street2}` || '';
  const address2 = `${city}, ${state} ${zip_code}` || '';
  const address3 = country || '';

  const {hear_about_us, hear_about_us_other} =
    contact && contact.profile != null && contact.profile;
  let checkedRace = [];
  if (contact.profile) {
    for (const [key, value] of Object.entries(contact.profile.race)) {
      if (value === true) checkedRace.push(key);
    }
  }

  let race = [];
  for (const [key, value] of Object.entries(raceLabels)) {
    if (checkedRace.includes(key)) race.push(value);
  }

  let gender = contact.profile && contact.profile.gender;
  let pronoun = contact.profile && contact.profile.pronoun;
  if (contact.profile && contact.profile.gender === 'Not Listed')
    gender = contact.profile.gender_other;
  if (contact.profile && contact.profile.pronoun === 'Not Listed')
    pronoun = contact.profile.pronoun_other;

  let hearAboutUs = '';
  if (
    hear_about_us !== 'Other' &&
    hear_about_us_other &&
    hear_about_us_other.length > 0
  ) {
    hearAboutUs = `${hear_about_us}: ${hear_about_us_other}`;
  } else if (hear_about_us !== 'Other') {
    hearAboutUs = hear_about_us;
  } else {
    hearAboutUs = hear_about_us_other;
  }
  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.justifyBetween}>
        <Typography
          variant="h6"
          component="h3"
          style={{
            fontWeight: '600',
          }}
        >
          {first_name} {last_name}
        </Typography>
        <IconButton
          onClick={() => onClickEdit()}
          size="small"
          aria-label="edit experience"
        >
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </Grid>

      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className={classes.textInfo}
      >
        <Icon className={classes.homeIcon}>mail</Icon>
        {email}
      </Typography>

      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className={classes.textInfo}
      >
        <Icon className={classes.icon}>phone</Icon> {phone_primary}
      </Typography>

      {isOnEditMode ? (
        contact &&
        address1.length > 0 &&
        address2.length > 0 &&
        address3.length > 0 ? (
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            className={classes.textInfo}
          >
            <HomeIcon className={classes.homeIcon} />
            {address1}
            <br />
            {address2} <br />
            {address3}
          </Typography>
        ) : (
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            className={classes.textInfo}
          >
            <HomeIcon className={classes.homeIcon} />* Please Enter *
          </Typography>
        )
      ) : null}
      {isOnEditMode && contact && contact.profile && (
        <React.Fragment>
          <QuestionWithMultipleAnswersArray question="Race:" answers={race} />
          <QuestionWithOneAnswer question="Gender:" answer={gender} />
          <QuestionWithOneAnswer question="Pronoun:" answer={pronoun} />
          <QuestionWithOneAnswer
            question="How you find out about Baltimore Corps:"
            answer={hearAboutUs}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

ContactInfoDisplay.propTypes = {
  contact: PropTypes.object,
  isOnEditMode: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

const styles = ({breakpoints, palette, spacing}) => ({
  justifyBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(1),
  },
  editIcon: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  homeIcon: {marginRight: '5px', fontSize: '30px'},
  icon: {marginRight: '5px'},
  textInfo: {display: 'flex'},
});

export default withStyles(styles)(ContactInfoDisplay);
