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
import SkillInfoDrawer from './SkillInfoDrawer';
import SkillLink from './SkillLink';

const HelpDrawer = ({
  helpText,
  capabilities,
  skillsOnly,
  onClose,
  isOpenDrawer1,
  isOpenDrawer2,
  doOpenDrawer1,
  doOpenDrawer2,
  classes,
}) => {
  const [skillContent, setSkillContent] = React.useState();
  const [skillName, setSkillName] = React.useState();
  const names = Object.keys(capabilities);
  names.sort();

  const handleOnClickSkillLink = index => {
    setSkillName(names[index]);
    setSkillContent(capabilities[names[index]]);
    doOpenDrawer2();
  };

  return (
    <Paper className={classes.BasicInfoPaper}>
      <Grid
        container
        direction="column"
        style={isOpenDrawer2 ? {display: 'none'} : null}
      >
        <Grid item align="end">
          <IconButton
            edge="end"
            aria-label="cancel form"
            onClick={onClose}
            className={classes.iconButton}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        {!skillsOnly && isOpenDrawer1 && (
          <React.Fragment>
            <Grid item className={classes.section}>
              <Box my={1}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.textHeader}
                >
                  How to write your {helpText.header}:
                </Typography>
              </Box>
              <Box mb={2}>
                {helpText.content.map((content, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    component="p"
                    className={classes.textContent}
                  >
                    {content}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Divider className={classes.divider} />
          </React.Fragment>
        )}

        <Grid item className={classes.section}>
          <Box my={1}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.textHeader}
            >
              {skillsOnly
                ? 'Read more on each of these capabilities: '
                : 'See if you can include these abilities in your profile:'}
            </Typography>
          </Box>

          {names.map((name, index) => (
            <SkillLink
              key={index}
              onClick={handleOnClickSkillLink}
              skillName={name}
              index={index}
            />
          ))}
        </Grid>
        <Divider className={classes.divider} />
      </Grid>
      {isOpenDrawer2 && (
        <SkillInfoDrawer
          name={skillName}
          contents={skillContent}
          onBack={() => doOpenDrawer1()}
          onClose={onClose}
        />
      )}
    </Paper>
  );
};

HelpDrawer.propTypes = {
  helpText: PropTypes.shape({
    work: PropTypes.shape({
      header: PropTypes.string.isRequired,
      content: PropTypes.array.isRequired,
    }),
    education: PropTypes.shape({
      header: PropTypes.string.isRequired,
      content: PropTypes.array.isRequired,
    }),
    accomplishment: PropTypes.shape({
      header: PropTypes.string.isRequired,
      content: PropTypes.array.isRequired,
    }),
  }),
  onClose: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  BasicInfoPaper: {
    paddingTop: spacing(10),
    paddingBottom: spacing(5),
    borderRadius: '0',
    position: 'fixed',
    top: '25px',
    height: '100vh',
    margin: '0px',
    right: 0,

    [breakpoints.down('xl')]: {
      maxWidth: '18%',
    },
    [breakpoints.down('lg')]: {
      maxWidth: '26%',
    },
    [breakpoints.down('md')]: {
      maxWidth: '33%',
    },
    // [breakpoints.down('sm')]: {
    //   maxWidth: '41%',
    // },

    [breakpoints.down('sm')]: {
      paddingTop: spacing(6),
      position: 'absolute',
      margin: spacing(0.3),
      height: 'auto',
      maxWidth: '100%',
      left: 0,
    },
  },
  iconButton: {
    alignSelf: 'flex-end',
    margin: spacing(0, 2.5),
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  section: {
    padding: spacing(1, 3, 0.5, 3),
  },
  textHeader: {fontWeight: '700', fontSize: '16px', padding: '0px 25px'},
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

export default withStyles(styles)(HelpDrawer);
