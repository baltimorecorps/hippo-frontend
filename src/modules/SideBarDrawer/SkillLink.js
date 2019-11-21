import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const SkillLink = ({onClick, skillName, index, classes}) => {
  const handleOnClick = () => {
    onClick(index);
  };
  return (
    <React.Fragment>
      <Divider />

      <Link
        component="button"
        variant="body2"
        onClick={handleOnClick}
        className={classes.link}
        underline="none"
      >
        <Typography
          variant="body1"
          component="p"
          className={classes.linkContent}
        >
          {skillName}
        </Typography>
        <ArrowForwardIosIcon className={classes.arrowIcon} />
      </Link>
    </React.Fragment>
  );
};

SkillLink.propTypes = {
  index: PropTypes.number.isRequired,
  skillName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  link: {
    color: palette.primary.darkGray,
    fontSize: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: spacing(1, 2),
    width: '100%',

    '&:hover': {
      '& $linkContent, & $arrowIcon': {
        fontWeight: '700',
        fontSize: '15px',
      },
    },
  },
  linkContent: {},
  arrowIcon: {
    color: palette.primary.darkGray,

    fontSize: '13px',
  },
});

export default withStyles(styles)(SkillLink);
