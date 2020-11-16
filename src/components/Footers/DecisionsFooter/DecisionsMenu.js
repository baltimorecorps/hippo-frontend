import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import withStyles from '@material-ui/core/styles/withStyles';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import ConfirmDialog from './ConfirmDialog';

const staffMenuList = [
  {
    label: 'Reopen',
    name: 'reopen',
  },
  {
    label: 'Recommend',
    name: 'recommended',
  },
  {
    label: 'Not a Fit',
    name: 'not a fit',
  },
  {
    label: 'Withdraw',
    name: 'withdraw',
  },
];

const employerMenuList = [
  {
    label: 'Interested in Interview',
    name: 'interested_in_interview',
  },
  {
    label: 'Interview Scheduled',
    name: 'interviewed',
  },
  {
    label: 'Finalist',
    name: 'finalist',
  },
  {
    label: 'Match',
    name: 'match',
  },
  {
    label: 'Not a Fit',
    name: 'not a fit',
  },
];

const DecisionsMenu = ({
  page,
  classes,
  menuName,
  isOpen,
  setIsOpen,
  updateApplicationStatus,
  application,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [decision, setDecision] = useState('');
  const staffRef = React.useRef(null);
  const employerRef = React.useRef(null);
  let ref = staffRef;
  let buttonBGColor = '#89c2fa';
  let menuList = staffMenuList;

  if (menuName === 'Employer Decisions') {
    buttonBGColor = '#5adb92';
    ref = employerRef;
    menuList = employerMenuList;
  }

  const handleToggle = () => {
    setIsOpen(prevIsOpenStaffMenu => !prevIsOpenStaffMenu);
  };

  const handleClose = (event, value) => {
    setDecision(value);
    setConfirmed(true);
    // updateApplicationStatus(application, payload);
    if (ref.current && ref.current.contains(event.target)) {
      return;
    }

    setIsOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpenStaffButton = React.useRef(setIsOpen);
  React.useEffect(() => {
    if (prevOpenStaffButton.current === true && setIsOpen === false) {
      ref.current.focus();
    }

    prevOpenStaffButton.current = setIsOpen;
  }, [setIsOpen, ref]);

  // console.log('application', application);
  return (
    <React.Fragment>
      <div className={classes.root}>
        <div>
          <Button
            ref={ref}
            aria-controls={isOpen ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{
              backgroundColor: buttonBGColor,
              padding: '7px 15px',
            }}
          >
            {menuName}
          </Button>
          <Popper
            open={isOpen}
            anchorEl={ref.current}
            role={undefined}
            transition
            disablePortal
          >
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={e => handleClose(e, 'none')}>
                    <MenuList
                      autoFocusItem={isOpen}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      {menuList.map((menu, index) => (
                        <MenuItem
                          onClick={e => handleClose(e, menu.name)}
                          key={index}
                        >
                          {menu.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      {decision !== 'none' && (
        <ConfirmDialog
          page={page}
          application={application}
          open={confirmed}
          decision={decision}
          closeDialog={() => setConfirmed(false)}
          updateApplicationStatus={updateApplicationStatus}
        />
      )}
    </React.Fragment>
  );
};

DecisionsMenu.propTypes = {};

const styles = ({breakpoints, palette, spacing}) => ({});

export default withStyles(styles)(DecisionsMenu);
