import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';

const AchievementsListItem = ({classes, text, onSelect, selected}) => {
  return (
    <ListItem>
      {onSelect ? (
        <ListItemIcon className={classes.icon}>
          <Checkbox onChange={onSelect} checked={selected} className={classes.checkbox} />
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
    minWidth: spacing(4),
  },
  checkbox: {
    padding: spacing(0.5),
  },
});

export default withStyles(styles)(AchievementsListItem);
