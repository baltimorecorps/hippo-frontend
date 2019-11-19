import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const SideDrawer = ({classes}) => {
  return (
    <Grid item xs={12}>
      <Paper className={classes.BasicInfoPaper}>
        <Grid item xs={12} className={classes.justifyBetween}>
          <div className={classes.height}>Some Help Texts</div>
        </Grid>
      </Paper>
    </Grid>
  );
};

SideDrawer.propTypes = {};

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
  BasicInfoPaper: {
    padding: spacing(2, 3, 3),
    paddingBottom: spacing(3),
    marginTop: spacing(5),
    marginBottom: spacing(5),
  },
  height: {
    height: '1200px',
  },
});

export default withStyles(styles)(SideDrawer);
