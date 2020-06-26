import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const InterestsAndGoalsDisplay = ({onClickEdit, classes}) => {
  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.justifyBetween}>
        <Typography variant="h6" component="h3" className={classes.header}>
          Interest and Goals
        </Typography>
        <IconButton
          onClick={onClickEdit}
          size="small"
          aria-label="edit experience"
        >
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </Grid>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Job Search Status:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - Actively looking for jobs
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Years of experience:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - 0-2 years
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Interested Types of Roles:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - Operations and Administration, Program Management,Community
          Engagement and Outreach
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Have participated with Baltimore Corps:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - Yes
        </Typography>
      </div>
    </React.Fragment>
  );
};

InterestsAndGoalsDisplay.propTypes = {
  //   firstName: PropTypes.string.isRequired,
  //   lastName: PropTypes.string.isRequired,
  //   email: PropTypes.string,
  //   phone: PropTypes.string,
  //   onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  justifyBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  editIcon: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  header: {
    fontWeight: '600',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  question: {
    marginRight: '5px',
    fontWeight: 'bold',
    margin: 0,
  },
  answer: {
    margin: 0,
    textIndent: '10px',
  },
});

export default withStyles(styles)(InterestsAndGoalsDisplay);
