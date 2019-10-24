import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import BasicInfoDisplay from 'modules/Users/BasicInfoDisplay';
import ExperiencesList from 'modules/Experiences/ExperiencesList';
import SkillsList from 'modules/Tags/SkillsList';
import ResumesList from 'modules/Resumes/ResumesList';

import html2canvas from 'html2canvas';

const ProfilePage = ({
  contactId,
  contactInfo,
  refreshContacts,
  startResumeCreation,
  startResumeSelect,
  cancelResumeSelect,
  classes,
  showResumeDialog,
  inSelectMode,
}) => {
  // If the state for this contact hasn't been loaded yet, we try and reload
  // that state from the API. If this load goes well, this page should be
  // rerendered due to the Redux state update
  if (typeof contactInfo === 'undefined') {
    refreshContacts();
    // TODO: Ideally we have a better empty/error state here
    return <div />;
  }

  const email = contactInfo.email_primary
    ? contactInfo.email_primary.email
    : '';

  // This page primarily serves as the top level container for the profile of
  // this person's employment-relevant experiences and skills.
  //
  // The three main components it makes use of are BasicInfoDisplay,
  // ExperiencesList, and SkillsList
  return (
    <React.Fragment>
      <ResumeDialog
        open={showResumeDialog}
        highlightExperiences={startResumeSelect}
        useStandardProfile={cancelResumeSelect}
      />
      {inSelectMode ? (
        <SelectionDrawer
          onNext={cancelResumeSelect}
          onCancel={cancelResumeSelect}
        />
      ) : null}
      <Grid
        id="divToPrint"
        container
        justify="center"
        className={classes.wrapper}
      >
        <Grid item xs={8}>
          <BasicInfoDisplay
            firstName={contactInfo.first_name}
            lastName={contactInfo.last_name}
            email={email}
            phone={contactInfo.phone_primary}
          />

          <ExperiencesList contactId={contactId} experienceType="Work" />
          <ExperiencesList contactId={contactId} experienceType="Education" />
          <ExperiencesList contactId={contactId} experienceType="Service" />
          <ExperiencesList
            contactId={contactId}
            experienceType="Accomplishment"
          />

          <Paper className={classes.paper}>
            <Typography gutterBottom variant="h5" component="h1">
              Skills and Abilities
            </Typography>
            <Divider className={classes.divider} />
            <SkillsList contactId={contactId} tagType="Function" />
            <SkillsList contactId={contactId} tagType="Skill" />
            <SkillsList contactId={contactId} tagType="Topic" />
          </Paper>

          <ResumesList />
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={startResumeCreation}
        >
          Create Resume
        </Button>
      </Grid>
    </React.Fragment>
  );
};
ProfilePage.propTypes = {
  contactId: PropTypes.any.isRequired,
  contactInfo: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email_primary: PropTypes.object.isRequired,
    phone_primary: PropTypes.string.isRequired,
  }),
  refreshContacts: PropTypes.func.isRequired,
};

const dialogStyles = ({ breakpoints, palette, spacing, shadows }) => ({
  container: {
    width: spacing(50),
  },
  row: {
    margin: spacing(1.5, 0),
    display: 'inline-flex',
    justifyContent: 'center',
  },
  rowBottom: {
    margin: spacing(1.5, 0, 8, 0),
    display: 'inline-flex',
  },
  button: {
    width: '100%',
  },
  resume: {
    height: '200px',
    width: '160px',
    marginLeft: spacing(1),
  },
  resumeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: spacing(2),
  },
  line: {
    width: '50px',
    borderColor: palette.secondary.main,
    borderTop: '1px solid',
    margin: `11px ${spacing(1)}px`,
  },
});

const ResumeDialog = withStyles(dialogStyles)(
  ({ open, highlightExperiences, useStandardProfile, classes }) => {
    return (
      <Dialog open={open}>
        <DialogTitle>Choose Resume Style</DialogTitle>
        <DialogContent>
          <Grid container className={classes.container} justify="center">
            <Grid item xs={12}>
              <Grid container justify="space-between">
                <Grid item xs={6}>
                  <Typography>
                    Select relevant experiences to highlight at the top of your
                    resume.
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.resumeContainer}>
                  <img
                    src="/images/resume.svg"
                    alt="picture of a resume"
                    className={classes.resume}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8} className={classes.row}>
              <Button
                variant="contained"
                color="primary"
                onClick={highlightExperiences}
                className={classes.button}
              >
                Highlight Experiences
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <span className={classes.line} />
              <Typography> OR </Typography>
              <span className={classes.line} />
            </Grid>
            <Grid item xs={8} className={classes.rowBottom}>
              <Button
                variant="contained"
                onClick={useStandardProfile}
                className={classes.button}
              >
                Use Standard Profile
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  },
);

const drawerStyles = ({ breakpoints, palette, spacing, shadows }) => ({
  paper: {
    // This is the elevation for the drawer, we have to specify it this way
    // because of the defaults for persistent drawers in Material-UI
    boxShadow: shadows[2],
    borderBottom: 0,
  },
  container: {
    margin: spacing(2, 0, 3, 0),
  },
  item: {
    padding: spacing(0, 3),
  },
});

const SelectionDrawer = withStyles(drawerStyles)(
  ({ classes, onCancel, onNext }) => {
    return (
      <Drawer
        anchor="top"
        variant="persistent"
        open={true}
        classes={{
          paper: classes.paper,
        }}
      >
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={8}>
            <Grid item xs={12} className={classes.item}>
              <Typography variant="body1" component="p">
                Select the experiences you want to highlight at the top of your
                resume.
              </Typography>
            </Grid>
            <Grid container justify="flex-end" className={classes.item}>
              <Grid item>
                <Button onClick={onCancel}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={onNext}>
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    );
  },
);

const styles = ({ breakpoints, palette, spacing, shadows }) => ({
  page: {
    backgroundColor: 'hsl(216, 18%, 89%)',
  },
  wrapper: {
    marginBottom: spacing(5),
  },
  paper: {
    padding: spacing(2, 3, 3),
    marginBottom: spacing(5),
  },
  divider: {
    margin: spacing(1, 0),
  },
  leftIcon: {
    marginRight: spacing(1),
  },
});

export default withStyles(styles)(ProfilePage);
