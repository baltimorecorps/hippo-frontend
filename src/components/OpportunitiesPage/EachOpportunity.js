import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {createExternalLink} from 'lib/helperFunctions/helpers';

const EachOpportunity = ({
  classes,
  opportunity,
  contact,
  submittedIds,
  index,
  onClickViewAppButton,
  onClickApplyButton,
}) => {
  return (
    <Paper className={classes.opportunityPaper} key={index}>
      <div className={classes.oppHeaderContainer}>
        <div className={classes.titleAndOrg}>
          <Typography variant="h5" component="p" className={classes.title}>
            {opportunity.title}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            className={classes.organization}
          >
            {opportunity.org_name || ''}
          </Typography>
        </div>
        <div className={classes.programName}>
          <Typography
            variant="h5"
            component="p"
            className={classes.programName}
          >
            {opportunity.program_name || 'Place for Purpose'}
          </Typography>
        </div>
      </div>
      <div className={classes.opportunityContent}>
        <div className={classes.opportunityDescription}>
          <Typography className={classes.description}>
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
                    >
                      View Application
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onClickApplyButton(opportunity.id)}
                      variant="contained"
                      color="primary"
                      key={index}
                    >
                      Apply
                    </Button>
                  )
                ) : null
              )
            : null}
        </div>
      </div>
    </Paper>
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
  }).isRequired,
  index: PropTypes.number.isRequired,
  contact: PropTypes.object.isRequired,
  submittedIds: PropTypes.array.isRequired,
  onClickViewAppButton: PropTypes.func.isRequired,
  onClickApplyButton: PropTypes.func.isRequired,
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
    // flexDirection: 'column',
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
  programName: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
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
  },
});

export default withStyles(styles)(EachOpportunity);
