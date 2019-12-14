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
import SkillsSection from 'components/SkillsSection';

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
  addContactSkill,
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
  const [sidebarType, setSidebarType] = useState('work');
  const [loading, setLoading] = useState(false);

  const handleUpdateContact = async values => {
    await updateContact(values);
    setOpenForm(false);
  };

  const handleUpdateSkills = skills => {
    updateContact({
      id: contactId,
      skills: skills,
    });
  };

  useEffect(() => {
    if (
      !loading &&
      typeof contactInfo == 'undefined' &&
      contactId !== 'undefined'
    ) {
      setLoading(true);
      (async () => {
        await refreshContacts();
        setLoading(false);
      })();
    }
  }, [loading, setLoading, contactId, contactInfo, refreshContacts]);

  // If the state for this contact hasn't been loaded yet, we try and reload
  // that state from the API. If this load goes well, this page should be
  // rerendered due to the Redux state update
  if (typeof contactInfo === 'undefined') {
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
    setSidebarType(header);
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
          md={openSidebar ? 9 : 12}
          xl={openSidebar ? 10 : 12}
          className={openSidebar ? classes.container : null}
        >
          <Grid
            id="divToPrint"
            container
            justify="center"
            className={classes.wrapper}
          >
            <Grid item xs={12} sm={11}>
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
                <SkillsSection
                  header="Tell us more to help your resume stand out"
                  contactSkills={contactInfo.skills}
                  onChange={handleUpdateSkills}
                  addSkill={skill => addContactSkill(contactId, skill)}
                  deleteSkill={skill => {
                    console.log(skill);
                  }}
                  onClickMore={onClickMoreDetails}
                  openSidebar={openSidebar}
                />

                {/*<ResumesList />*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={openSidebar ? 3 : null} xl={openSidebar ? 2 : null}>
          {openSidebar && (
            <HelpDrawer
              helpText={helpTextOptions[sidebarType]}
              skillInfo={skillHelpTextInfo}
              skillsOnly={sidebarType === 'skills'}
              onClose={() => setOpenSidebar(false)}
              isMoreClicked={openSidebar}
            />
          )}
        </Grid>
      </Grid>
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
              onClick={startResumeCreation}
            >
              Create Resume
            </Button>
          </Grid>
        </Grid>
      )*/}
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

const skillHelpTextInfo = {
  names: [
    'Process Improvement',
    'Project Management',
    'Communication',
    'Data Analysis',
    'Software Development',
  ],
  contents: {
    'Process Improvement': {
      summary:
        'Process Improvement is the ability to understand and improve the process that some group or organization uses to accomplish some goal.',
      examples: [
        'Changing the way a food bank packs and/or delivers lunches so they can deliver more with less',
        'Helping a store sell more of its products by making sure customers can find what they are looking for more easily',
        'Helping teachers integrate new technology into their classes so they can better help their students',
      ],
      questions: [
        'What were people or organizations you’ve helped or worked with in the past trying to do?',
        'What was their process for doing it?',
        'Did you help them change those processes to improve?',
        'Have you ever investigated why something was done the way that it was?',
        'Who did you tell about what you found out?',
        'Did you find anything that you thought could have been done better?',
        'Have you worked with metrics or other ways of measuring how well a process was going that you were involved with?',
        'Did you have any ideas to make those numbers go up?',
        'Did you try and make those ideas a reality?',
        'What was your experience like trying to do that, and how did it turn out?',
      ],
    },

    Communication: {
      summary:
        'Communication skills are what you use to understand others and to help others understand you.',
      examples: [
        "Listening to a customers' problem and helping to resolve it",
        'Writing up your ideas for what a community organization should focus on next year and sharing with the group',
        'Creating a presentation that you have to give to multiple audiences',
      ],

      questions: [
        'Have you ever had to write up a summary or a report to help someone else understand an issue?',
        'What were your main points you wanted to get across?',
        'Did your report help that person make a decision?',
        'Have you done any public speaking or an oral presentation?',
        'What was the topic?',
        'Who was the audience?',
        'Have you ever helped people or an organization with their social media accounts or content on their website?',
        'How did you plan what to write?',
        'What was the goal of writing the posts and how did it turn out?',
      ],
    },

    'Project Management': {
      summary:
        'Project Management is the planning and organizing the work of a team to meet a goal or complete a task.',
      examples: [
        'Planning an event where you identified what was needed and made a plan to get it',
        'Leading a class project where you tracked the completion of different steps until the due date',
        'Figuring out how to deliver a community project under budget',
      ],

      questions: [
        'Have you ever worked on a project or effort that involved multiple steps?',
        'Who were the other people involved?',
        'How did you come up with a plan?',
        'How did you communicate progress?',
        "Have you stepped up to take on a project when other's hadn't or wouldn't?",
        'What did you see as an opportunity?',
        'Did you convince others to join you?',
        'Have you had to work with a set amount of money to make something?',
        'How did you decide how much to spend on the various parts?',
        'Did you have creative ideas on how to make the most of your budget?',
        'Were you able to stay within the budget?',
      ],
    },

    'Data Analysis': {
      summary:
        'Data analysis is the application of critical thinking and statistical methods to identify, summarize, and communicate key insights about a collection of information.',
      examples: [
        'Summarizing the results of a survey',
        'Exploring the relationship between different variables in a dataset',
        'Tracking your spending habits and predicting whether you will be over or under budget based on current expenses and expected income',
      ],
      questions: [
        'Have you ever used data to answer a question about a cause or issue you cared about?',
        'How did you frame the question?',
        'What kind of data did you use and how did you use it to answer your question?',
        'Has anyone ever asked you to summarize the key takeaways from a collection of data?',
        'What kinds of insights did you pull from the data?',
        'How did you communicate those insights to others?',
        'Have you ever used data to estimate or predict something uncertain?',
        'How did you choose which variables to base your estimate on?',
        'What methods did you use to generate possible outcomes from the existing information?',
      ],
    },
    'Software Development': {
      summary:
        'Software development is the application of a systematic approach to the engineering, operation, and maintenance of a piece of software, such as a pogramming script, website, or desktop application.',
      examples: [
        'Writing a script to automate a simple workflow',
        'Building a website or API as part of a class assignment or side project',
        'Contributing to an open source project on GitHub or at your local meetup',
      ],
      questions: [
        'Have you ever had to write a piece of code to accomplish a task?',
        'How did you approach this process?',
        'What languages or frameworks did you use?',
        'Have you ever had to maintain or conribute to an existing code base?',
        'What features did you add or bugs did you fix?',
        'How did you manage versions of the code you were working on?',
      ],
    },
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
  container: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
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
    [breakpoints.down('xs')]: {
      margin: spacing(0.2),
    },
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
});

export default withStyles(styles)(ProfilePage);
