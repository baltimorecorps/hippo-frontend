import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const DemographicDisplay = ({contact, onClickEdit, classes}) => {
  const checkedRace = Object.values(contact.race).filter(
    race => race[0] === true
  );

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.justifyBetween}>
        <Typography variant="h6" component="h3" className={classes.header}>
          Demographic Information
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
          Race:
        </Typography>

        {checkedRace.map((race, index) => (
          <Typography
            key={index}
            variant="body1"
            component="p"
            className={classes.answer}
          >
            - {race[1]}
          </Typography>
        ))}
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Gender:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - {contact.gender}
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body1" component="p" className={classes.question}>
          Pronoun:
        </Typography>

        <Typography variant="body1" component="p" className={classes.answer}>
          - {contact.pronoun}
        </Typography>
      </div>
    </React.Fragment>
  );
};

DemographicDisplay.propTypes = {
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

export default withStyles(styles)(DemographicDisplay);
