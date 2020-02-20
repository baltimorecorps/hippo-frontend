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
  toViewApplication,
  header,
  apps,
  iconName,
  expanded,
  handleChange,
  panelName,
  opportunityId,
}) => {
  let history = useHistory();

  const toViewApplication2 = (contactId, opportunityId) => {
    history.push(
      `/opportunities/${opportunityId}/contacts/${contactId}/internal-review`
    );
  };
  let icon;
  switch (iconName) {
    case 'newApplication':
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
  return (
    <ExpansionPanel
      expanded={expanded === panelName}
      onChange={handleChange(panelName)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelName}-content`}
        id={`${panelName}-header`}
      >
        {icon}
        <Typography
          className={classes.categoryName}
        >{`${header} (${apps.length})`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.applicationContainer}>
        {apps.map(app => {
          return (
            <div className={classes.application}>
              <Typography
                variant="body1"
                component="p"
                className={classes.name}
              >
                {app.name}
              </Typography>
              <Button
                className={classes.viewAppButton}
                onClick={() => toViewApplication2(app.contactId, opportunityId)}
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
    fontSize: '18px',
    marginLeft: '10px',
  },
  name: {
    fontSize: '16px',
  },
  applicationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  application: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing(1),
  },
});

export default withStyles(styles)(ApplicationStateAccordion);
