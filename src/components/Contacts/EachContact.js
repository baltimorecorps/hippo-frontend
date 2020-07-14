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

import DeleteProfileDialog from './DeleteProfileDialog';

const ContactList = ({classes, contact, deleteContact, setLoaded}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(null);

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
      setOpenDeleteDialog(true);
    }
  };

  const onDelete = async contactId => {
    const response = await deleteContact(contactId);
    if (response && response.statusCode == 200) {
      setAnchorEl(null);
      setLoaded(false);
    }
  };

  const handleCancel = () => {
    setAnchorEl(null);
    setOpenDeleteDialog(false);
  };

  return (
    <div className={classes.container}>
      <ListItem
        component={Link}
        to={`/profile/${contact.id}`}
        divider
        className={classes.listItem}
        data-testid="each-contact"
      >
        <ListItemText
          style={{flex: '0 1 auto'}}
          primary={`id: ${contact.id}`}
        />
        <div className={classes.nameEmailContainer}>
          <ListItemText
            primary={`${contact.first_name} ${contact.last_name}`}
          />
          <ListItemText secondary={`${contact.email}`} />
        </div>
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
            width: '15ch',
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
      {openDeleteDialog && (
        <DeleteProfileDialog
          contact={contact}
          onDelete={onDelete}
          handleCancel={handleCancel}
        />
      )}
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
    display: 'flex',
  },
  nameEmailContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  moreIconContainer: {
    cursor: 'pointer',
    padding: '3px 0px',
    marginLeft: '5px',
    borderRadius: '3px',
    zIndex: 10,
  },
  moreIcon: {
    cursor: 'pointer',
    padding: '0',
  },
});

export default withStyles(styles)(ContactList);
