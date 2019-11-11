import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const AchievementsListItem = ({classes, text}) => {
  const selectMode = false;
  return (
    <ListItem>
      {selectMode ? (
        <ListItemIcon className={classes.icon}>
          <Checkbox className={classes.checkbox} />
        </ListItemIcon>
      ) : null}
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          variant: 'body1',
          component: 'p',
          style: {
            padding: '0px 0px 0px 15px',
            wordWrap: 'break-word',
            marginBottom: '0px',
            fontSize: '14px',
            color: '#2e2e2e',
          },
          paragraph: true,
        }}
      />
    </ListItem>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  icon: {
    'min-width': spacing(4),
  },
  checkbox: {
    padding: spacing(0.5),
  },
});

export default withStyles(styles)(AchievementsListItem);
