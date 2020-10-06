import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {ResumeViewer} from 'components/ResumeCreator';
import {createExternalLink} from 'lib/helperFunctions/helpers';

const ReviewApplication = ({
  page,
  classes,
  application,
  contactId,
  opportunityId,
  getApplication,
}) => {
  const [resume, setResume] = useState(application && application.resume);

  useEffect(() => {
    if (!application || application.length === 0) {
      getApplication(contactId, opportunityId);
    }
  }, [application, getApplication, contactId, opportunityId]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <Typography variant="h5" component="h1" className={classes.header}>
            Review Application
          </Typography>
        </div>
        <div>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Title:</strong>
            {(application && application.opportunity.title) || ''}
          </Typography>
          <Typography variant="body2" component="h2" className={classes.title}>
            <strong>Organization:</strong>{' '}
            {(application && application.opportunity.org_name) || ''}
          </Typography>
        </div>
        <div className={classes.opportunityDescription}>
          <Typography className={classes.description}>
            {application && application.opportunity.short_description}
            <br />
          </Typography>
          <Typography className={classes.link}>
            {createExternalLink(
              'View full description',
              application && application.opportunity.gdoc_link,
              classes.link
            )}
          </Typography>
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <div>
          <Typography
            variant="h6"
            component="h1"
            style={{
              fontWeight: '700',
            }}
          >
            Interest Statement
          </Typography>
        </div>
        <Typography className={classes.interestStatement}>
          {application && application.interest_statement}
        </Typography>
      </Paper>
      {application && application.resume && (
        <ResumeViewer
          contactId={application && application.contact.id}
          resume={resume}
          setResume={setResume}
          viewOnly={true}
          page="staff"
        />
      )}
    </React.Fragment>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
  header: {
    fontWeight: 700,
    textAlign: 'center',
  },
  title: {
    fontSize: '17px',
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
  },
  link: {
    color: palette.primary.link,
    marginTop: spacing(1),
  },
  description: {
    textAlign: 'justify',
    textIndent: '25px',
  },
  opportunityContent: {
    marginBottom: spacing(2),
  },
  interestStatement: {
    textIndent: '25px',
    textAlign: 'justify',
  },
});

export default withStyles(styles)(ReviewApplication);
