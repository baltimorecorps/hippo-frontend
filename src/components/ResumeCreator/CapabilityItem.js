import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Draggable} from 'react-beautiful-dnd';

const CapabilityItem = ({classes, capability, index}) => {
  const skills = capability.skills.concat(capability.suggested_skills);
  return (
    <Draggable draggableId={`${capability.id}`} index={index}>
      {provided => (
        <div
          className={`${classes.item}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className={classes.capability}>{capability.name}</span>
          {skills.map(skill => (
            <span className={classes.skill}>{skill.name}</span>
          ))}
        </div>
      )}
    </Draggable>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  item: {
    display: 'inline-flex',
    width: '100%',
    flexDirection: 'column',
    fontWeight: 400,
    fontSize: '9pt',
    fontFamily: 'Quicksand',
    marginBottom: spacing(1),
  },
  itemDrag: {
    padding: spacing(1),
    borderRadius: '1px',
    backgroundColor: '#fbfbfb',
    boxShadow: '0 1px 1px rgba(9,30,66,.25)',
  },
  capability: {
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
});

export default withStyles(styles)(CapabilityItem);
