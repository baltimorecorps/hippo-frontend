import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';

const SkillInfoDrawer = ({onBack, name, contents, onClose, classes}) => {
  return (
    <div className={classes.BasicInfoPaper}>
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
            <Typography
              variant="body1"
              component="p"
              className={classes.textContent}
            >
              {contents.summary}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.textHeader}
            >
              Here are some examples of {name}:
            </Typography>
            <ul className={classes.uls}>
              {contents.examples.map((example, index) => (
                <li key={index} className={classes.bullet}>
                  <Typography variant="body1" component="p">
                    {example}
                  </Typography>
                </li>
              ))}
            </ul>
            <Divider className={classes.divider} />

            <Typography
              variant="body1"
              component="p"
              className={classes.textHeader}
            >
              Questions to spark ideas:
            </Typography>
            <div>
              <ul className={classes.uls}>
                {contents.questions.map((question, index) => (
                  <li key={index} className={classes.bullet}>
                    <Typography variant="body1" component="p">
                      {question}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
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
    borderRadius: '0',
    height: '100vh',
    margin: '0',
    maxHeight: '85vh',
    overflow: 'auto',
    [breakpoints.down('xs')]: {
      paddingTop: spacing(2.5),
      height: 'auto',
      margin: spacing(0.5),
    },
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
    maxHeight: '80vh',
    overflow: 'auto',
  },
  textHeader: {fontWeight: '700', fontSize: '16px'},
  textContent: {
    marginBottom: spacing(0.7),
    textIndent: '15px',
  },
  uls: {
    marginBottom: spacing(0.7),
    marginTop: spacing(0),
    paddingLeft: '30px',
  },

  divider: {
    margin: '15px',
    backgroundColor: palette.primary.darkGray,
  },
  bullet: {
    marginBottom: '5px',
  },
});

export default withStyles(styles)(SkillInfoDrawer);
