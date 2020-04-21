import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Footer = ({classes}) => {
  const [value, setValue] = React.useState(0);
  return (
    <div className={classes.footerContainer}>Footer</div>
    // <BottomNavigation
    //   value={value}
    //   onChange={(event, newValue) => {
    //     setValue(newValue);
    //   }}
    //   showLabels
    //   className={classes.footerContainer}
    // >
    //   <BottomNavigationAction label="Privacy" />
    //   <BottomNavigationAction label="Policy" />
    //   <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    // </BottomNavigation>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  paper: {
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '95%',
    padding: spacing(2, 3, 3),
    margin: spacing(1.5),
  },
  header: {
    [breakpoints.up('sm')]: {
      fontSize: '24px',
    },
    fontSize: '20px',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(2),
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      //   width: '100%',
      alignItems: 'center',
      justifyContent: 'center',

      flexDirection: 'column',
    },
    [breakpoints.down('md')]: {},
    [breakpoints.down('xl')]: {},
  },
});

export default withStyles(styles)(Footer);
