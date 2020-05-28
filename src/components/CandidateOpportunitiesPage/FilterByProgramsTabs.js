import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const FilterByProgramsTabs = ({classes, handleChangeFilter, value}) => {
  return (
    <Paper square className={classes.tabsContainer}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeFilter}
        aria-label="filter-opportunities-by-program-name"
        className={classes.tabs}
        data-testid="filter-options"
      >
        <Tab data-testid="filter-all" label="All" className={classes.tab} />
        <Tab
          data-testid="filter-fellowship"
          label="Fellowship"
          className={classes.tab}
        />
        <Tab
          data-testid="filter-mayoral"
          label="Mayoral Fellowship"
          className={classes.tab}
        />
        <Tab
          data-testid="filter-place-for-purpose"
          label="Place for Purpose"
          className={classes.tab}
        />
      </Tabs>
    </Paper>
  );
};

FilterByProgramsTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  tabsContainer: {
    marginRight: '10px',
    marginBottom: '10px',

    [breakpoints.up(1340)]: {
      marginBottom: '0px',
    },
  },
  tabs: {
    display: 'flex',
    flexDirection: 'column',
  },
  tab: {
    backgroundColor: palette.secondary.main,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default withStyles(styles)(FilterByProgramsTabs);
