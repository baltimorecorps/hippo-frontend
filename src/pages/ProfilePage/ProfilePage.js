import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import withStyles from '@material-ui/core/styles/withStyles';

import BasicInfoDisplay from 'modules/Users/BasicInfoDisplay';
import BasicInfoForm from 'modules/Users/BasicInfoForm';
import ExperiencesList from 'modules/Experiences/ExperiencesList';
import SkillsList from 'modules/Tags/SkillsList';
import ResumesList from 'modules/Resumes/ResumesList';

import html2canvas from 'html2canvas';

import HelpDrawer from '../../modules/SideBarDrawer/HelpDrawer';

// Scroll only works consistently if it happens after any renders that might be
// happening concurrently, so this will wrap window.scrollTo for the latest
// render
const useScroll = () => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (scroll !== null) {
      window.scrollTo(scroll);
      setScroll(null);
    }
  }, [scroll, setScroll]);

  const scrollTo = (...args) => {
    if (args.length >= 2) {
      setScroll({top: args[0], left: args[1]});
    } else {
      setScroll(args[0]);
    }
  };

  return scrollTo;
};

const ProfilePage = ({
  updateContact,
  contactId,
  contactInfo,
  resume,
  refreshContacts,
  startResumeCreation,
  startResumeSelect,
  cancelResumeSelect,
  generateResume,
  classes,
  showResumeDialog,
  showResumeSpinner,
  inSelectMode,
}) => {
  const scrollTo = useScroll();

  const [resumeLink, setResumeLink] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [helpText, setHelpText] = useState();

  const handleUpdateContact = async values => {
    await updateContact(values);
    refreshContacts();
    setOpenForm(false);
  };

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

  const genResumeLocal = async () => {
    // TODO: How should we get the resume name for real?
    const resumeName = `${contactInfo.first_name}_${
      contactInfo.last_name
    }_${new Date().getTime()}`;
    const response = await generateResume(contactId, resumeName, resume);
    setResumeLink(`/resume/${response.body.data.gdoc_id}`);
  };

  const startSelectLocal = () => {
    startResumeSelect();
    scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  // This page primarily serves as the top level container for the profile of
  // this person's employment-relevant experiences and skills.
  //
  // The three main components it makes use of are BasicInfoDisplay,
  // ExperiencesList, and SkillsList

  const onClickMoreDetails = header => {
    setHelpText(helpTextOptions[header]);
    setOpenSidebar(true);
  };

  return (
    <React.Fragment>
      <ResumeDialog
        open={showResumeDialog}
        onCancel={cancelResumeSelect}
        highlightExperiences={startSelectLocal}
        useStandardProfile={genResumeLocal}
      />
      <Modal open={showResumeSpinner}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.progress}
        >
          <CircularProgress />
        </Grid>
      </Modal>
      {resumeLink ? <Redirect to={resumeLink} /> : null}

      {inSelectMode ? (
        <SelectionDrawer
          onNext={genResumeLocal}
          onCancel={cancelResumeSelect}
        />
      ) : null}
      <Grid container justify="space-between">
        <Grid
          item
          xs={openSidebar ? 8 : 11}
          md={openSidebar ? 9 : 11}
          xl={openSidebar ? 10 : 11}
        >
          <Grid
            id="divToPrint"
            container
            justify={openSidebar ? 'center' : 'flex-end'}
            className={classes.wrapper}
          >
            <Grid item xs={11}>
              <Grid container>
                <Grid item xs={12}>
                  <Paper className={classes.BasicInfoPaper}>
                    <div className={classes.headerContainer}>
                      <Typography
                        variant="h5"
                        component="h1"
                        style={{
                          fontWeight: '700',
                        }}
                      >
                        About Me
                      </Typography>
                    </div>
                    <Grid container justify="center">
                      {openForm ? (
                        <BasicInfoForm
                          contact={contactInfo}
                          onSubmit={handleUpdateContact}
                          onCloseForm={() => setOpenForm(false)}
                        />
                      ) : (
                        <BasicInfoDisplay
                          firstName={contactInfo.first_name}
                          lastName={contactInfo.last_name}
                          email={email}
                          phone={contactInfo.phone_primary}
                          onClickEdit={() => setOpenForm(true)}
                        />
                      )}
                    </Grid>
                  </Paper>
                </Grid>

                <ExperiencesList
                  contactId={contactId}
                  experienceType="Work"
                  onClickMore={onClickMoreDetails}
                />
                <ExperiencesList
                  contactId={contactId}
                  experienceType="Education"
                  onClickMore={onClickMoreDetails}
                />
                {/*<ExperiencesList contactId={contactId} experienceType="Service" />*/}
                <ExperiencesList
                  contactId={contactId}
                  experienceType="Accomplishment"
                  onClickMore={onClickMoreDetails}
                />

                {/*<ResumesList />*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={openSidebar ? 4 : 1}
          md={openSidebar ? 3 : 1}
          xl={openSidebar ? 2 : 1}
        >
          {openSidebar && (
            <HelpDrawer
              helpText={helpText}
              onClose={() => setOpenSidebar(false)}
            />
          )}
        </Grid>
      </Grid>
      {inSelectMode ? null : (
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={startResumeCreation}
          >
            Create Resume
          </Button>
        </Grid>
      )}
    </React.Fragment>
  );
};

const helpTextOptions = {
  work: {header: 'Experience', content: 'Experience help text content.'},
  education: {header: 'Education', content: 'Education help text content.'},
  accomplishment: {
    header: 'Portfolio and Work Products',
    content: 'Portfolio and Work Products help text content.',
  },
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

const dialogStyles = ({breakpoints, palette, spacing, shadows}) => ({
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
  ({open, onCancel, highlightExperiences, useStandardProfile, classes}) => {
    return (
      <Dialog open={open} onClose={onCancel}>
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
  }
);

const drawerStyles = ({breakpoints, palette, spacing, shadows}) => ({
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
  ({classes, onCancel, onNext}) => {
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
  }
);

const styles = ({breakpoints, palette, spacing, shadows}) => ({
  page: {
    backgroundColor: 'hsl(216, 18%, 89%)',
  },
  wrapper: {
    marginBottom: spacing(5),
  },
  paper: {
    padding: spacing(2, 3, 3),
    marginBottom: spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  divider: {
    margin: spacing(1, 0),
  },
  leftIcon: {
    marginRight: spacing(1),
  },
  progress: {
    height: '100%',
  },
  BasicInfoPaper: {
    padding: spacing(2, 3, 3),
    paddingBottom: spacing(3),
    marginTop: spacing(5),
    marginBottom: spacing(5),
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
});

export default withStyles(styles)(ProfilePage);
