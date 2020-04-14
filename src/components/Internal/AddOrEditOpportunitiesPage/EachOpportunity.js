import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {createExternalLink} from 'lib/helperFunctions/helpers';
import AddOrEditOpportunityForm from './AddOrEditOpportunityForm';

const EachOpportunity = ({classes, opportunity, index, updateOpportunity}) => {
  let history = useHistory();

  const [showForm, setShowForm] = useState(false);
  const updateExistingOpportunity = async values => {
    const result = await updateOpportunity(values);
    if (result && result.statusCode === 200) {
      history.push('/internal/add-or-edit-opportunities');
    }
  };

  return !showForm ? (
    <Paper className={classes.opportunityPaper} key={index}>
      <div className={classes.headerContainer}>
        <Typography variant="h5" component="h1" className={classes.title}>
          {opportunity.title}
        </Typography>
        <Typography
          variant="h5"
          component="h1"
          className={classes.organization}
        >
          {opportunity.org_name || ''}
        </Typography>
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
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </div>
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
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateOpportunity: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(1),
  },
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
    width: '95%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  opportunityContent: {
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  opportunityDescription: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      marginBottom: spacing(2),
      marginRight: spacing(0),
      alignSelf: 'center',
    },
    [breakpoints.down('xs')]: {
      marginBottom: spacing(1),
      width: 'auto',
    },
    [breakpoints.up('md')]: {
      marginRight: spacing(2),
    },
  },
  headerContainer: {
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: palette.primary.link,
    textIndent: '25px',
    alignSelf: 'flex-end',
    marginTop: spacing(1),
    [breakpoints.down('xs')]: {
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
    [breakpoints.down('sm')]: {
      alignSelf: 'flex-end',
    },
    [breakpoints.down('xs')]: {
      alignSelf: 'center',
    },
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
