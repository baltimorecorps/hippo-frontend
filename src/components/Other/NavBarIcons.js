import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import NavBarDropDownMenu from '../../../src/components/Other/NavBarDropDownMenu';

const NavBarIcons = ({logout, classes}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUser, setOpenUser] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const wrapperRef = useRef(null);

  const dropdownMenuInfo = {
    notifications: {
      menuHeader: 'Notifications',
      menuItems: [
        {name: 'Notification 1', url: '#'},
        {name: 'Notification 2', url: '#'},
        {name: 'Notification 3', url: '#'},
      ],
    },

    user: {
      menuHeader: 'Account',
      menuItems: [
        {name: 'Profile', url: '#'},
        {name: 'Account', url: '#'},
        {name: 'Logout', url: '#', function: logout},
      ],
    },
  };
  const handleClickIcon = (event, type) => {
    setAnchorEl(event.currentTarget);
    if (type === 'notifications') {
      setOpenUser(false);
      setOpenNotification(!openNotification);
    } else if (type === 'user') {
      setOpenNotification(false);
      setOpenUser(!openUser);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickAway, false);
    return () => {
      document.removeEventListener('click', handleClickAway, false);
    };
  }, []);

  const handleClickAway = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenUser(false);
      setOpenNotification(false);
    }
  };

  return (
    <div className={classes.container} id="navLinks" ref={wrapperRef}>
      {/* ------------- Notification Button Icon ------------- */}
      <Button
        onClick={e => handleClickIcon(e, 'notifications')}
        className={
          openNotification
            ? `${classes.buttons} + ${classes.offWhiteBG}`
            : classes.buttons
        }
      >
        <NotificationsIcon
          className={
            openNotification
              ? `${classes.bellIcon} + ${classes.icons} + ${classes.offWhiteColor}`
              : `${classes.bellIcon} + ${classes.icons}`
          }
        />
        <div className={classes.redDot}>!</div>
      </Button>
      <NavBarDropDownMenu
        open={openNotification}
        anchorEl={anchorEl}
        onClickAway={handleClickAway}
        menuHeader={dropdownMenuInfo.notifications.menuHeader}
        menuItems={dropdownMenuInfo.notifications.menuItems}
      />

      {/* ------------- User Button Icon ------------- */}
      <Button
        onClick={e => handleClickIcon(e, 'user')}
        className={
          openUser
            ? `${classes.buttons} + ${classes.offWhiteBG}`
            : classes.buttons
        }
      >
        <PersonIcon
          className={
            openUser
              ? `${classes.icons} + ${classes.offWhiteColor}`
              : classes.icons
          }
        />
      </Button>
      <NavBarDropDownMenu
        open={openUser}
        anchorEl={anchorEl}
        onClickAway={handleClickAway}
        menuHeader={dropdownMenuInfo.user.menuHeader}
        menuItems={dropdownMenuInfo.user.menuItems}
      />
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: 'auto',
    height: '64px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  redDot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    color: 'white',
    width: '15px',
    height: '15px',
    backgroundColor: palette.primary.redDot,
    borderRadius: '20%',
    position: 'absolute',
    top: '11px',
    right: '9px',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '64px',
    padding: 0,
    margin: 0,
    borderRadius: 0,
    backgroundColor: palette.primary.main,

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },

  icons: {
    color: palette.primary.main,
    border: `2px ${palette.primary.almostBlack} solid`,
    borderRadius: '50%',
    padding: '5px',
    backgroundColor: palette.primary.almostBlack,
    fontSize: '30px',
  },
  bellIcon: {
    padding: '7px',
    fontSize: '26px',
  },
  offWhiteColor: {
    color: palette.primary.offWhite,
  },
  offWhiteBG: {
    backgroundColor: palette.primary.offWhite,
    '&:hover': {
      backgroundColor: palette.primary.offWhite,
    },
  },
});

NavBarIcons.propTypes = {
  logout: PropTypes.func,
};
export default withStyles(styles)(NavBarIcons);
