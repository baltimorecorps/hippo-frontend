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
import Typography from '@material-ui/core/Typography';

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
        <Typography
          component="p"
          variant="caption"
          align="center"
          className={classes.listItemId}
        >
          {`id: ${contact.id}`}
        </Typography>
        <div className={classes.nameEmailContainer}>
          <ListItemText
            className={classes.listItemName}
            primary={`${contact.first_name} ${contact.last_name}`}
          />
          <Typography
            component="p"
            variant="caption"
            align="center"
            className={classes.listItemEmail}
          >
            {contact.email}
          </Typography>
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
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    padding: '0 10px',

    [breakpoints.up('sm')]: {
      padding: '0px 15px 0px 0px',
    },
  },
  listItem: {
    borderBottom: 'none',
    display: 'flex',
    padding: 0,
  },

  nameEmailContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemId: {
    fontSize: '13px',
    width: '50px',
    [breakpoints.up('sm')]: {
      fontSize: '16px',
      width: '100px',
    },
  },
  listItemName: {
    textAlign: 'center',
    fontSize: '13px',
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  },
  listItemEmail: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#878787',

    [breakpoints.up('sm')]: {
      fontSize: '14px',
    },
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
