import React, {useState, useEffect, useRef, useReducer} from 'react';
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
const headerHeight = 100;

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
  header: {
    height: `${headerHeight}px`,
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
  body: {
    height: `calc(100% - ${headerHeight}px)`,
  },
  bodyNoHeader: {
    height: '100%',
  },
  page: {
    width: '8.5in',
    height: '11in',
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

// Calculates whether or not the returned ref  is currently overflowing its
// layout, and if so calls 'onOverflow'
const useOverflow = onOverflow => {
  const overflowRef = useRef();

  // We need this effect to rerun on every update, since it actually depends on
  // the layout of the page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (overflowRef.current) {
      const el = overflowRef.current;
      const isOverflowing = el.clientHeight < el.scrollHeight;
      if (isOverflowing) {
        onOverflow();
      }
    }
  });

  return [overflowRef];
};

const PageLayout = ({
  sections,
  header,
  index,
  selected,
  addRefs,
  enableDrag,
}) => {
  const classes = useStyles();

  const refs = {};
  refs.left = useRef();
  refs.right = useRef();

  useEffect(() => {
    addRefs(refs);
  }, [addRefs, refs]);
  const bodyClass = header ? classes.body : classes.bodyNoHeader;

  const sectionLabels = header
    ? {
        experience: 'Relevant Experience',
        capabilities: 'Skills & Abilities',
        portfolio: 'Projects',
        education: 'Education',
      }
    : {
        experience: 'Additional Experience',
        capabilities: 'Additional Skills',
        portfolio: 'Additional Projects',
        education: 'Additional Education',
      };

  return (
    <Grid container className={classes.page}>
      {header && (
        <Grid item xs={12} className={classes.header}>
          <Grid container>
            <Grid item xs={9} className={classes.vertical}>
              <span className={classes.name}>{header.name}</span>
              <span className={classes.vocation}>{header.vocation}</span>
            </Grid>
            <Grid item xs={3} className={classes.headerDetails}>
              <span>{header.address}</span>
              <span>{header.phone}</span>
              <span>{header.email}</span>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} className={bodyClass}>
        <Grid container className={classes.overflow}>
          <Grid item xs={8} className={classes.overflow} ref={refs.left}>
            {sections.experience.length && <ResumeSection
              classes={classes}
              sectionId={`experience${index}`}
              sectionLabel={sectionLabels.experience}
            >
              {sections.experience.map(
                (experience, index) =>
                  selected &&
                  selected[experience.id].selected && (
                    <ExperienceItem
                      key={experience.id}
                      experience={experience}
                      index={index}
                      achievements={selected[experience.id]}
                    />
                  )
              )}
            </ResumeSection>}
          </Grid>
          <Grid item xs={4} className={classes.overflow} ref={refs.right}>
            {sections.capabilities.length && <ResumeSection
              sectionId={'capabilities'} // must match state key
              sectionLabel={sectionLabels.capabilities}
            >
              {sections.capabilities
                .map((capability, index) => (
                  <CapabilityItem
                    key={capability.id}
                    capability={capability}
                    index={index}
                  />
                ))}
            </ResumeSection>}
            {sections.portfolio.length && (
              <ResumeSection
                sectionId={'portfolio'} // must match state key
                sectionLabel={sectionLabels.portfolio}
              >
                {sections.portfolio
                  .map(
                    (experience, index) =>
                      selected &&
                      selected[experience.id].selected && (
                        <PortfolioItem
                          key={experience.id}
                          experience={experience}
                          index={index}
                        />
                      )
                  )}
              </ResumeSection>
            )}
            {sections.education.length && (
              <ResumeSection
                sectionId={'education'} // must match state key
                sectionLabel={sectionLabels.education}
              >
                {sections.education
                  .map(
                    (experience, index) =>
                      selected &&
                      selected[experience.id].selected && (
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
  );
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

export const overflowReducer = (state, action) => {
  // Push one item down from the page index given to the next page down
  const push = (index, side) => {
    const fromBreakpoint = state.breakpoints[index];
    const toBreakpoint = state.breakpoints[index + 1] || {left: 0, right: 0};
    const newBreakpoints = [...state.breakpoints];

    // We should leave at least one item on each page, no matter what
    if (fromBreakpoint[side] <= 1) {
      return state;
    }

    const newFromBreakpoint = {...fromBreakpoint};
    const newToBreakpoint = {...toBreakpoint};
    newFromBreakpoint[side] -= 1;
    newToBreakpoint[side] += 1;
    newBreakpoints[index] = newFromBreakpoint;
    newBreakpoints[index + 1] = newToBreakpoint;
    return {
      ...state,
      breakpoints: newBreakpoints,
    };
  };

  switch (action.type) {
    case 'add-refs':
      return {
        ...state,
        refs: [...state.refs, action.payload],
        breakpoints: [...state.breakpoints, {left: 0, right: 0}],
      };
    case 'set-totals':
      return {
        ...state,
        totals: action.payload,
        breakpoints: [{...action.payload}],
      };
    case 'reflow':
      return {
        ...state,
        breakpoints: [{...state.totals}],
      };
    case 'push-left':
      return push(action.index, 'left');
    case 'push-right':
      return push(action.index, 'right');
  }
};

const useOverflowLayout = () => {
  const [state, dispatch] = useReducer(overflowReducer, {
    refs: [],
    totals: {left: null, right: null},
    breakpoints: [],
  });

  const isOverflowing = el => {
    if (el.current) {
      return el.current.clientHeight < el.current.scrollHeight;
    } else {
      return false;
    }
  };

  const isDone = (side, index) => {
    if (!isOverflowing(state.refs[index][side])) {
      return true;
    }

    // If the breakpoint is 1 and we are still overflowing, that means we are
    // only laying out one item anyway and so we just give up on not
    // overflowing (the user has to fix this)
    if (state.breakpoints[index][side] <= 1) {
      return true;
    }
    return false;
  };

  // We need this effect to rerun on every update, since it actually depends on
  // the layout of the page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let index = 0;

    // Find the index of the first page that is overflowing
    while (
      index < state.refs.length &&
      isDone('left', index) &&
      isDone('right', index)
    ) {
      index += 1;
    }
    if (index >= state.refs.length) {
      return;
    }

    if (!isDone('left', index)) {
      console.log('left');
      //dispatch({type: 'push-left', index});
    }
    if (!isDone('right', index)) {
      console.log('right');
      //dispatch({type: 'push-right', index});
    }
  });

  const addRefs = refs => {
    dispatch({
      type: 'add-refs',
      payload: refs,
    });
  };

  const setTotals = (totalLeft, totalRight) => {
    dispatch({
      type: 'set-totals',
      payload: {left: totalLeft, right: totalRight},
    });
  };

  const reflow = () => {
    dispatch({
      type: 'reflow',
    });
  };

  return {breakpoints: state.breakpoints, addRefs, setTotals, reflow};
};

const ResumeCreator = ({
  printRef,
  sections,
  contactId,
  moveResumeItem,
  refreshExperiences,
  getContactCapabilities,
}) => {
  console.log('sections', sections);
  const classes = useStyles();
  const [selected, setSelected] = useState(null);

  const totalLeft = sections.experience.length;
  const totalRight =
    sections.education.length +
    sections.portfolio.length +
    sections.capabilities.length;
  const {breakpoints, addRefs, setTotals, reflow} = useOverflowLayout();
  useEffect(() => {
    if (
      sections.experience.length +
        sections.education.length +
        sections.portfolio.length ===
      0
    ) {
    } else {
      //setTotals({left: totalLeft, right: totalRight});
    }
  }, [sections, refreshExperiences]);

  useEffect(() => {
    if (sections.capabilities.length === 0) {
      getContactCapabilities();
    } else {
      //setTotals({left: totalLeft, right: totalRight});
    }
  }, [sections, getContactCapabilities]);


  // Fill the page sections based the breakpoints
  let leftIndex = 0;
  let rightIndex = 0;
  let pageSections = [...new Array(breakpoints.length)].map(() => ({
    experience: [],
    education: [],
    portfolio: [],
    capabilities: [],
  }));

  if (pageSections.length === 0) {
    pageSections = [{
      experience: [],
      education: [],
      portfolio: [],
      capabilities: [],
    }]
  }

  for (let i = 0; i < totalLeft; i++) {
    const pageSection = pageSections[leftIndex];
    while (pageSection.experience.length === breakpoints[leftIndex]) {
      leftIndex += 1;
    }
    pageSection.experience.push(sections.experience[i]);
  }

  for (let i = 0; i < totalRight; i++) {
    const pageSection = pageSections[rightIndex];
    while (
      pageSection.education.length +
        pageSection.portfolio.length +
        pageSection.capabilities.length ===
      breakpoints[rightIndex]
    ) {
      rightIndex += 1;
    }

    let itemIndex = i;
    if (sections.capabilities.length < itemIndex) {
      pageSection.capabilities.push(sections.capabilities[i]);
    } else {
      itemIndex -= sections.capabilities.length;
    }

    if (sections.education.length < itemIndex) {
      pageSection.education.push(sections.education[i]);
    } else {
      itemIndex -= sections.education.length;
    }

    if (sections.portfolio.length < itemIndex) {
      pageSection.portfolio.push(sections.portfolio[i]);
    } else {
      itemIndex -= sections.portfolio.length;
    }
  }

    /*
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
  */

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

  const header = {
    name: 'David Koh',
    vocation: 'Software Engineer',
    address: 'Tuscaloosa, AL',
    phone: '+1 (555) 123 1234',
    email: 'david@example.com',
  }

  const updateSelected = newSelected => {
    reflow();
    setSelected(newSelected);
  };

  console.log(sections);
  console.log(pageSections);
  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <SelectDrawer
        sections={sections}
        drawerWidth={drawerWidth}
        setSelected={updateSelected}
        selected={selected}
      />
          {/*pageSections.map((page, i) => (
        <Paper>
          <PageLayout
            key={i}
            index={i}
            header={i === 0 ? header : null}
            sections={sections}
            selected={selected}
            addRefs={addRefs}
          />
              </Paper>
      ))*/}
      {/*
      <PrintComponent
        classes={classes}
        printRef={printRef}
        pageSections={
        sections={sections}
        leftOverflowIndex={leftOverflowIndex}
        capabilitiesOverflow={capabilitiesOverflow}
        capabilitiesBreakpoint={capabilitiesBreakpoint}
        showPortfolio={showPortfolio}
        portfolioBreakpoint={portfolioBreakpoint}
        showEducation={showEducation}
        educationBreakpoint={educationBreakpoint}
      />*/}
    </DragDropContext>
  );
};
export default ResumeCreator;
