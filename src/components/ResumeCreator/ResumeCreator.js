import React, {useState, useEffect, useRef, useReducer} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {createClickTracking} from 'lib/helperFunctions/helpers';

import {DragDropContext} from 'react-beautiful-dnd';
import ResumeSection from './ResumeSection';
import ExperienceItem from './ExperienceItem';
import CapabilityItem from './CapabilityItem';
import EducationItem from './EducationItem';
import PortfolioItem from './PortfolioItem';
import SelectDrawer from './SelectDrawer';
import ReactToPrint from 'react-to-print';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  paper: {
    marginTop: spacing(2),
  },
  header: {
    height: `${headerHeight}px`,
    padding: spacing(1),
    backgroundColor: palette.resume.gray,
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing(2.5),
    fontWeight: 300,
    fontSize: '9pt',
  },
  headerDetailText: {
    paddingTop: spacing(1),
    color: palette.resume.blue,
  },
  name: {
    fontSize: '20pt',
    color: palette.resume.blue,
    marginTop: spacing(2),
    marginLeft: spacing(1),
    marginBottom: spacing(1),
  },
  vocation: {
    fontWeight: 400,
    fontSize: '12pt',
    color: palette.resume.yellow,
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
    padding: `${spacing(3)}px ${spacing(4)}px`,
    fontFamily: 'Merriweather',
  },
  overflow: {
    height: '100%',
    flexShrink: 1,
    overflow: 'hidden',
  },
  printDiv: {
    height: '100%',
  },
  paperAdditional: {
    marginTop: spacing(2),
    width: '8.5in',
    height: '11in',
    padding: `${spacing(3)}px ${spacing(4)}px`,
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
    color: palette.resume.blue,
    paddingTop: spacing(3),
    paddingBottom: spacing(0.5),
    paddingLeft: spacing(1),
    marginBottom: spacing(0.5),
    borderBottom: 'solid 2px ${palette.resume.blue}',
  },
  buttonContainer: {
    width: '8.5in',
  },
  printButton: {
    margin: `${spacing(2)}px 0`,
    position: 'fixed',
    bottom: 0,
    zIndex: 1,
    left: '47%',
    [breakpoints.down('md')]: {
      left: '46%',
    },
    [breakpoints.down('sm')]: {
      left: '45%',
    },
    [breakpoints.down('xs')]: {
      left: '44%',
    },
  },
}));

const PageLayout = ({
  sections,

  header,
  index,
  selected,
  refs,
  enableDrag,
}) => {
  const classes = useStyles();

  let leftRef = null;
  let rightRef = null;
  if (refs) {
    leftRef = refs[0];
    rightRef = refs[1];
  }

  const bodyClass = header ? classes.body : classes.bodyNoHeader;
  const sectionLabels = header
    ? {
        experience: 'Experience',
        capabilities: 'Skills and Abilities',
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
              {/*TODO: <span className={classes.vocation}>{header.vocation}</span>*/}
            </Grid>
            <Grid item xs={3} className={classes.headerDetails}>
              {/*TODO: <span className={classes.headerDetailText}>{header.address}</span>*/}
              <span className={classes.headerDetailText}>{header.phone}</span>
              <span className={classes.headerDetailText}>{header.email}</span>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} className={bodyClass}>
        <Grid container className={classes.overflow}>
          <Grid item xs={8} className={classes.overflow} ref={leftRef}>
            {sections.experience.length ? (
              <ResumeSection
                sectionId={`experience${index}`}
                sectionLabel={sectionLabels.experience}
              >
                {sections.experience.map((experience, index) => (
                  <ExperienceItem
                    key={experience.id}
                    experience={experience}
                    index={index}
                    achievements={selected[experience.id]}
                  />
                ))}
              </ResumeSection>
            ) : null}
          </Grid>
          <Grid item xs={4} className={classes.overflow} ref={rightRef}>
            {sections.capabilities.length ? (
              <ResumeSection
                sectionId={'capabilities'} // must match state key
                sectionLabel={sectionLabels.capabilities}
              >
                {sections.capabilities.map((capability, index) => (
                  <CapabilityItem
                    key={capability.id}
                    capability={capability}
                    selected={selected[capability.id]}
                    index={index}
                  />
                ))}
              </ResumeSection>
            ) : null}
            {sections.education.length ? (
              <ResumeSection
                sectionId={'education'} // must match state key
                sectionLabel={sectionLabels.education}
              >
                {sections.education.map((experience, index) => (
                  <EducationItem
                    key={experience.id}
                    experience={experience}
                    index={index}
                  />
                ))}
              </ResumeSection>
            ) : null}
            {sections.portfolio.length ? (
              <ResumeSection
                sectionId={'portfolio'} // must match state key
                sectionLabel={sectionLabels.portfolio}
              >
                {sections.portfolio.map((experience, index) => (
                  <PortfolioItem
                    key={experience.id}
                    experience={experience}
                    index={index}
                  />
                ))}
              </ResumeSection>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useOverflow = defaultLength => {
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
    const el = overflowRef.current;
    if (!el) {
      return;
    }

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
  });

  const reflow = () => setOverflow(null);
  return [overflowIndex, overflowRef, reflow];
};

export const fillPageSections = (sections, breakpoints) => {
  if (!sections || !breakpoints || breakpoints[0].left === 0) {
    return [];
  }

  // Fill the page sections based the breakpoints
  let leftIndex = 0;
  let rightIndex = 0;
  let pageSections = [...new Array(breakpoints.length)].map(() => ({
    experience: [],
    education: [],
    portfolio: [],
    capabilities: [],
  }));

  for (let i = 0; i < sections.experience.length; i++) {
    while (
      pageSections[leftIndex].experience.length === breakpoints[leftIndex].left
    ) {
      leftIndex += 1;
    }
    const pageSection = pageSections[leftIndex];
    pageSection.experience.push(sections.experience[i]);
  }

  for (
    let i = 0;
    i <
    sections.capabilities.length +
      sections.education.length +
      sections.portfolio.length;
    i++
  ) {
    while (
      pageSections[rightIndex].education.length +
        pageSections[rightIndex].portfolio.length +
        pageSections[rightIndex].capabilities.length ===
      breakpoints[rightIndex].right
    ) {
      rightIndex += 1;
    }
    const pageSection = pageSections[rightIndex];

    let itemIndex = i;
    if (itemIndex < sections.capabilities.length) {
      pageSection.capabilities.push(sections.capabilities[itemIndex]);
    } else {
      itemIndex -= sections.capabilities.length;
      if (itemIndex < sections.education.length) {
        pageSection.education.push(sections.education[itemIndex]);
      } else {
        itemIndex -= sections.education.length;
        pageSection.portfolio.push(sections.portfolio[itemIndex]);
      }
    }
  }
  return pageSections;
};

const PrintComponent = ({printRef, header, pageSections, selected}) => {
  const classes = useStyles();
  return (
    <div style={{display: 'none'}}>
      <div ref={printRef} className={classes.printDiv}>
        {pageSections.map((page, i) => (
          <PageLayout
            key={i}
            index={i}
            header={i === 0 ? header : null}
            sections={page}
            selected={selected}
            refs={null}
          />
        ))}
      </div>
    </div>
  );
};

const ResumeCreator = ({
  sections,
  contact,
  contactId,
  resume,
  setResume,
  moveResumeItem,
  refreshExperiences,
  getContact,
  getContactCapabilities,
  viewOnly,
  hidePrint,
  disableSpacer,
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(resume);

  const printTarget = useRef();

  const totalLeft = sections.experience.length;
  const totalRight =
    sections.education.length +
    sections.portfolio.length +
    sections.capabilities.length;

  const [leftOverflowIndex, leftOverflowRef, reflowLeft] = useOverflow(
    totalLeft
  );
  const [rightOverflowIndex, rightOverflowRef, reflowRight] = useOverflow(
    totalRight
  );

  useEffect(() => {
    if (!contact) {
      getContact();
    }
  }, [sections, refreshExperiences, contact, getContact]);

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

  let breakpoints = [{left: totalLeft, right: totalRight}];
  if (leftOverflowIndex !== totalLeft || rightOverflowIndex !== totalRight) {
    breakpoints = [
      {left: leftOverflowIndex, right: rightOverflowIndex},
      {
        left: totalLeft - leftOverflowIndex,
        right: totalRight - rightOverflowIndex,
      },
    ];
  }

  if (
    selected === null ||
    Object.keys(selected).length <
      sections.experience.length +
        sections.education.length +
        sections.portfolio.length +
        sections.capabilities.length
  ) {
    let newSelected = {};
    Object.entries(sections).forEach(([key, section]) => {
      section.forEach(item => {
        newSelected[item.id] = {selected: true};
        if (item.achievements) {
          item.achievements.forEach(ach => {
            newSelected[item.id][ach.id] = true;
          });
        }
        if (key === 'capabilities' && item.skills) {
          item.skills.forEach(skill => {
            newSelected[item.id][skill.id] = true;
          });
          item.suggested_skills.forEach(skill => {
            newSelected[item.id][skill.id] = true;
          });
        }
      });
    });
    setSelected(newSelected);
    setResume(newSelected);
  }
  setResume(selected);

  let pageSections = [];

  if (sections) {
    let filteredSections = sections;
    if (selected) {
      filteredSections = {};
      Object.entries(sections).forEach(([key, section]) => {
        filteredSections[key] = section.filter(item =>
          selected[item.id] ? selected[item.id].selected : true
        );
      });
    }
    pageSections = fillPageSections(filteredSections, breakpoints);
  }

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

  const header = {
    name: contact ? `${contact.first_name} ${contact.last_name}` : '',
    //TODO: re-add once we have these
    //vocation: '',
    //address: '',
    phone: contact ? contact.phone_primary : '',
    email: contact && contact.email_primary ? contact.email_primary.email : '',
  };

  const updateSelected = newSelected => {
    reflowLeft();
    reflowRight();
    setSelected(newSelected);
  };

  const onClickPrintResume = () => {
    createClickTracking(
      'Submitting Application',
      'Click Print Resume',
      'Click Print Resume'
    );
  };

  const viewComponent = (
    <div className={classes.container}>
      {!hidePrint ? (
        <div className={classes.buttonContainer}>
          <ReactToPrint
            trigger={() => (
              <Button
                variant="contained"
                color="primary"
                className={classes.printButton}
                onClick={onClickPrintResume}
              >
                Print Resume
              </Button>
            )}
            content={() => printTarget.current}
          />
        </div>
      ) : null}

      {pageSections.map((page, i) => (
        <Paper key={i} className={classes.paper}>
          <PageLayout
            key={i}
            index={i}
            header={i === 0 ? header : null}
            sections={page}
            selected={selected}
            refs={i === 0 ? [leftOverflowRef, rightOverflowRef] : null}
          />
        </Paper>
      ))}
      <PrintComponent
        printRef={printTarget}
        pageSections={pageSections}
        selected={selected}
        header={header}
      />
    </div>
  );

  if (viewOnly) {
    return viewComponent;
  } else {
    return (
      <DragDropContext onDragEnd={dragEndHandler}>
        <div className={classes.root}>
          <SelectDrawer
            sections={sections}
            drawerWidth={drawerWidth}
            setSelected={updateSelected}
            selected={selected}
          />
          {disableSpacer ? null : <div className={classes.spacer} />}
          <div className={classes.editContainer}>{viewComponent}</div>
        </div>
      </DragDropContext>
    );
  }
};
export default ResumeCreator;
