import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PeopleIcon from '@material-ui/icons/People';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ClearIcon from '@material-ui/icons/Clear';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {formatDate, formatTime} from 'lib/helperFunctions/helpers';

import {useHistory} from 'react-router-dom';

const ApplicationStateAccordion = ({
  classes,
  header,
  applications,
  iconName,
  expanded,
  handleChange,
  panelName,
  opportunityId,
  contactId,
  page,
  isActive,
}) => {
  let history = useHistory();

  const toStaffViewApplication = (contactId, opportunityId) => {
    history.push(
      `/opportunities/${opportunityId}/contacts/${contactId}/internal-review`
    );
  };
  const toEmployerViewApplication = (contactId, opportunityId) => {
    history.push(
      `/opportunities/${opportunityId}/contacts/${contactId}/employer-review`
    );
  };

  const handleClickViewApplication = (page, contactId, opportunityId) => {
    if (page === 'employer') {
      return toEmployerViewApplication(contactId, opportunityId);
    }
    if (
      page === 'internal-applications-board' ||
      page === 'internal-opportunities-board'
    ) {
      return toStaffViewApplication(contactId, opportunityId);
    }
  };
  let icon;
  switch (iconName) {
    case 'submitted':
      icon = <PeopleIcon />;
      break;
    case 'recommended':
      icon = <AssignmentTurnedInIcon />;
      break;
    case 'interviewing':
      icon = <QuestionAnswerIcon />;
      break;
    case 'notAFit':
      icon = <ClearIcon />;
      break;
    case 'consideredForRole':
      icon = <FavoriteIcon />;
      break;
    default:
      icon = <span></span>;
  }

  const totalApps = applications.length || 0;

  let highlightHead = '';
  if (totalApps > 0) {
    if (header === 'Not a Fit') highlightHead = classes.notAFitHighlightHead;
    else highlightHead = classes.highlightHead;
  }

  if (
    (page === 'internal-applications-board' ||
      page === 'internal-opportunities-board') &&
    isActive === false
  )
    highlightHead = `${classes.inactive} ${highlightHead}`;

  return (
    <ExpansionPanel
      expanded={expanded === panelName}
      onChange={handleChange(panelName)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelName}-content`}
        id={`${panelName}-header`}
        className={highlightHead}
      >
        {icon}
        <Typography
          className={
            totalApps > 0
              ? header === 'Not a Fit'
                ? `${classes.categoryName} ${classes.notAFitHighLightHead}`
                : `${classes.categoryName} ${classes.highLightHead}`
              : classes.categoryName
          }
        >{`${header} (${totalApps})`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        className={
          header === 'Not a Fit'
            ? `${classes.applicationContainer} ${classes.notAFitHighLightBody}`
            : `${classes.applicationContainer} ${classes.highLightBody}`
        }
      >
        {applications.map((app, index) => {
          return (
            <div className={classes.application} key={index}>
              {app.contact ? (
                <div className={classes.container}>
                  <div
                    className={
                      page === 'employer'
                        ? classes.employerApplicant
                        : classes.internalApplicant
                    }
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      className={classes.name}
                    >
                      {page === 'internal-applications-board'
                        ? app.opportunity.title
                        : `${app.contact.first_name} ${app.contact.last_name}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      className={classes.email}
                    >
                      {page === 'internal-applications-board'
                        ? app.opportunity.org_name
                        : `(${app.contact.email})`}
                    </Typography>
                  </div>
                  {header === 'Not a Fit' && (
                    <Typography
                      variant="body1"
                      component="p"
                      className={classes.notAFit}
                    >
                      From:<span className={classes.status}>{app.status}</span>
                    </Typography>
                  )}
                  {header === 'Interviewing' ||
                  header === 'Finalists for Role' ? (
                    <React.Fragment>
                      <Typography
                        variant="body1"
                        component="p"
                        className={classes.notAFit}
                      >
                        Interview Date:
                        <span className={classes.status}>
                          {formatDate(app.interview_date)}
                        </span>
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        className={classes.notAFit}
                      >
                        Interview Time:
                        <span className={classes.status}>
                          {formatTime(app.interview_time)}
                        </span>
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        className={classes.notAFit}
                      >
                        Interview Status:
                        <span
                          className={classes.isCompleted}
                          style={
                            app.interview_completed
                              ? {color: '#159611'}
                              : {color: '#0047c9'}
                          }
                        >
                          {app.interview_completed ? 'Completed' : 'Scheduled'}
                        </span>
                      </Typography>
                    </React.Fragment>
                  ) : null}
                </div>
              ) : (
                <div>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.name}
                  >
                    {app.opportunity.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.organization}
                  >
                    {app.opportunity.org_name}
                  </Typography>
                  {header === 'Not a Fit' && (
                    <Typography
                      variant="body1"
                      component="p"
                      className={classes.notAFit}
                    >
                      From :{' '}
                      <span className={classes.status}>{app.status}</span>
                    </Typography>
                  )}
                </div>
              )}
              <Button
                className={classes.viewAppButton}
                onClick={() =>
                  handleClickViewApplication(
                    page,
                    contactId || app.contact.id,
                    opportunityId || app.opportunity.id
                  )
                }
                variant="contained"
                color="primary"
              >
                View
              </Button>
            </div>
          );
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ApplicationStateAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  applications: PropTypes.array.isRequired,
  iconName: PropTypes.string.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  handleChange: PropTypes.func.isRequired,
  panelName: PropTypes.string.isRequired,
  opportunityId: PropTypes.string,
  contactId: PropTypes.number,
  page: PropTypes.string.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  categoryName: {
    fontWeight: '700',
    fontSize: '16px',
    marginLeft: '10px',
  },
  inactive: {
    backgroundColor: '#d2d2d6',
  },

  highlightHead: {
    backgroundColor: '#e0eaff',
  },
  highLightBody: {
    backgroundColor: '#f2f7ff',
  },
  notAFitHighlightHead: {
    backgroundColor: '#ebebeb',
  },
  notAFitHighLightBody: {
    backgroundColor: '#f7f7f7',
  },
  name: {
    fontSize: '16px',
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    marginRight: spacing(1),
  },
  email: {
    fontSize: '15px',
    color: 'grey',
  },
  notAFit: {
    display: 'block',
    fontSize: '15px',
  },
  status: {
    color: '#0047c9',
    marginLeft: '4px',
  },
  applicationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0',
  },
  employerApplicant: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  internalApplicant: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  application: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 15px 8px',
    borderBottom: 'solid #ebebeb 1px',
    '&:hover': {
      backgroundColor: '#e1e8f5',
    },
  },
  viewAppButton: {
    padding: '5px',
    alignSelf: 'center',
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
  },
  isCompleted: {
    fontWeight: 'bold',
    marginLeft: '4px',
  },
});

export default withStyles(styles)(ApplicationStateAccordion);
