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

  const contactSupport = (
    <a href="https://www.tfaforms.com/4602493">Contact Support</a>
  );
  const BetaMessage = <span><span className="contactSupport" style={{fontStyle: 'normal'}}>** This website is currently in beta. There will be updates to the look and feel and you may experience some bugs as we introduce new features.**</span> <br/><br/> <span style={{fontSize: '14px'}}>If you notice an issue or are having a problem with the website,<br/> you can let us know through our <a href="https://www.tfaforms.com/4602493">Contact Support</a> page.</span></span>;

  const dropdownMenuInfo = {
    notifications: {
      menuHeader: 'Notifications',
      menuItems: [
        // {
        //   name:
        //     '* Please submit Race and Equity questions to be able to get approved to see job listings',
        //   url: '#',
        // },
        {name: BetaMessage},
        // {name: 'Notification 3', url: '#'},
      ],
    },

    user: {
      menuHeader: 'Account',
      menuItems: [
        // {name: 'Profile', url: '#'},
        // {name: 'Account', url: '#'},
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
    color: palette.primary.offWhite,
    // backgroundColor: palette.primary.darkGray,
    backgroundColor: palette.primary.offWhite,
    color: palette.primary.darkGray,
  
  },
  offWhiteBG: {
    backgroundColor: palette.primary.darkGray,
    '&:hover': {
      backgroundColor: palette.primary.darkGray,
    },
  },
});

NavBarIcons.propTypes = {
  logout: PropTypes.func,
};
export default withStyles(styles)(NavBarIcons);
