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
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
      disablePortal={true}
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
                  className={classes.menuItem}
                  component={Link}
                  to={item.url}
                  onClick={item.function}
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
    padding: '10px 20px',
    borderBottom: 'solid 1px #e8e8e8',
  },
  paper: {
    borderRadius: 0,
    zIndex: 10,
    top: 100,
    backgroundColor: palette.primary.offWhite,
    border: 'solid 1px #e8e8e8',
  },

  dropdownHeader: {
    borderBottom: 'solid 1px #dedede',
    fontWeight: 'bold',
    padding: '5px',
  },

  bellIcon: {
    padding: '7px',
    fontSize: '26px',
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
