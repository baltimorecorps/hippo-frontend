import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import AddOrEditOpportunityForm from './AddOrEditOpportunityForm';
import EachOpportunity from './EachOpportunity';
import PartnershipsNavBar from '../PartnershipsNavBar';

const AddOrEditOpportunitiesPage = ({
  classes,
  opportunities,
  getAllOpportunities,
  addOpportunity,
  updateOpportunity,
}) => {
  let history = useHistory();

  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  const [showForm, setShowForm] = useState(false);

  // TODO: make dropdown selection for cycle_id and Program_id in the future
  const blankOpportunity = {
    gdoc_link: '',
    title: '',
    cycle_id: 1,
    short_description: '',
    org_name: '',
  };

  const addNewOpportunity = async values => {
    const result = await addOpportunity(values);
    if (result && result.statusCode == 201) {
      history.push('/internal/add-or-edit-opportunities');
    }
  };

  return (
    <div className={classes.container}>
      <PartnershipsNavBar />
      <Paper className={classes.headerPaper}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          className={classes.header}
        >
          Add or Edit Opportunities
        </Typography>
      </Paper>
      {showForm ? (
        <AddOrEditOpportunityForm
          type="add"
          opportunity={blankOpportunity}
          onSubmit={addNewOpportunity}
          closeForm={() => setShowForm(false)}
        />
      ) : (
        <Grid className={classes.buttonContainer}>
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            color="primary"
          >
            Add New Opportunity
          </Button>
        </Grid>
      )}
      {Object.values(opportunities).map((opportunity, index) => (
        <EachOpportunity
          opportunity={opportunity}
          index={index}
          updateOpportunity={updateOpportunity}
        />
      ))}
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(1),
  },

  headerPaper: {
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
    margin: spacing(2),
  },
  header: {
    [breakpoints.up('sm')]: {
      fontSize: '24px',
    },
    fontSize: '20px',
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
    width: '100%',
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
    marginBottom: spacing(2),
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

export default withStyles(styles)(AddOrEditOpportunitiesPage);
