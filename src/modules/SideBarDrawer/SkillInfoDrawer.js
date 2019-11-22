import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const SkillInfoDrawer = ({onBack, name, contents, onClose, classes}) => {
  return (
    <Paper className={classes.BasicInfoPaper}>
      <Grid container direction="column">
        <Grid item xs={12} className={classes.iconsContainer}>
          <IconButton
            edge="end"
            aria-label="cancel form"
            onClick={onBack}
            className={classes.iconButton}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="cancel form"
            onClick={onClose}
            className={classes.iconButton}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item className={classes.section}>
          <Box my={1}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.textHeader}
            >
              {name}
            </Typography>
          </Box>
          <Box mb={2}>
            {contents.map((subContent, index) => (
              <Typography
                key={index}
                variant="body1"
                component="p"
                className={classes.textContent}
              >
                {subContent}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Divider className={classes.divider} />

        <Divider className={classes.divider} />
      </Grid>
    </Paper>
  );
};

SkillInfoDrawer.propTypes = {
  helpText: PropTypes.shape({
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  BasicInfoPaper: {
    paddingTop: spacing(10),
    paddingBottom: spacing(8),
    borderRadius: '0',
    position: 'fixed',
    top: '25px',
    height: '100vh',
    margin: '0',
    zIndex: 2,
  },
  iconsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    margin: spacing(0, 2.5),
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  section: {
    padding: spacing(1, 3, 0.5, 3),
  },
  textHeader: {fontWeight: '700', fontSize: '16px'},
  textContent: {
    color: palette.primary.darkGray,
    fontSize: '15px',
    textIndent: '15px',
    marginBottom: spacing(0.7),
  },

  divider: {
    backgroundColor: palette.primary.darkGray,
  },
});

export default withStyles(styles)(SkillInfoDrawer);