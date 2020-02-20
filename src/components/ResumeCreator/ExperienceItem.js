import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import DragWrapper from './DragWrapper';

const formatDate = experience => {
  return (
    `${experience.start_month} ${experience.start_year}` +
    ' - ' +
    `${experience.end_month} ${experience.end_year}`
  );
};

const ExperienceItem = ({
  classes,
  experience,
  achievements,
  index,
  enableDrag,
}) => {
  const innerComponent = (
    <div className={classes.item}>
      <div>
        <span className={classes.org}>{experience.host} &mdash; </span>
        <span className={classes.location}>{experience.location}</span>
      </div>
      <span className={classes.title}>{experience.title}</span>
      <span className={classes.dates}>{formatDate(experience)}</span>
      {experience.achievements.map(achievement =>
        achievements[achievement.id] ? (
          <span key={achievement.id} className={classes.achievement}>
            {achievement.description}
          </span>
        ) : null
      )}
    </div>
  );

  if (enableDrag) {
    return (
      <DragWrapper index={index} dragId={`${experience.id}`}>
        {innerComponent}
      </DragWrapper>
    );
  } else {
    return innerComponent;
  }
};

const styles = ({breakpoints, palette, spacing}) => ({
  item: {
    display: 'inline-flex',
    width: '100%',
    flexDirection: 'column',
    marginBottom: spacing(1.5),
    padding: spacing(1),
    borderLeft: 'solid 3px #93c47d',
    fontWeight: 400,
    fontSize: '9pt',
    fontFamily: 'Quicksand',
  },
  itemDrag: {
    borderRadius: '1px',
    backgroundColor: '#fbfbfb',
    boxShadow: '0 1px 1px rgba(9,30,66,.25)',
  },
  org: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
    fontWeight: 400,
    fontSize: '10pt',
    fontFamily: 'Merriweather',
  },
  title: {
    paddingTop: spacing(0.5),
    fontWeight: 400,
    fontSize: '10pt',
    fontFamily: 'Merriweather',
  },
  location: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
    fontWeight: 400,
    fontFamily: 'Merriweather',
    fontSize: '10pt',
    fontStyle: 'italic',
  },
  dates: {
    marginTop: spacing(1),
    fontWeight: 300,
    fontFamily: 'Merriweather',
    fontSize: '9pt',
    color: '#434343',
  },
  achievement: {
    paddingLeft: spacing(2),
    paddingTop: spacing(0.5),
  },
});

export default withStyles(styles)(ExperienceItem);
