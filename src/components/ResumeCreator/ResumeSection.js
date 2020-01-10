import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Droppable} from 'react-beautiful-dnd';

import ExperienceItem from './ExperienceItem';

const ResumeSection = ({classes, section, sectionId, sectionLabel}) => (
  <div className={classes.section}>
    <div className={classes.header}>{sectionLabel}</div>
    <Droppable droppableId={sectionId}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {section.map((experience, index) => (
            <ExperienceItem
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

const styles = ({breakpoints, palette, spacing}) => ({
  section: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: spacing(1),
    paddingRight: spacing(2),
  },
  header: {
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

export default withStyles(styles)(ResumeSection);
