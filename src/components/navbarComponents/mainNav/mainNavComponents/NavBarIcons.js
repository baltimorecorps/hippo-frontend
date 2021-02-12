import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from './Icon';
import {useHistory} from 'react-router-dom';

import {
  createExternalLink,
  createClickTracking,
} from 'lib/helperFunctions/helpers';

const NavBarIcons = ({logout, classes}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openIcon, setOpenIcon] = useState(0);
  const wrapperRef = useRef(null);

  let history = useHistory();

  const toFAQPage = () => {
    history.push('/faq');
    setOpenIcon(0);
  };

  const contactSupportLink = createExternalLink(
    'Contact Support Page',
    'https://www.tfaforms.com/4602493',
    classes.contactSupportLink
  );
  const helpLink = createExternalLink(
    'Help',
    'https://www.tfaforms.com/4602493',
    classes.helpLink
  );
  const askQuestionLink = createExternalLink(
    'Ask Questions or Request Helps',
    'https://www.tfaforms.com/4602493',
    classes.helpLink
  );

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
        <br /> you can let us know through our {contactSupportLink}
      </span>
    </p>
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
    faq: {
      menuHeader: 'FAQs',
      menuItems: [
        {
          name: 'See Frequently Asked Questions',
          url: '/faq',
          function: toFAQPage,
        },
        {name: askQuestionLink},
      ],
    },
  };

  const handleClickIcon = (event, type) => {
    setAnchorEl(event.currentTarget);
    if (type === 'user') {
      return openIcon === 1 ? setOpenIcon(0) : setOpenIcon(1);
    } else if (type === 'notifications') {
      return openIcon === 2 ? setOpenIcon(0) : setOpenIcon(2);
    } else if (type === 'faq') {
      return openIcon === 3 ? setOpenIcon(0) : setOpenIcon(3);
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
      setOpenIcon(0);
    }
  };

  const onClickIconHandler = (e, name) => {
    createClickTracking(
      'Navigation Bar',
      `Click ${name} Icon`,
      `Click ${name} Icon Button`
    );
    handleClickIcon(e, name);
  };

  return (
    <div className={classes.container} id="navLinks" ref={wrapperRef}>
      <Icon
        name="faq"
        isWarning={false}
        handleClickIcon={e => onClickIconHandler(e, 'faq')}
        openIcon={openIcon === 3}
        anchorEl={anchorEl}
        handleClickAway={handleClickAway}
        menuHeader={dropdownMenuInfo.faq.menuHeader}
        menuItems={dropdownMenuInfo.faq.menuItems}
      />
      <Icon
        name="notifications"
        isWarning={false}
        handleClickIcon={e => onClickIconHandler(e, 'notifications')}
        openIcon={openIcon === 2}
        anchorEl={anchorEl}
        handleClickAway={handleClickAway}
        menuHeader={dropdownMenuInfo.notifications.menuHeader}
        menuItems={dropdownMenuInfo.notifications.menuItems}
      />
      <Icon
        name="user"
        handleClickIcon={e => onClickIconHandler(e, 'user')}
        openIcon={openIcon === 1}
        anchorEl={anchorEl}
        handleClickAway={handleClickAway}
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
