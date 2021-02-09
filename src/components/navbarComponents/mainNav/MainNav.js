import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavBarIcons from 'components/navbarComponents/mainNav/mainNavComponents/NavBarIcons';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';

const MainNav = ({classes,hasSession,isAuthenticated,onClickOpportunities,onClickLogInHandler, onClickLogOutHandler}) =>{



    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <MenuItem>
              <HomeIcon className={classes.homeIcon} />
            </MenuItem>
          </Link>

          {(hasSession || isAuthenticated) && (
            <Link
              to="/opportunities"
              onClick={onClickOpportunities}
              className={classes.links}
            >
              <Typography>Opportunities</Typography>
            </Link>
          )}

          <div className={classes.grow} />

          {!hasSession && !isAuthenticated && (
            <Button color="inherit" onClick={onClickLogInHandler}>
              <Typography>Log in / Sign up</Typography>
            </Button>
          )}
          {(hasSession || isAuthenticated) && (
            <NavBarIcons logout={onClickLogOutHandler} />
          )}
        </Toolbar>
      </AppBar>
    )
}

export default MainNav