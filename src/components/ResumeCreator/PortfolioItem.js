import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import DragWrapper from './DragWrapper';

const formatDate = experience => {
  if (experience.start_month !== 'none') {
    return `${experience.start_month.slice(0, 3)} ${experience.start_year}`;
  } else {
    return `${experience.start_year}`;
  }
};

const PortfolioItem = ({classes, experience, index, enableDrag}) => {
  const innerComponent = (
    <div className={classes.item}>
      <div className={classes.dateCol}>
        <span className={classes.date}>{formatDate(experience)}</span>
      </div>
      <div className={classes.contentCol}>
        <span className={classes.title}>{experience.title}</span>
        <span className={classes.description}>{experience.description}</span>
      </div>
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
  title: {
    fontWeight: 400,
    fontSize: '10pt',
    fontFamily: 'Merriweather',
  },
  description: {
    paddingTop: spacing(0.5),
  },
});

export default withStyles(styles)(PortfolioItem);
