import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ContactList = ({classes, contact, deleteContact}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const options = ['Delete'];

  const ITEM_HEIGHT = 48;

  const handleClickMore = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickActions = async (option, contactId) => {
    if (option === 'Delete') {
      const response = await deleteContact(contactId);
      if (response.statusCode === 200) {
        console.log('delete profile', contactId);
        setAnchorEl(null);

        window.location.reload(false);
      } else {
        console.error('Error updating application with resume', response);
      }
    }
  };

  // todo add dialog to confirm before delete
  // add testing

  return (
    <div className={classes.container}>
      <ListItem
        component={Link}
        to={`/profile/${contact.id}`}
        divider
        className={classes.listItem}
      >
        <ListItemText primary={`${contact.first_name} ${contact.last_name}`} />
      </ListItem>

      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClickMore}
        className={classes.moreIconContainer}
        data-testid="more-icon"
      >
        <MoreVertIcon className={classes.moreIcon} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={() => handleClickActions(option, contact.id)}
            data-testid="more-icon-menu"
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

ContactList.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: 'solid #d4d4d4 1px',
    alignItems: 'center',
    padding: '0 20px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  listItem: {
    borderBottom: 'none',
    // '&:hover': {
    //   backgroundColor: '#d4d4d4',
    // },
  },
  deleteButton: {
    margin: spacing(1),
    borderColor: palette.error.main,
    color: palette.error.main,

    '&:hover': {
      color: 'white',
      backgroundColor: palette.error.main,
    },
  },
  moreIcon: {
    cursor: 'pointer',
    padding: '0',
  },
  moreIconContainer: {
    cursor: 'pointer',
    padding: '3px 0px',
    marginLeft: '5px',
    borderRadius: '3px',
    zIndex: 10,
  },
});

export default withStyles(styles)(ContactList);
