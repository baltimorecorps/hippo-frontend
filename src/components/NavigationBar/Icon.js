import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';

import NavBarDropDownMenu from './NavBarDropDownMenu';

const Icon = ({
  name,
  isWarning,
  handleClickIcon,
  openIcon,
  anchorEl,
  handleClickAway,
  menuHeader,
  menuItems,
  classes,
}) => {
  const iconOpened = `${classes.icons} + ${classes.offWhiteColor}`;
  const iconClosed = `${classes.icons} `;
  const buttonOpened = `${classes.buttons} + ${classes.darkGrayBG}`;
  const buttonClosed = `${classes.buttons} `;

  const iconOptions = {
    user: <PersonIcon className={openIcon ? iconOpened : iconClosed} />,
    notifications: (
      <NotificationsIcon className={openIcon ? iconOpened : iconClosed} />
    ),
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickIcon}
        className={openIcon ? buttonOpened : buttonClosed}
      >
        {iconOptions[name]}
        {name === 'notifications' && isWarning ? (
          <div className={classes.redDot}>!</div>
        ) : null}
      </Button>
      <NavBarDropDownMenu
        open={openIcon}
        anchorEl={anchorEl}
        onClickAway={handleClickAway}
        menuHeader={menuHeader}
        menuItems={menuItems}
      />
    </React.Fragment>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
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
    fontSize: '40px',
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
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  isWarning: PropTypes.bool,
  handleClickIcon: PropTypes.func.isRequired,
  openIcon: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  handleClickAway: PropTypes.func.isRequired,
  menuHeader: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};
export default withStyles(styles)(Icon);
