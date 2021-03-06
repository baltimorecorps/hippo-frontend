//libraries
import React from 'react';
import PropTypes from 'prop-types';

//styles
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

//files
import {
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswers,
} from './QuestionAnswerDisplayTemplates.js';
import {getListOfAnswers} from 'lib/helperFunctions/helpers';
import {raceLabels, blankProfile} from '../../../lib/formHelpers/defaultData';

const ContactInfoDisplay = ({contact, isOnEditMode, onClickEdit, classes}) => {
  const {first_name, last_name, phone_primary, email} = contact;

  let profile = contact.profile;
  if (!profile) profile = blankProfile;
  const {
    address_primary,
    race,
    gender,
    gender_other,
    pronoun,
    pronoun_other,
    hear_about_us,
    hear_about_us_other,
  } = profile;
  const {street1, street2, city, state, zip_code, country} = address_primary;

  let theAddress = '';
  if (street1 && city && state && zip_code && country)
    theAddress = (
      <span>
        {street1}
        <br />
        {street2 || null}
        {street2 ? <br /> : null}
        {`${city}, ${state} ${zip_code}`} <br />
        {country}
      </span>
    );

  const theRace = getListOfAnswers(race, raceLabels);
  const theGender = gender === 'Not Listed' ? gender_other : gender;
  const thePronoun = pronoun === 'Not Listed' ? pronoun_other : pronoun;

  let hearAboutUs = hear_about_us;
  if (hear_about_us === 'Other') hearAboutUs = hear_about_us_other;
  if (
    hear_about_us !== 'Other' &&
    hear_about_us_other &&
    hear_about_us_other.length > 0
  )
    hearAboutUs = `${hear_about_us}: ${hear_about_us_other}`;

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.justifyBetween}>
        <Typography
          variant="h6"
          component="h3"
          style={{
            fontWeight: '600',
          }}
          data-testid="name"
        >
          {first_name} {last_name}
        </Typography>

        <IconButton
          onClick={() => onClickEdit()}
          size="small"
          aria-label="edit contact info"
          data-testid="edit_button"
        >
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </Grid>

      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className={classes.textInfo}
        data-testid="email"
      >
        <Icon className={classes.homeIcon}>mail</Icon>
        {email}
      </Typography>

      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className={classes.textInfo}
        data-testid="phone"
      >
        <Icon className={classes.icon}>phone</Icon> {phone_primary}
      </Typography>

      {theAddress ? (
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          className={classes.textInfo}
          data-testid="address"
        >
          <HomeIcon className={classes.homeIcon} />
          {theAddress}
        </Typography>
      ) : (
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          className={classes.textInfo}
          data-testid="address"
        >
          <HomeIcon className={classes.homeIcon} />* Please Enter *
          <Icon className={classes.icon}>home</Icon>
        </Typography>
      )}
      {contact && contact.profile && (
        <React.Fragment>
          <QuestionWithMultipleAnswers question="Race:" answers={theRace} />
          <QuestionWithOneAnswer question="Gender:" answer={theGender} />
          <QuestionWithOneAnswer question="Pronoun:" answer={thePronoun} />
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
  homeIcon: {marginRight: '15px', fontSize: '30px'},
  icon: {marginRight: '15px', fontSize: '30px'},
  textInfo: {display: 'flex', marginBottom: spacing(1)},
});

export default withStyles(styles)(ContactInfoDisplay);
