import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const NavBarDropdownMenu = ({
  onClickAway,
  open,
  anchorEl,
  menuHeader,
  menuItems,
  classes,
}) => {
  let contentWidth;
  if (menuHeader === 'Notifications') contentWidth = {width: '72vw'};
  if (menuHeader === 'Account') contentWidth = {width: '100px'};
  if (menuHeader === 'FAQs') contentWidth = {width: '270px'};
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
      disablePortal
    >
      {({TransitionProps}) => (
        <ClickAwayListener onClickAway={onClickAway}>
          <Fade {...TransitionProps} timeout={{enter: 200, exit: 200}}>
            <div className={classes.paper}>
              <Typography align="center" className={classes.dropdownHeader}>
                {menuHeader}
              </Typography>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  style={contentWidth}
                  className={classes.menuItem}
                  component={item.page && Link}
                  to={item.page}
                  onClick={item.function ? item.function : null}
                >
                  {item.name}
                </MenuItem>
              ))}
            </div>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  menuItem: {
    padding: '8px 5px',
    borderBottom: 'solid 1px #e8e8e8',
    whiteSpace: 'normal',
    lineHeight: '1.3',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
  paper: {
    color: '#ffffff',
    right: 0,
    position: 'absolute',
    backgroundColor: palette.primary.darkGray,
    border: `solid 1px ${palette.primary.offWhite}`,
  },
  dropdownHeader: {
    borderBottom: 'solid 1px #dedede',
    padding: '5px',
    lineHeight: '1.2',
    fontSize: '13px',
    backgroundColor: '#707070;',
  },
});

NavBarDropdownMenu.propTypes = {
  logout: PropTypes.func,
  open: PropTypes.bool,
  onClickAway: PropTypes.func,
  anchorEL: PropTypes.object,
  menuHeader: PropTypes.string,
  menuItems: PropTypes.array,
};
export default withStyles(styles)(NavBarDropdownMenu);
