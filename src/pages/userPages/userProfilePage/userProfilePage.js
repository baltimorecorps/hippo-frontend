//libraries
import React from 'react';
import {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';

//stlyes
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//files
import AboutMeForms from 'components/aboutMeComponents/forms/AboutMeForms';
import ExperiencesList from 'components/experienceComponents/ExperiencesList';
import SkillsSection from 'components/userProfileComponents/skillComponents/SkillsSection';
import CapabilityScores from 'components/userProfileComponents/capabilityScores';
import DynamicInstructions from '../../../components/DynamicInstructions';
import HelpDrawer from 'components/userProfileComponents/drawerComponents/experienceHelperDrawer';
import {ResumeViewer} from 'components/resumeComponents';
import {blankInstructions} from '../../../components/DynamicInstructions/dynamicInstructionComponents/defaultValues';
import CAPABILITIES from '../../../assets/yml/capabilities.yml';

const UserProfilePage = ({
  contactId,
  contactInfo,
  getContactProfile,
  classes,
  inSelectMode,
  createAboutMe,
  updateAboutMe,
  refreshDynamicInstructions,
}) => {
  const wrapperRef = useRef();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpenDrawer1, setOpenDrawer1] = React.useState(false);
  const [isOpenDrawer2, setOpenDrawer2] = React.useState(false);
  const [sidebarType, setSidebarType] = useState('work');
  const [viewResume, setViewResume] = useState(false);
  const [resume, setResume] = useState({myResume: null});
  const [expandPanel, setExpandPanel] = useState({
    candidate_information: true,
    value_alignment: false,
    interests: false,
    programs: false,
  });
  const [openAboutMeForms, setOpenAboutMeForms] = useState({
    candidate_information: false,
    value_alignment: false,
    interests: false,
    programs: false,
  });

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

  const handleUpdateAboutMe = async (contactId, values) => {
    await updateAboutMe(contactId, values);
    await refreshDynamicInstructions(contactId);
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

  if (
    contactInfo !== undefined &&
    contactInfo.experiences &&
    contactInfo.profile === null
  ) {
    (async () => {
      try {
        await createAboutMe(contactInfo.id);
      } catch (error) {
        console.error('Error creating new about-me', error);
      }
    })();
  }

  // If the state for this contact hasn't been loaded yet, we try and reload
  // that state from the API. If this load goes well, this page should be
  // rerendered due to the Redux state update
  if (typeof contactInfo === 'undefined') {
    // TODO: Ideally we have a better empty/error state here
    return <div />;
  }

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

  return (
    <React.Fragment>
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
                        viewOnly
                        selected={null}
                        page="profile"
                      />
                    </div>
                  )}
                </Grid>
                {contactInfo && (
                  <DynamicInstructions
                    instructions={contactInfo.instructions || blankInstructions}
                    id={contactInfo.id}
                    status={contactInfo.status}
                    openAboutMeForms={openAboutMeForms}
                    setOpenAboutMeForms={setOpenAboutMeForms}
                    expandPanel={expandPanel}
                    setExpandPanel={setExpandPanel}
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
                              scrollMarginTop: '100px',
                            }}
                            id="about-me-section"
                          >
                            About Me{' '}
                            {contactInfo.instructions &&
                              contactInfo.instructions.about_me.is_complete ===
                                false && <span style={{color: 'red'}}>*</span>}
                          </Typography>
                        </Grid>

                        <Grid item></Grid>
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
                      <AboutMeForms
                        contact={contactInfo}
                        onSubmit={handleUpdateAboutMe}
                        openAboutMeForms={openAboutMeForms}
                        setOpenAboutMeForms={setOpenAboutMeForms}
                        expandPanel={expandPanel}
                        setExpandPanel={setExpandPanel}
                      />
                    </Grid>
                  </Paper>
                </Grid>
                {contactInfo.instructions && (
                  <React.Fragment>
                    <SkillsSection
                      isCompleted={
                        contactInfo.instructions.profile.components.tag_skills
                      }
                      contactId={contactInfo.id}
                      contactStatus={contactInfo.status}
                      onClickMore={onClickMoreDetails}
                      splitScreen={inSelectMode}
                    />
                    <ExperiencesList
                      sectionName="work-section"
                      isCompleted={
                        contactInfo.instructions.profile.components
                          .add_experience.is_complete
                      }
                      contactId={contactInfo.id}
                      contactStatus={contactInfo.status}
                      experienceType="Work"
                      onClickMore={onClickMoreDetails}
                      experiences={experiences && experiences.work}
                    />
                    <ExperiencesList
                      sectionName="education-section"
                      isCompleted={
                        contactInfo.instructions.profile.components
                          .add_education
                      }
                      contactId={contactInfo.id}
                      contactStatus={contactInfo.status}
                      experienceType="Education"
                      onClickMore={onClickMoreDetails}
                      experiences={experiences && experiences.education}
                    />

                    <ExperiencesList
                      sectionName="portfolio-section"
                      contactId={contactInfo.id}
                      contactStatus={contactInfo.status}
                      experienceType="Accomplishment"
                      onClickMore={onClickMoreDetails}
                      experiences={experiences && experiences.portfolio}
                    />
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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

UserProfilePage.propTypes = {
  contactId: PropTypes.number,
  contactInfo: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    phone_primary: PropTypes.string,
  }),
  getContact: PropTypes.func,
};

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
    height: 'auto',

    paddingLeft: '8vw',
  },
  wrapperDiv: {
    flex: 1,

    marginBottom: spacing(5),
    width: '100%',
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
    marginRight: '2px',
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
  editButton: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
});

export default withStyles(styles)(UserProfilePage);
