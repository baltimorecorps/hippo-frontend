import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import {DragDropContext} from 'react-beautiful-dnd';
import ResumeSection from './ResumeSection';
import ExperienceItem from './ExperienceItem';
import CapabilityItem from './CapabilityItem';
import EducationItem from './EducationItem';
import PortfolioItem from './PortfolioItem';

/*
 * {sections:
 *  experience: [
 *    {id: 4}
 *  ]
 *  }
 */

const ResumeCreator = ({
  classes,
  sections,
  contactId,
  moveResumeItem,
  refreshExperiences,
  getContactCapabilities,
}) => {
  useEffect(() => {
    if (sections.experience.length === 0) {
      refreshExperiences();
    }
  }, [sections, refreshExperiences]);

  useEffect(() => {
    if (sections.capabilities.length === 0) {
      getContactCapabilities();
    }
  }, [sections, getContactCapabilities]);

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
  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Grid container className={classes.container}>
        <Paper className={classes.paper}>
          <Grid container>
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
              <Grid container>
                <Grid item xs={8}>
                  <ResumeSection
                    sectionId={'experience'} // must match state key
                    sectionLabel="Relevant Experience"
                  >
                    {sections.experience.map((experience, index) => (
                      <ExperienceItem
                        key={experience.id}
                        experience={experience}
                        index={index}
                      />
                    ))}
                  </ResumeSection>
                </Grid>
                <Grid item xs={4}>
                  <ResumeSection
                    sectionId={'capabilities'} // must match state key
                    sectionLabel="Skills & Abilities"
                  >
                    {sections.capabilities.map((capability, index) => (
                      <CapabilityItem
                        key={capability.id}
                        capability={capability}
                        index={index}
                      />
                    ))}
                  </ResumeSection>
                  <ResumeSection
                    sectionId={'portfolio'} // must match state key
                    sectionLabel="Projects"
                  >
                    {sections.portfolio.map((experience, index) => (
                      <PortfolioItem
                        key={experience.id}
                        experience={experience}
                        index={index}
                      />
                    ))}
                  </ResumeSection>
                  <ResumeSection
                    sectionId={'education'} // must match state key
                    sectionLabel="Education"
                  >
                    {sections.education.map((experience, index) => (
                      <EducationItem
                        key={experience.id}
                        experience={experience}
                        index={index}
                      />
                    ))}
                  </ResumeSection>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </DragDropContext>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: `${spacing(3)}px ${spacing(4)}px`,
    fontFamily: 'Merriweather',
    //height: '11.5in',
  },
  container: {
    margin: `${spacing(5)}px ${spacing(0)}px`,
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
  body: {},
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
});

export default withStyles(styles)(ResumeCreator);
