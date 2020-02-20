import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {DisplayExperience} from 'components/Experiences/ExperiencesList/ExperiencesListItem';
import {makeStyles, useTheme} from '@material-ui/core/styles';

const drawerWidth = 400;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  wrapper: {
    minWidth: 0,
  },
  link: {
    color: theme.palette.primary.link,
    padding: '0 5px',
    fontSize: '15px',
    textTransform: 'lowercase',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  checkbox: {
    paddingTop: '5px',
    marginRight: theme.spacing(1),
  },
  selectSection: {
    display: 'flex',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  capSelectSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  capSelectItem: {
    display: 'flex',
  },
  capabilityName: {
    fontWeight: '700',
  },
}));

const SelectCapabilities = ({capabilities, setSelected, selected}) => {
  const classes = useStyles();
  const setCapabilitySelected = id => ev => {
    setSelected({
      ...selected,
      [id]: {
        ...selected[id],
        selected: ev.target.checked,
      },
    });
  };
  const setSkillSelected = (capId, skillId) => ev => {
    setSelected({
      ...selected,
      [capId]: {
        ...selected[capId],
        [skillId]: ev.target.checked,
      },
    });
  };
  return capabilities.map(capability => {
    const isSelected =
      selected && selected[capability.id] && selected[capability.id].selected;
    const skillsSelected = selected && selected[capability.id]
    const renderSkill = skill => (
      <ListItem key={skill.id}>
        <ListItemIcon>
          {isSelected && <Checkbox
            checked={skillsSelected[skill.id]}
            onChange={setSkillSelected(capability.id, skill.id)}
            className={classes.checkbox}
          />}
        </ListItemIcon>
          <ListItemText primary={skill.name} 
            primaryTypographyProps={{
              variant: "subtitle1",
              component:"h3",
            }}
          />
      </ListItem>
    );
    return (
      <div key={capability.id} className={classes.capSelectSection}>
        <div className={classes.capSelectItem}>
          <Checkbox
            checked={isSelected}
            onChange={setCapabilitySelected(capability.id)}
            className={classes.checkbox}
          />
          <Typography variant="h6" className={classes.capabilityName}>
            {capability.name}
          </Typography>
        </div>
        <List dense>
          {capability.skills.map(renderSkill)}
          {capability.suggested_skills.map(renderSkill)}
        </List>
      </div>
    );
  });
};
const SelectExperiences = ({experiences, setSelected, selected}) => {
  const classes = useStyles();
  const setExperienceSelected = expId => ev => {
    setSelected({
      ...selected,
      [expId]: {
        ...selected[expId],
        selected: ev.target.checked,
      },
    });
  };
  const setAchievementSelected = expId => achId => ev => {
    setSelected({
      ...selected,
      [expId]: {
        ...selected[expId],
        [achId]: ev.target.checked,
      },
    });
  };
  return experiences.map(experience => {
    const isSelected =
      selected && selected[experience.id] && selected[experience.id].selected;
    return (
      <div key={experience.id} className={classes.selectSection}>
        <Checkbox
          checked={isSelected}
          onChange={setExperienceSelected(experience.id)}
          className={classes.checkbox}
        />
        <DisplayExperience
          experience={experience}
          classes={classes}
          onSelectAchievement={
            isSelected && setAchievementSelected(experience.id)
          }
          selectedAchievements={selected[experience.id]}
          hideSkills
        />
      </div>
    );
  });
};
// See https://material-ui.com/components/drawers/#responsive-drawer
function SelectDrawer(props) {
  const {sections} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <SelectExperiences experiences={sections.experience} {...props} />
      <Divider />
      <SelectCapabilities capabilities={sections.capabilities} {...props} />
      <Divider />
      <SelectExperiences experiences={sections.education} {...props} />
      <Divider />
      <SelectExperiences experiences={sections.portfolio} {...props} />
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default SelectDrawer;
