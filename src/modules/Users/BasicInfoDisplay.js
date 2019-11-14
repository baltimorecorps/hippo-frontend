import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const BasicInfoDisplay = ({
  firstName,
  lastName,
  email,
  phone,
  onClickEdit,
  classes,
}) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={9}>
        <Grid item xs={12} className={classes.justifyBetween}>
          <Typography
            variant="h6"
            component="h3"
            style={{
              fontWeight: '600',
            }}
          >
            {firstName} {lastName}
          </Typography>
          <IconButton
            onClick={onClickEdit}
            size="small"
            aria-label="edit experience"
          >
            <EditIcon className={classes.editIcon} />
          </IconButton>
        </Grid>

        <Typography
          gutterBottom
          variant="body1"
          component="p"
          style={{display: 'flex', alignItems: 'center'}}
        >
          <Icon style={{marginRight: '5px'}}>mail</Icon>
          {email}
        </Typography>

        <Typography
          gutterBottom
          variant="body1"
          component="p"
          style={{display: 'flex', alignItems: 'center'}}
        >
          <Icon style={{marginRight: '5px'}}>phone</Icon> {phone}
        </Typography>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

BasicInfoDisplay.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  justifyBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIcon: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
});

export default withStyles(styles)(BasicInfoDisplay);
