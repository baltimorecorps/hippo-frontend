import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const EachExpansionPanel = ({
  PanelTextHeader,
  content,
  neededAnswer,
  classes,
}) => {
  return (
    <ExpansionPanel defaultExpanded={false} className={classes.expansionPanel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.header}
      >
        <Typography>
          {PanelTextHeader}
          {neededAnswer ? <span style={{color: 'red'}}> *</span> : null}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{content}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

EachExpansionPanel.propTypes = {
  PanelTextHeader: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  expansionPanel: {
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(1),
    width: '100%',
  },
  header: {
    backgroundColor: '#d9d9d9',
  },
  extraPadding: {
    width: '100%',
    padding: '10px 30px 0px 30px',
  },
});

export default withStyles(styles)(EachExpansionPanel);
