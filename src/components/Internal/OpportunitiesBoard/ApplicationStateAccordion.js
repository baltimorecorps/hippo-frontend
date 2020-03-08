import React from 'react';
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
}) => {
  let history = useHistory();

  const toViewApplication = (contactId, opportunityId) => {
    history.push(
      `/opportunities/${opportunityId}/contacts/${contactId}/internal-review`
    );
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
    default:
      icon = <span></span>;
  }

  const totalApps = applications.length || 0;

  return (
    <ExpansionPanel
      expanded={expanded === panelName}
      onChange={handleChange(panelName)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelName}-content`}
        id={`${panelName}-header`}
        className={totalApps > 0 ? classes.hightLight : null}
      >
        {icon}
        <Typography
          className={
            totalApps > 0
              ? `${classes.categoryName} ${classes.hightLight}`
              : classes.categoryName
          }
        >{`${header} (${totalApps})`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.applicationContainer}>
        {applications.map((app, index) => {
          return (
            <div className={classes.application} key={index}>
              {app.contact ? (
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.name}
                >
                  {`${app.contact.first_name} ${app.contact.last_name}`}
                </Typography>
              ) : (
                <div>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.name}
                  >
                    {app.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.organization}
                  >
                    {app.org_name}
                  </Typography>
                </div>
              )}
              <Button
                className={classes.viewAppButton}
                onClick={() => toViewApplication(contactId, opportunityId)}
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

const styles = ({breakpoints, palette, spacing}) => ({
  categoryName: {
    fontWeight: '700',
    fontSize: '16px',
    marginLeft: '10px',
  },

  hightLight: {
    backgroundColor: '#e0eaff',
  },
  name: {
    fontSize: '16px',
    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applicationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f7ff',
    padding: '10px 15px 8px',
  },
  application: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing(1),
  },
  viewAppButton: {
    padding: '5px',
    alignSelf: 'center',
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
    // textAlign: 'center',
  },
});

export default withStyles(styles)(ApplicationStateAccordion);
