import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {createExternalLink} from 'lib/helperFunctions/helpers';
import AddOrEditOpportunityForm from '../Internal/AddOrEditOpportunitiesPage/AddOrEditOpportunityForm';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const EachOpportunity = ({
  classes,
  opportunity,
  contact,
  submittedIds,
  onClickViewAppButton,
  onClickApplyButton,
  audience,
  updateExistingOpportunity,
  deactivateRole,
  activateRole,
}) => {
  const [showForm, setShowForm] = useState(false);

  let highlightColor = {};
  if (opportunity.is_active === false) {
    highlightColor = {
      backgroundColor: '#d2d2d6',
    };
  }
  if (audience === 'internal') {
    switch (opportunity.program_name) {
      case 'Fellowship':
        highlightColor['borderTop'] = '4px solid #ffcc33';
        break;
      case 'Mayoral Fellowship':
        highlightColor['borderTop'] = '4px solid #ef4aff';

        break;
      default:
        highlightColor['borderTop'] = '4px solid #262626';
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const options = [];
  if (opportunity.is_active) {
    options[0] = 'Deactivate';
  } else {
    options[0] = 'Activate';
  }

  const ITEM_HEIGHT = 48;

  const handleClickMore = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickActions = async opportunityId => {
    let response;
    if (opportunity.is_active) {
      response = await deactivateRole(opportunityId);
    } else {
      response = await activateRole(opportunityId);
    }

    if (response.statusCode == 200) {
      setAnchorEl(null);
    }
  };

  return !showForm ? (
    <Paper
      className={classes.opportunityPaper}
      style={highlightColor}
      data-testid="opportunity"
    >
      <div className={classes.oppHeaderContainer}>
        <div className={classes.titleAndOrg}>
          <Typography
            variant="h5"
            component="p"
            className={classes.title}
            data-testid="title"
          >
            {opportunity.title}{' '}
            {audience === 'internal' ? (
              opportunity.is_active ? (
                <span className={classes.active}>(Active)</span>
              ) : (
                <span className={classes.inactive}>(Inactive)</span>
              )
            ) : null}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            className={classes.organization}
            data-testid="org-name"
          >
            {opportunity.org_name || ''}
          </Typography>
        </div>
        <div className={classes.programAndMoreContainer}>
          <Typography
            variant="h5"
            component="p"
            className={classes.programName}
            data-testid="program-name"
          >
            {opportunity.program_name || ''}
          </Typography>
          {audience === 'internal' && (
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClickMore}
                className={classes.moreIconContainer}
              >
                <MoreVertIcon className={classes.moreIcon} />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {options.map(option => (
                  <MenuItem
                    key={option}
                    selected={option === 'Pyxis'}
                    onClick={() => handleClickActions(opportunity.id)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </div>
      </div>
      <div className={classes.opportunityContent}>
        <div className={classes.opportunityDescription}>
          <Typography className={classes.description} data-testid="description">
            {opportunity.short_description}
            <br />
          </Typography>
          <Typography className={classes.link}>
            {createExternalLink(
              'View full description',
              opportunity.gdoc_link,
              classes.link
            )}
          </Typography>
        </div>
        {audience === 'candidates' ? (
          <div className={classes.applyButton}>
            {contact
              ? contact.programs.map((eachProgram, index) =>
                  eachProgram.program.id === opportunity.program_id &&
                  eachProgram.is_approved === true ? (
                    submittedIds.includes(opportunity.id) ? (
                      <Button
                        onClick={() => onClickViewAppButton(opportunity.id)}
                        variant="contained"
                        color="primary"
                        key={index}
                        data-testid="view-app-btn"
                      >
                        View Application
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onClickApplyButton(opportunity.id)}
                        variant="contained"
                        color="primary"
                        key={index}
                        data-testid="apply-btn"
                      >
                        Apply
                      </Button>
                    )
                  ) : null
                )
              : null}
          </div>
        ) : (
          // audience === "internal"
          <div className={classes.applyButton}>
            <Button
              onClick={() => setShowForm(true)}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </Paper>
  ) : (
    <AddOrEditOpportunityForm
      type="edit"
      opportunity={opportunity}
      onSubmit={updateExistingOpportunity}
      closeForm={() => setShowForm(false)}
    />
  );
};

EachOpportunity.propTypes = {
  classes: PropTypes.object.isRequired,
  opportunity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    program_id: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    cycle_id: PropTypes.number.isRequired,
    gdoc_link: PropTypes.string.isRequired,
    org_name: PropTypes.string.isRequired,
  }),
  index: PropTypes.number,
  contact: PropTypes.object,
  submittedIds: PropTypes.array,
  onClickViewAppButton: PropTypes.func,
  onClickApplyButton: PropTypes.func,
  audience: PropTypes.string,
  updateExistingOpportunity: PropTypes.func,
};

const styles = ({breakpoints, palette, spacing}) => ({
  opportunityPaper: {
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
  opportunityContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  programAndMoreContainer: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: '#999999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opportunityDescription: {
    marginRight: spacing(2),
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('xs')]: {
      marginBottom: spacing(1),
    },
    [breakpoints.down('sm')]: {
      marginBottom: spacing(2),
      marginRight: spacing(0),
      alignSelf: 'center',
    },
  },
  oppHeaderContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      paddingBottom: spacing(1),
      marginBottom: spacing(1),
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  titleAndOrg: {
    display: 'flex',
    flexDirection: 'column',
  },
  active: {
    fontSize: '16px',
    color: '#0ac70c',
    fontWeight: 'normal',
  },
  inactive: {
    fontSize: '16px',
    color: '#555555',
    fontWeight: 'normal',
  },
  programName: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: '#999999',
  },
  moreIcon: {
    cursor: 'pointer',
    padding: '0',
  },
  moreIconContainer: {
    cursor: 'pointer',
    padding: '3px 0px',
    marginLeft: '5px',
    borderRadius: '3px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: palette.primary.link,
    marginTop: spacing(1),
    [breakpoints.down('sm')]: {
      alignSelf: 'center',
      marginTop: spacing(0),
      textIndent: '0px',
    },
  },
  description: {
    textAlign: 'justify',
    textIndent: '25px',
  },
  applyButton: {
    maxWidth: '100%',
  },
  title: {
    fontWeight: 700,
    fontSize: '22px',
    [breakpoints.down('xs')]: {
      fontSize: '20px',
    },
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
    textAlign: 'center',
    [breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
});

export default withStyles(styles)(EachOpportunity);
