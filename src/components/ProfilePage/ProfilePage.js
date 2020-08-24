import React from 'react';
import {useState, useEffect, useCallback, useRef} from 'react';
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

import ContactInfoDisplay from 'components/AboutMe/defaultDisplays/ContactInfoDisplay';
import ContactInfoForm from 'components/AboutMe/forms/ContactInfoForm';
import AboutMeForms from 'components/AboutMe/AboutMeForms';

import ExperiencesList from 'components/Experiences/ExperiencesList';
import ResumeCreator from 'components/ResumeCreator';
import SkillsSection from 'components/Skills/SkillsSection';
import CapabilityScores from 'components/CapabilityScores';
import DynamicInstructions from '../DynamicInstructions';

import HelpDrawer from 'components/SideBarDrawer/HelpDrawer';
import {createExternalLink} from 'lib/helperFunctions/helpers';
import {sumScores} from 'lib/helperFunctions/scoreAchievements';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {ResumeViewer} from 'components/ResumeCreator';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {useParams} from 'react-router-dom';

import CAPABILITIES from './capabilities.yml';

// Scroll only works consistently if it happens after any renders that might be
// happening concurrently, so this will wrap window.scrollTo for the latest
// render
const useScroll = ref => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (scroll !== null && ref.current) {
      ref.current.scrollTo(scroll);
      setScroll(null);
    }
  }, [ref, scroll, setScroll]);

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
  myContactId,
  contactParamId,
  contactId,
  contactInfo,
  myResume,
  getContactProfile,
  startResumeCreation,
  startResumeSelect,
  cancelResumeSelect,
  addContactSkill,
  generateResume,
  classes,
  showResumeDialog,
  showResumeSpinner,
  inSelectMode,
  createAboutMe,
  updateAboutMe,
  refreshDynamicInstructions,
}) => {
  const wrapperRef = useRef();
  const scrollTo = useScroll(wrapperRef);
  const [resumeLink, setResumeLink] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpenDrawer1, setOpenDrawer1] = React.useState(false);
  const [isOpenDrawer2, setOpenDrawer2] = React.useState(false);
  const [sidebarType, setSidebarType] = useState('work');
  const [editScores, setEditScores] = useState({});
  const [viewResume, setViewResume] = useState(false);
  const [resume, setResume] = useState({myResume: null});
  let experiences = {work: [], education: [], portfolio: []};
  if (
    contactInfo &&
    contactInfo.experiences &&
    contactInfo.experiences.length > 0
  )
    contactInfo.experiences.forEach(exp => {
      if (exp.type === 'Work') return experiences.work.push(exp);
      if (exp.type === 'Education') return experiences.education.push(exp);
      if (exp.type === 'Accomplishment') return experiences.portfolio.push(exp);
    });
  const haveExperience = experiences.work.length > 0;

  const updateEditScore = useCallback(
    expId => scores => {
      setEditScores(existing => ({
        ...existing,
        [expId]: scores,
      }));
    },
    [setEditScores]
  );

  //const editScore = sumScores(Object.values(editScores));

  const handleUpdateContact = async values => {
    await updateContact(values);
    setOpenForm(false);
  };
  const handleUpdateAboutMe = async (contactId, values) => {
    await updateAboutMe(contactId, values);
    await refreshDynamicInstructions(contactId);
  };

  const handleUpdateSkills = skills => {
    updateContact({
      id: contactId,
      skills: skills,
    });
  };

  const getProfile = useCallback(
    async contactId => {
      if (contactInfo === undefined || !contactInfo.experiences) {
        await getContactProfile(contactId);
      }
    },
    [contactInfo, getContactProfile]
  );

  useEffect(() => {
    getProfile(contactId);
  }, [contactId, getProfile]);

  // If the state for this contact hasn't been loaded yet, we try and reload
  // that state from the API. If this load goes well, this page should be
  // rerendered due to the Redux state update
  if (typeof contactInfo === 'undefined') {
    // TODO: Ideally we have a better empty/error state here
    return <div />;
  }

  const genResumeLocal = async () => {
    // TODO: How should we get the resume name for real?
    const resumeName = `${contactInfo.first_name}_${
      contactInfo.last_name
    }_${new Date().getTime()}`;
    const response = await generateResume(contactId, resumeName, myResume);
    setResumeLink(`/resume/${response.body.data.gdoc_id}`);
  };

  const startSelectLocal = () => {
    startResumeSelect();
    scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  // This page primarily serves as the top level container for the profile of
  // this person's employment-relevant experiences and skills.
  //
  // The three main components it makes use of are ContactInfoDisplay,
  // ExperiencesList, and SkillsList

  const onClickMoreDetails = header => {
    setSidebarType(header);
    setOpenSidebar(true);
    doOpenDrawer1();
  };

  const doOpenDrawer1 = () => {
    setOpenDrawer1(true);
    setOpenDrawer2(false);
  };
  const doOpenDrawer2 = () => {
    setOpenDrawer1(false);
    setOpenDrawer2(true);
  };

  const getContainerSize = breakpoint => {
    if (inSelectMode) {
      return 6;
    }

    if (breakpoint === 'sm') {
      return openSidebar ? 7 : 12;
    }
    if (breakpoint === 'md') {
      return openSidebar ? 8 : 12;
    }
    if (breakpoint === 'lg') {
      return openSidebar ? 9 : 12;
    }
    if (breakpoint === 'xl') {
      return openSidebar ? 10 : 12;
    }

    return 12;
  };

  let wrapperClass = classes.wrapper;
  if (inSelectMode) {
    wrapperClass = classes.wrapperDiv;
  } else if (openSidebar) {
    wrapperClass = classes.wrapperSmall;
  }

  const handleChange = event => {
    setViewResume(event.target.checked);
    window.scrollTo(0, 0);
  };

  const handleEditAboutMe = async () => {
    if (contactInfo.profile == null) {
      try {
        console.log('create profile');

        await createAboutMe(contactInfo.id);
      } catch (error) {
        console.error('Error creating new about-me', error);
      }
    }
    setOpenForm(true);
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
      <Grid
        container
        style={{flex: 1}}
        justify="flex-start"
        className={openSidebar ? classes.container : null}
      >
        <Grid
          item
          sm={getContainerSize('sm')}
          md={getContainerSize('md')}
          lg={getContainerSize('lg')}
          xl={getContainerSize('xl')}
        >
          <Grid
            style={{flex: 1}}
            id="divToPrint"
            ref={wrapperRef}
            container
            justify="center"
            className={wrapperClass}
          >
            <Grid item xs={12} sm={11}>
              <Grid container justify="center">
                <Grid item xs={12} md={8} lg={6}>
                  <div
                    className={
                      viewResume
                        ? `${classes.flexStart} ${classes.fixedContainer}`
                        : `${classes.fixedContainer}`
                    }
                  >
                    {haveExperience && (
                      <FormGroup row className={classes.previewResumeSwitch}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={viewResume}
                              onChange={handleChange}
                              name="preview"
                              color="primary"
                              data-testid="preview-resume-switch"
                            />
                          }
                          label="Preview Resume"
                        />
                      </FormGroup>
                    )}

                    {!inSelectMode && (
                      <CapabilityScores
                        contactCapabilities={contactInfo.capabilities}
                        editScores={{}}
                      />
                    )}
                  </div>

                  {viewResume && (
                    <div style={{marginBottom: '20px'}}>
                      <ResumeViewer
                        contactId={contactId}
                        resume={resume}
                        setResume={setResume}
                        viewOnly={true}
                        selected={null}
                        page="profile"
                      />
                    </div>
                  )}
                </Grid>
                {contactInfo && (
                  <DynamicInstructions
                    instructions={contactInfo.instructions}
                    id={contactInfo.id}
                    status={contactInfo.status}
                  />
                )}

                <Grid item xs={12}>
                  <Paper className={classes.BasicInfoPaper}>
                    <Grid container className={classes.headerContainer}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography
                            variant="h5"
                            component="h1"
                            style={{
                              fontWeight: '700',
                            }}
                          >
                            About Me
                          </Typography>
                        </Grid>

                        <Grid item>
                          {openForm && (
                            <IconButton
                              edge="end"
                              aria-label="cancel form"
                              onMouseDown={() => setOpenForm(false)}
                              className={classes.iconButton}
                            >
                              <CloseIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Typography
                          variant="subtitle1"
                          component="p"
                          className={classes.helpText}
                        >
                          Candidate information, value alignment, interests and
                          goals, programs and eligibility
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container justify="center">
                      {openForm ? (
                        <AboutMeForms
                          contact={contactInfo}
                          onSubmit={handleUpdateAboutMe}
                        />
                      ) : (
                        <Grid container justify="center">
                          <Grid item xs={12} md={9}>
                            <div className={classes.extraPadding}>
                              <ContactInfoDisplay
                                contact={contactInfo}
                                isOnEditMode={openForm}
                                onClickEdit={handleEditAboutMe}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>

                <SkillsSection
                  contactId={contactInfo.id}
                  contactStatus={contactInfo.status}
                  onClickMore={onClickMoreDetails}
                  splitScreen={inSelectMode}
                />
                <ExperiencesList
                  contactId={contactInfo.id}
                  contactStatus={contactInfo.status}
                  experienceType="Work"
                  onClickMore={onClickMoreDetails}
                  updateEditScore={updateEditScore}
                  experiences={experiences && experiences.work}
                />
                <ExperiencesList
                  contactId={contactInfo.id}
                  contactStatus={contactInfo.status}
                  experienceType="Education"
                  onClickMore={onClickMoreDetails}
                  updateEditScore={updateEditScore}
                  experiences={experiences && experiences.education}
                />

                <ExperiencesList
                  contactId={contactInfo.id}
                  contactStatus={contactInfo.status}
                  experienceType="Accomplishment"
                  onClickMore={onClickMoreDetails}
                  updateEditScore={updateEditScore}
                  experiences={experiences && experiences.portfolio}
                />

                {/*<ResumesList />*/}
                {/*inSelectMode ? null : (
                  <Grid
                    item
                    xs={openSidebar ? 8 : 11}
                    md={openSidebar ? 9 : 11}
                    xl={openSidebar ? 10 : 11}
                    align="center"
                  >
                    <Grid container justify="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={startSelectLocal}
                        className={classes.resumeButton}
                      >
                        Create Resume
                      </Button>
                    </Grid>
                  </Grid>
                )*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*inSelectMode ? (
            <Grid item xs={6} className={classes.wrapperDiv}>
              <ResumeCreator />
            </Grid>
          ) : null*/}
      </Grid>
      <Grid item>
        {openSidebar && (
          <HelpDrawer
            helpText={helpTextOptions[sidebarType]}
            capabilities={CAPABILITIES}
            skillsOnly={sidebarType === 'skills'}
            onClose={() => setOpenSidebar(false)}
            isOpenDrawer1={isOpenDrawer1}
            isOpenDrawer2={isOpenDrawer2}
            doOpenDrawer1={doOpenDrawer1}
            doOpenDrawer2={doOpenDrawer2}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};

const helpTextOptions = {
  work: {
    header: 'Experience',
    content: [
      'Employers want to see how your previous experience is relevant to the position. Include current and past work experience, but also any volunteering, community organizing, or leadership experience you may have.',
      '✦ Use 2 to 4 bullet points to describe your responsibilities and achievements',
      '✦ Start each with an action verb',
      '✦ Use numbers where you can to quantify your achievements',
    ],
  },
  education: {
    header: 'Education',
    content: [
      'Education can mean more than a degree. Have you taken classes to learn a skill or trade? Do you have a certificate or license you’ve earned? Have you been taking online courses?',
    ],
  },
  accomplishment: {
    header: 'Portfolio and Work Products',
    content: [
      'Include things that can further demonstrate your experience and abilities. This could be a portfolio or a personal website, a class project where you put new coding skills to use, or a presentation you gave at a local meetup.',
    ],
  },
  skills: {
    header: '',
    content: [''],
  },
};

ProfilePage.propTypes = {
  contactId: PropTypes.number,
  contactInfo: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email_primary: PropTypes.object,
    phone_primary: PropTypes.string,
  }),
  getContact: PropTypes.func,
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
                    alt="a resume"
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
    maxHeight: '64px',
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
            <Grid container justify="flex-end" className={classes.item}>
              <Grid item xs={10} className={classes.item}>
                <Typography variant="body1" component="p">
                  Select the experiences you want to highlight at the top of
                  your resume.
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={onCancel}>Cancel</Button>
              </Grid>
              <Grid item xs={1}>
                <Button variant="contained" color="primary">
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
  container: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  wrapper: {
    paddingBottom: spacing(5),
    width: '100%',
    flex: 1,
    // height: `calc(100vh - ${spacing(8)}px - 40px)`,
    height: 'auto',
    paddingLeft: '2vw',
    paddingRight: '2vw',
    [breakpoints.up('md')]: {
      paddingLeft: '0vw',
      paddingRight: '18vw',
    },
    [breakpoints.up('lg')]: {
      paddingLeft: '18vw',
    },
  },
  wrapperSmall: {
    flex: 1,

    marginBottom: spacing(5),
    width: '100%',
    // height: `calc(100vh - ${spacing(8)}px - 40px)`,
    height: 'auto',

    paddingLeft: '8vw',
  },
  wrapperDiv: {
    flex: 1,

    marginBottom: spacing(5),
    width: '100%',
    // height: `calc(100vh - ${spacing(8)}px - 40px)`,
    height: 'auto',

    overflow: 'auto',
  },

  paper: {
    padding: spacing(2, 3, 3),
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
    [breakpoints.down('xs')]: {
      margin: spacing(0.2),
    },
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
  aboutMeAndCloseIcon: {
    display: 'flex',
  },
  helpText: {
    marginLeft: '3px',
    color: '#5e5e5e',
    fontSize: '15px',
    fontWeight: 'normal',
  },
  iconButton: {
    marginRight: '5px',
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  instructions: {
    padding: spacing(2, 3, 3),
    paddingBottom: spacing(3),
    marginTop: spacing(5),
    [breakpoints.down('sm')]: {
      margin: spacing(0.2),
    },
  },
  steps: {
    fontSize: '17px',
  },
  stepNum: {
    fontWeight: 'bold',
    marginRight: '3px',
  },
  link: {
    color: palette.primary.link,
    marginLeft: '4px',
    '&:hover': {
      fontWeight: 'bold',
    },
  },
  resumeButton: {
    marginTop: spacing(5),
  },
  fixedContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '25px 0 10px 0',
    width: '100%',

    [breakpoints.up('md')]: {
      width: 'auto',
      position: 'fixed',
      display: 'block',
      margin: '0',
      top: '150px',
      right: '15px',
    },
  },
  flexStart: {
    margin: '35px 0 0px 3vw',
    justifyContent: 'start',
    [breakpoints.up('sm')]: {
      margin: '25px 0 5px 0px',
    },
    [breakpoints.up('md')]: {
      justifyContent: 'center',
      margin: '0px',
    },
  },

  previewResumeSwitch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.up('md')]: {
      width: '100%',

      marginBottom: '20px',
    },
  },
  extraPadding: {
    width: '100%',
    padding: '0px 30px 0px 30px',
  },
});

export default withStyles(styles)(ProfilePage);
