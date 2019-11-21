import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';

const HelpDrawer = ({helpText, onClose, classes}) => {
  return (
    <Paper className={classes.BasicInfoPaper}>
      <IconButton
        edge="end"
        aria-label="cancel form"
        onClick={onClose}
        className={classes.iconButton}
      >
        <CloseIcon />
      </IconButton>
      <Box my={1}>
        <Typography variant="h6" component="h6" className={classes.textHeader}>
          How to write your {helpText.header}:
        </Typography>
      </Box>
      <Box mb={1}>
        <Typography
          variant="body1"
          component="p"
          className={classes.textContent}
        >
          {helpText.content} Several helpful items based on what BC staff have
          told applicants to include in the past. Employers want to know x, y,
          z. lorem
        </Typography>
      </Box>
      <Box mb={1}>
        <Typography
          variant="body1"
          component="p"
          className={classes.textContent}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
          consectetur neque rerum, labore saepe sapiente quo, error enim sunt
          laboriosam reprehenderit necessitatibus reiciendis. Temporibus cum
          quaerat error, culpa quae ducimus.
        </Typography>
      </Box>
    </Paper>
  );
};

HelpDrawer.propTypes = {
  helpText: PropTypes.shape({
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  BasicInfoPaper: {
    padding: spacing(10, 3, 3),
    paddingBottom: spacing(8),
    borderRadius: '0',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '25px',
    height: '100vh',
    margin: '0',
  },
  iconButton: {
    alignSelf: 'flex-end',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  textHeader: {fontWeight: '700', fontSize: '16px'},
  textContent: {
    fontSize: '15px',
    textAlign: 'justify',
    textIndent: '20px',
  },
});

export default withStyles(styles)(HelpDrawer);
