import React, {useState, useEffect, useRef} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {DragDropContext} from 'react-beautiful-dnd';
import ResumeSection from './ResumeSection';
import ExperienceItem from './ExperienceItem';
import CapabilityItem from './CapabilityItem';
import EducationItem from './EducationItem';
import PortfolioItem from './PortfolioItem';
import SelectDrawer from './SelectDrawer';

const drawerWidth = 400;

const useStyles = makeStyles(({breakpoints, palette, spacing}) => ({
  root: {
    display: 'flex',
  },
  spacer: {
    width: drawerWidth,
  },
  container: {
    height: '100%',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  paper: {
    width: '8.5in',
    height: '11in',
    padding: `${spacing(3)}px ${spacing(4)}px`,
    fontFamily: 'Merriweather',
  },
  body: {
    height: '908px',
  },
  overflow: {
    height: '100%',
    flexShrink: 1,
    overflow: 'hidden',
  },
  printDiv: {
    height: '100%',
    width: '8.5in',
  },
  paperAdditional: {
    marginTop: spacing(2),
    width: '8.5in',
    height: '11in',
    padding: `${spacing(3)}px ${spacing(4)}px`,
    fontFamily: 'Merriweather',
  },
  name: {
    fontWeight: 700,
    fontSize: '20pt',
    paddingTop: spacing(2),
    paddingBottom: spacing(1),
  },
  vocation: {
    fontWeight: 400,
    fontSize: '12pt',
    color: '#93c47d',
  },
  header: {
    height: '100px',
    padding: spacing(1),
    backgroundColor: '#f4f0de',
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing(2.5),
    fontWeight: 300,
    fontSize: '9pt',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  capability: {
    marginTop: spacing(1),
    fontWeight: 300,
    fontFamily: 'Merriweather',
    fontSize: '10pt',
  },
  skill: {
    paddingTop: spacing(0.5),
    paddingLeft: spacing(2),
    fontWeight: 400,
    fontFamily: 'Quicksand',
    fontSize: '9pt',
  },
  section: {
    display: 'inline-flex',
    flexDirection: 'column',
    paddingLeft: spacing(1),
    marginRight: spacing(2),
  },
  sectionHeader: {
    fontWeight: 400,
    fontSize: '12pt',
    color: '#2079c7',
    paddingTop: spacing(3),
    paddingBottom: spacing(0.5),
    paddingLeft: spacing(1),
    marginBottom: spacing(0.5),
    borderBottom: 'solid 2px #2079c7',
  },
}));

/*
 * {sections:
 *  experience: [
 *    {id: 4}
 *  ]
 *  }
 */

const useOverflow = (defaultLength, name) => {
  const [overflow, setOverflow] = useState(null);
  const overflowRef = useRef();

  let overflowIndex = defaultLength;
  if (overflow !== null) {
    overflowIndex = overflow;
  }

  // We need this effect to rerun on every update, since it actually depends on
  // the layout of the page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (overflowRef.current) {
      const el = overflowRef.current;
      const isOverflowing = el.clientHeight < el.scrollHeight;
      if (isOverflowing) {
        setOverflow(over => {
          if (over === null) {
            over = defaultLength - 1;
          } else {
            over = over - 1;
          }
          return over;
        });
      }
    }
  });

  const reflow = () => setOverflow(null);
  return [overflowIndex, overflowRef, reflow];
};

const PrintComponent = ({
  printRef,
  sections,
  leftOverflowIndex,
  capabilitiesOverflow,
  capabilitiesBreakpoint,
  showPortfolio,
  portfolioBreakpoint,
  showEducation,
  educationBreakpoint,
}) => {
  const classes = useStyles();
  return (
    <div style={{display: 'none'}}>
      <div ref={printRef} className={classes.printDiv}>
        <div className={classes.paper}>
          <Grid container className={classes.overflow}>
            <Grid item xs={12} className={classes.header}>
              <Grid container>
                <Grid item xs={9} className={classes.vertical}>
                  <span className={classes.name}>David Koh</span>
                  <span className={classes.vocation}>Software Engineer</span>
                </Grid>
                <Grid item xs={3} className={classes.headerDetails}>
                  <span>Tuscaloosa, AL</span>
                  <span>(555) 123-4567</span>
                  <span>david@example.com</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.body}>
              <Grid container className={classes.overflow}>
                <Grid item xs={8} className={classes.overflow}>
                  <ResumeSection
                    sectionId={'experience'} // must match state key
                    sectionLabel="Relevant Experience"
                  >
                    {sections.experience
                      .slice(0, leftOverflowIndex)
                      .map((experience, index) => (
                        <ExperienceItem
                          key={experience.id}
                          experience={experience}
                          index={index}
                        />
                      ))}
                  </ResumeSection>
                </Grid>
                <Grid item xs={4} className={classes.overflow}>
                  <ResumeSection
                    sectionId={'capabilities'} // must match state key
                    sectionLabel="Skills & Abilities"
                  >
                    {sections.capabilities
                      .slice(0, capabilitiesBreakpoint)
                      .map((capability, index) => (
                        <CapabilityItem
                          key={capability.id}
                          capability={capability}
                          index={index}
                        />
                      ))}
                  </ResumeSection>
                  {showPortfolio && (
                    <ResumeSection
                      sectionId={'portfolio'} // must match state key
                      sectionLabel="Projects"
                    >
                      {sections.portfolio

                        .slice(0, portfolioBreakpoint)
                        .map((experience, index) => (
                          <PortfolioItem
                            key={experience.id}
                            experience={experience}
                            index={index}
                          />
                        ))}
                    </ResumeSection>
                  )}
                  {showEducation && (
                    <ResumeSection
                      sectionId={'education'} // must match state key
                      sectionLabel="Education"
                    >
                      {sections.education
                        .slice(0, educationBreakpoint)

                        .map((experience, index) => (
                          <EducationItem
                            key={experience.id}
                            experience={experience}
                            index={index}
                          />
                        ))}
                    </ResumeSection>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.paperAdditional}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8} className={classes.overflow}>
                  <ResumeSection
                    sectionId={'experience'} // must match state key
                    sectionLabel="Additional Experience"
                  >
                    {sections.experience
                      .slice(leftOverflowIndex)
                      .map((experience, index) => (
                        <ExperienceItem
                          key={experience.id}
                          experience={experience}
                          index={index}
                        />
                      ))}
                  </ResumeSection>
                </Grid>
                <Grid item xs={4} className={classes.overflow}>
                  {capabilitiesOverflow && (
                    <ResumeSection
                      sectionId={'capabilities'} // must match state key
                      sectionLabel="Additional Skills"
                    >
                      {sections.capabilities
                        .slice(capabilitiesBreakpoint)
                        .map((capability, index) => (
                          <CapabilityItem
                            key={capability.id}
                            capability={capability}
                            index={index}
                          />
                        ))}
                    </ResumeSection>
                  )}
                  {!showPortfolio && (
                    <ResumeSection
                      sectionId={'portfolio'} // must match state key
                      sectionLabel="Projects"
                    >
                      {sections.portfolio

                        .slice(portfolioBreakpoint)
                        .map((experience, index) => (
                          <PortfolioItem
                            key={experience.id}
                            experience={experience}
                            index={index}
                          />
                        ))}
                    </ResumeSection>
                  )}
                  {!showEducation && (
                    <ResumeSection
                      sectionId={'education'} // must match state key
                      sectionLabel="Education"
                    >
                      {sections.education
                        .slice(educationBreakpoint)

                        .map((experience, index) => (
                          <EducationItem
                            key={experience.id}
                            experience={experience}
                            index={index}
                          />
                        ))}
                    </ResumeSection>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

const ResumeCreator = ({
  printRef,
  sections,
  contactId,
  moveResumeItem,
  refreshExperiences,
  getContactCapabilities,
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (
      sections.experience.length +
        sections.education.length +
        sections.portfolio.length ===
      0
    ) {
      refreshExperiences();
    }
  }, [sections, refreshExperiences]);

  useEffect(() => {
    if (sections.capabilities.length === 0) {
      getContactCapabilities();
    }
  }, [sections, getContactCapabilities]);

  const [leftOverflowIndex, leftOverflowRef, reflowLeft] = useOverflow(
    sections.experience.length,
    'left'
  );

  const [rightOverflowIndex, rightOverflowRef, reflowRight] = useOverflow(
    sections.capabilities.length +
      sections.portfolio.length +
      sections.education.length,
    'right'
  );

  const capabilitiesOverflow =
    rightOverflowIndex < sections.capabilities.length;
  const capabilitiesBreakpoint = rightOverflowIndex;

  const showPortfolio = rightOverflowIndex > sections.capabilities.length;
  const portfolioBreakpoint = rightOverflowIndex - sections.capabilities.length;
  const portfolioOverflow = portfolioBreakpoint < sections.portfolio.length;

  const showEducation =
    rightOverflowIndex >
    sections.capabilities.length + sections.portfolio.length;
  const educationBreakpoint =
    rightOverflowIndex -
    sections.capabilities.length -
    sections.portfolio.length;
  const educationOverflow = educationBreakpoint < sections.education.length;

  const dragEndHandler = ({destination, source, draggableId}) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveResumeItem(
      parseInt(draggableId),
      {
        section: destination.droppableId,
        index: destination.index,
      },
      {
        section: source.droppableId,
        index: source.index,
      }
    );
  };

  if (
    selected === null &&
    sections.experience.length +
      sections.education.length +
      sections.portfolio.length >
      0
  ) {
    let newSelected = {};
    Object.values(sections).forEach(section => {
      section.forEach(experience => {
        newSelected[experience.id] = {selected: true};
        if (experience.achievements) {
          experience.achievements.forEach(ach => {
            newSelected[experience.id][ach.id] = true;
          });
        }
      });
    });
    setSelected(newSelected);
  }

  const updateSelected = (newSelected) => {
    reflowLeft();
    reflowRight();
    setSelected(newSelected);
  }

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <SelectDrawer
        sections={sections}
        drawerWidth={drawerWidth}
        setSelected={updateSelected}
        selected={selected}
      />
      <div className={classes.root}>
        <div className={classes.spacer} />

        <Grid container justify="center" className={classes.container}>
          <Paper className={classes.paper}>
            <Grid container className={classes.overflow}>
              <Grid item xs={12} className={classes.header}>
                <Grid container>
                  <Grid item xs={9} className={classes.vertical}>
                    <span className={classes.name}>David Koh</span>
                    <span className={classes.vocation}>Software Engineer</span>
                  </Grid>
                  <Grid item xs={3} className={classes.headerDetails}>
                    <span>Tuscaloosa, AL</span>
                    <span>(555) 123-4567</span>
                    <span>david@example.com</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.body}>
                <Grid container className={classes.overflow}>
                  <Grid
                    item
                    xs={8}
                    className={classes.overflow}
                    ref={leftOverflowRef}
                  >
                    <ResumeSection
                      sectionId={'experience'} // must match state key
                      sectionLabel="Relevant Experience"
                    >
                      {sections.experience
                        .slice(0, leftOverflowIndex)
                        .map(
                          (experience, index) =>
                            selected && selected[experience.id].selected && (
                              <ExperienceItem
                                key={experience.id}
                                experience={experience}
                                index={index}
                                achievements={selected[experience.id]}
                              />
                            )
                        )}
                    </ResumeSection>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    className={classes.overflow}
                    ref={rightOverflowRef}
                  >
                    <ResumeSection
                      sectionId={'capabilities'} // must match state key
                      sectionLabel="Skills & Abilities"
                    >
                      {sections.capabilities
                        .slice(0, capabilitiesBreakpoint)
                        .map((capability, index) => (
                          <CapabilityItem
                            key={capability.id}
                            capability={capability}
                            index={index}
                          />
                        ))}
                    </ResumeSection>
                    {showPortfolio && (
                      <ResumeSection
                        sectionId={'portfolio'} // must match state key
                        sectionLabel="Projects"
                      >
                        {sections.portfolio

                          .slice(0, portfolioBreakpoint)
                          .map(
                            (experience, index) =>
                              selected && selected[experience.id].selected && (
                                <PortfolioItem
                                  key={experience.id}
                                  experience={experience}
                                  index={index}
                                />
                              )
                          )}
                      </ResumeSection>
                    )}
                    {showEducation && (
                      <ResumeSection
                        sectionId={'education'} // must match state key
                        sectionLabel="Education"
                      >
                        {sections.education
                          .slice(0, educationBreakpoint)

                          .map(
                            (experience, index) =>
                              selected && selected[experience.id].selected && (
                                <EducationItem
                                  key={experience.id}
                                  experience={experience}
                                  index={index}
                                />
                              )
                          )}
                      </ResumeSection>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paperAdditional}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={8} className={classes.overflow}>
                    <ResumeSection
                      sectionId={'experience'} // must match state key
                      sectionLabel="Additional Experience"
                    >
                      {sections.experience
                        .slice(leftOverflowIndex)
                        .map((experience, index) => (
                          <ExperienceItem
                            key={experience.id}
                            experience={experience}
                            index={index}
                          />
                        ))}
                    </ResumeSection>
                  </Grid>
                  <Grid item xs={4} className={classes.overflow}>
                    {capabilitiesOverflow && (
                      <ResumeSection
                        sectionId={'capabilities'} // must match state key
                        sectionLabel="Additional Skills"
                      >
                        {sections.capabilities
                          .slice(capabilitiesBreakpoint)
                          .map((capability, index) => (
                            <CapabilityItem
                              key={capability.id}
                              capability={capability}
                              index={index}
                            />
                          ))}
                      </ResumeSection>
                    )}
                    {portfolioOverflow && (
                      <ResumeSection
                        sectionId={'portfolio'} // must match state key
                        sectionLabel="Additional Projects"
                      >
                        {sections.portfolio
                          .slice(portfolioBreakpoint)
                          .map((experience, index) => (
                            <PortfolioItem
                              key={experience.id}
                              experience={experience}
                              index={index}
                            />
                          ))}
                      </ResumeSection>
                    )}
                    {educationOverflow && (
                      <ResumeSection
                        sectionId={'education'} // must match state key
                        sectionLabel="Additional Education"
                      >
                        {sections.education
                          .slice(educationBreakpoint)

                          .map((experience, index) => (
                            <EducationItem
                              key={experience.id}
                              experience={experience}
                              index={index}
                            />
                          ))}
                      </ResumeSection>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
      <PrintComponent
        classes={classes}
        printRef={printRef}
        sections={sections}
        leftOverflowIndex={leftOverflowIndex}
        capabilitiesOverflow={capabilitiesOverflow}
        capabilitiesBreakpoint={capabilitiesBreakpoint}
        showPortfolio={showPortfolio}
        portfolioBreakpoint={portfolioBreakpoint}
        showEducation={showEducation}
        educationBreakpoint={educationBreakpoint}
      />
    </DragDropContext>
  );
};
export default ResumeCreator;
