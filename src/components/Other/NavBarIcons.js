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

  const BetaMessage = (
    <p className={classes.betaMessage}>
      <span>
        ** This website is currently in beta. There will be updates to the look
        and feel and you may experience some bugs as we introduce new
        features.**
      </span>
      <br />
      <br />
      <span className={classes.smallerFont}>
        If you notice an issue or are having a problem with the website,
        <br /> you can let us know through our{' '}
        <a
          className={classes.contactSupportLink}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.tfaforms.com/4602493"
        >
          Contact Support Page
        </a>
      </span>
    </p>
  );

  const helpLink = (
    <a
      className={classes.helpLink}
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.tfaforms.com/4602493"
    >
      Help
    </a>
  );

  const dropdownMenuInfo = {
    notifications: {
      menuHeader: 'Notifications',
      menuItems: [{name: BetaMessage}],
    },

    user: {
      menuHeader: 'Account',
      menuItems: [
        {name: helpLink},
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
            ? `${classes.buttons} + ${classes.darkGrayBG}`
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
            ? `${classes.buttons} + ${classes.darkGrayBG}`
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
    border: `2px ${palette.primary.darkGray} solid`,
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
    backgroundColor: palette.primary.offWhite,
    color: palette.primary.darkGray,
  },
  darkGrayBG: {
    backgroundColor: palette.primary.darkGray,
    '&:hover': {
      backgroundColor: palette.primary.darkGray,
    },
  },
  betaMessage: {
    cursor: 'default',
  },
  smallerFont: {
    fontSize: '14px',
  },
  contactSupportLink: {
    cursor: 'pointer',
    color: palette.primary.main,
  },
  helpLink: {
    width: '100%',
    height: '100%',
  },
});

NavBarIcons.propTypes = {
  logout: PropTypes.func,
};
export default withStyles(styles)(NavBarIcons);
