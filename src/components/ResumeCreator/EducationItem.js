import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import DragWrapper from './DragWrapper';
import ResumeSection from './ResumeSection';

const formatDate = experience => {
  return `${experience.start_month.slice(0, 3)} ${experience.start_year}`;
};

const EducationItem = ({
  classes,
  sectionId,
  sectionLabel,
  experience,
  education,
  selected,
  index,
  enableDrag,
}) => {
  const hasExperience = education.filter(exp => selected && selected[exp.id]);
  const innerComponent = (
    <ResumeSection sectionId={sectionId} sectionLabel={sectionLabel}>
      {hasExperience.map((experience, index) => (
        <div className={classes.item} key={index}>
          <div className={classes.dateCol}>
            <span className={classes.date}>{formatDate(experience)}</span>
          </div>
          <div className={classes.contentCol}>
            <span className={classes.org}>{experience.host}</span>
            <span
              className={classes.degree}
            >{`${experience.degree} in ${experience.title}`}</span>
          </div>
        </div>
      ))}
    </ResumeSection>
  );

  if (enableDrag) {
    return (
      <DragWrapper index={index} dragId={`${experience.id}`}>
        {innerComponent}
      </DragWrapper>
    );
  } else {
    if (hasExperience.length > 0) {
      return innerComponent;
    } else {
      return null;
    }
  }
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
