import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const InterestsAndGoalsDisplay = ({contact, onClickEdit, classes}) => {
  const checkedRoles = Object.values(contact.interested_roles).filter(role => {
    if (role.checked === true) return role.label;
  });

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
          - {contact.job_search_status}
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Years of experience:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - {contact.years_exp}
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Interested Types of Roles:
        </Typography>

        {checkedRoles.map((role, index) => (
          <Typography
            key={index}
            variant="body1"
            component="p"
            className={classes.answer}
          >
            - {role.label}
          </Typography>
        ))}
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Have participated with Baltimore Corps:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - {contact.participated_baltimore_corps_before}
        </Typography>
      </div>
    </React.Fragment>
  );
};

InterestsAndGoalsDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
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
