import React from 'react';
import {ResumeViewer} from 'components/ResumeCreator';
import withStyles from '@material-ui/core/styles/withStyles';

const ResumeView = ({classes, match}) => {
  return (
    <div className={classes.wrapper}>
      <ResumeViewer contactId={match.params.contactId} viewOnly />
    </div>
  );
};

const styles = ({breakpoints, palette, spacing, shadows}) => ({
  wrapper: {
    width: '100%',
  },
});

export default withStyles(styles)(ResumeView);
