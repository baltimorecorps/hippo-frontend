import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Checkbox from '@material-ui/core/Checkbox';
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
}));

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
    const isSelected = selected[experience.id].selected;
    return (<div key={experience.id} className={classes.selectSection}>
      <Checkbox
        checked={isSelected}
        onChange={setExperienceSelected(experience.id)}
        className={classes.checkbox}
      />
      <DisplayExperience
        experience={experience}
        classes={classes}
        onSelectAchievement={isSelected && setAchievementSelected(experience.id)}
        selectedAchievements={selected[experience.id]}
        hideSkills
      />
    </div>)
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
