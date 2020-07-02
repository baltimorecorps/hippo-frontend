import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const ContactInfoDisplay = ({contact, isOnEditMode, onClickEdit, classes}) => {
  const email = contact.email_primary ? contact.email_primary.email : '';
  const {first_name, last_name, phone_primary, profile} = contact;
  // const {street1, city, state, zip_code, country} =
  //   contact && contact.profile.address;

  // console.log(profile);
  let address1 = '';
  let address2 = '';
  let country = '';
  if (profile) {
    address1 = `${profile.address.street1}, ${profile.address.street2}`;
    address2 = `${profile.address.city}, ${profile.address.state} ${profile.address.zip_code}`;
    country = profile.address.country;
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
          onClick={onClickEdit}
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
        contact && profile ? (
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
            {country}
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
