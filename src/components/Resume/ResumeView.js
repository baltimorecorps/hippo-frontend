import React, {useRef} from 'react';
import {ResumeViewer} from 'components/ResumeCreator';
import Button from '@material-ui/core/Button';
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
    width: '100%',
  },
});

export default withStyles(styles)(ResumeView);
