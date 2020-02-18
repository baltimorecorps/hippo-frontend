import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Droppable} from 'react-beautiful-dnd';

const ResumeSection = ({
  classes,
  sectionId,
  sectionLabel,
  children,
  enableDrag,
}) => (
  <div className={classes.section}>
    <div className={classes.header}>{sectionLabel}</div>
    {enableDrag ? (
      <Droppable droppableId={sectionId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ) : (
      children
    )}
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
    marginBottom: spacing(2),
    borderBottom: 'solid 2px #2079c7',
  },
});

export default withStyles(styles)(ResumeSection);
