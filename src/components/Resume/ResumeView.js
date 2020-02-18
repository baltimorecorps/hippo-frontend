import React from 'react';
import {ResumeViewer} from 'components/ResumeCreator';
import withStyles from '@material-ui/core/styles/withStyles';

const ResumeView = ({classes, match}) => {
  return (
    <div className={classes.wrapper}>
      <ResumeViewer contactId={match.params.contactId} />
    </div>
  );
};

const styles = ({breakpoints, palette, spacing, shadows}) => ({
  wrapper: {
    width: '8in',
    height: '11.5in',
  },
});

export default withStyles(styles)(ResumeView);
