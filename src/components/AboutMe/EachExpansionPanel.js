import React, {useState, useEffect} from 'react';
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
  name,
  neededAnswer,
  isOnEditMode,
  expandPanel,
  setExpandPanel,
  classes,
}) => {
  const [helpText, setHelpText] = useState('');
  useEffect(() => {
    if (!isOnEditMode) setHelpText(null);
  }, [isOnEditMode]);

  const toggleExpansionPanel = () => {
    if (isOnEditMode) {
      setHelpText(
        <span className={classes.helpText} data-testid="help_text">
          *Please save or close this form to collapse*
        </span>
      );
    } else {
      setHelpText('');
    }

    setExpandPanel({
      ...expandPanel,
      [name]: isOnEditMode ? true : !expandPanel[name],
    });
  };
  return (
    <ExpansionPanel
      expanded={expandPanel[name]}
      className={classes.expansionPanel}
      data-testid="expansion_panel"
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${name}`}
        id={`${name}`}
        className={classes.header}
        onClick={() => toggleExpansionPanel()}
        data-testid="panel_summary"
      >
        <div className={classes.headerText}>
          <Typography>
            {PanelTextHeader}
            {neededAnswer ? <span style={{color: 'red'}}> *</span> : null}
          </Typography>
          <Typography>{helpText}</Typography>
        </div>
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
    scrollMarginTop: '100px',
  },
  headerText: {
    backgroundColor: '#d9d9d9',
    scrollMarginTop: '100px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  helpText: {
    fontSize: '14px',
    color: '#777',
  },
  extraPadding: {
    width: '100%',
    padding: '10px 30px 0px 30px',
  },
});

export default withStyles(styles)(EachExpansionPanel);
