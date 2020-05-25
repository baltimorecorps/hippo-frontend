import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: '#f0f2ff',
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#7083ff',
  },
})(LinearProgress);

const CapabilityScores = ({classes, contactCapabilities, editScores}) => {
  if (!contactCapabilities) {
    return <div />;
  }

  let capabilityScores = Object.values(contactCapabilities)
    .filter(
      capability =>
        capability.skills.length > 0 || capability.suggested_skills.length > 0
    )
    .map(capability => ({
      id: capability.id,
      name: capability.name,
      score: (capability.score || 0) + (editScores[capability.id] || 0),
    }))
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });

  if (capabilityScores.length === 0) {
    return <div />;
  }

  return (
    <Paper className={classes.paper}>
      {capabilityScores.map(capability => (
        <div key={capability.id} className={classes.container}>
          <Typography>{capability.name}</Typography>
          <LinearProgress
            classes={{
              root: classes.bar,
            }}
            color="primary"
            value={capability.score > 5 ? 100 : capability.score * 20}
            variant="determinate"
          />
        </div>
      ))}
    </Paper>
  );
};

CapabilityScores.propTypes = {
  classes: PropTypes.object.isRequired,
  contactCapabilities: PropTypes.object,
  editScores: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    display: 'none',

    [breakpoints.up('md')]: {
      display: 'block',
      width: '18vw',
      right: spacing(2),
      padding: spacing(1),
    },
    [breakpoints.up('lg')]: {
      width: '16vw',
    },
  },
  container: {
    padding: spacing(1),
  },
  bar: {
    height: '15px',
    borderRadius: '10px',
    margin: '4px 0',
    backgroundColor: palette.primary.offWhite,
    border: 'solid 1px lightgrey',
  },
});

export default withStyles(styles)(CapabilityScores);
