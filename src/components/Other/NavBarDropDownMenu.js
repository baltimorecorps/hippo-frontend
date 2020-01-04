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
      // className={classes.popper}
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
                  style={
                    menuHeader === 'Account'
                      ? {width: '100px'}
                      : {width: '230px'}
                  }
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
    padding: '8px 10px',
    borderBottom: 'solid 1px #e8e8e8',
    whiteSpace: 'normal',
    lineHeight: '1.3',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  paper: {
    right: 0,
    position: 'absolute',
    backgroundColor: palette.primary.offWhite,
    border: 'solid 1px #e8e8e8',
  },
  dropdownHeader: {
    borderBottom: 'solid 1px #dedede',
    fontWeight: 'bold',
    padding: '5px',
    lineHeight: '1.2',
    fontSize: '16px',
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
