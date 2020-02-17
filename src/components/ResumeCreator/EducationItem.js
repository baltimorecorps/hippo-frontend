import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Draggable} from 'react-beautiful-dnd';

const formatDate = experience => {
  return `${experience.start_month.slice(0, 3)} ${experience.start_year}`;
};

const EducationItem = ({classes, experience, index}) => {
  return (
    <Draggable draggableId={`${experience.id}`} index={index}>
      {provided => (
        <div
          className={`${classes.item}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={classes.dateCol}>
            <span className={classes.date}>{formatDate(experience)}</span>
          </div>
          <div className={classes.contentCol}>
            <span className={classes.org}>{experience.host}</span>
            <span className={classes.degree}>{experience.title}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  item: {
    display: 'inline-flex',
    width: '100%',
    flexDirection: 'row',
    fontWeight: 400,
    fontSize: '9pt',
    fontFamily: 'Quicksand',
    marginBottom: spacing(1),
  },
  dateCol: {
    display: 'inline-flex',
    minWidth: '75px',
  },
  contentCol: {
    display: 'inline-flex',
    flexDirection: 'column',
    minWidth: '75px',
  },
  date: {
    fontWeight: 400,
    fontSize: '10pt',
    fontFamily: 'Merriweather',
  },
  org: {
    fontWeight: 400,
    fontSize: '10pt',
    fontFamily: 'Merriweather',
  },
  degree: {
    paddingTop: spacing(0.5),
  },
});

export default withStyles(styles)(EducationItem);
