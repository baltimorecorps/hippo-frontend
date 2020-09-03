import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const PartnershipsNavBar = ({classes, location}) => {
  let history = useHistory();

  const handleClickLink = linkURL => {
    history.push(`/internal/${linkURL}`);
  };

  const links = [
    {
      key: 'add_or_edit_opportunities',
      name: 'Add or Edit Opportunities',
      url: 'add-or-edit-opportunities',
    },
    {
      key: 'opportunities_board',
      name: 'Opportunities Board',
      url: 'opportunities-board',
    },
    {
      key: 'applicants_overview',
      name: 'Applicants Board',
      url: 'applicants-overview',
    },
  ];

  const currentPage = window.location.pathname
    .replace('/internal/', '')
    .replace(/-/g, '_');

  return (
    <div className={classes.linkContainer}>
      {links.map((link, index) => (
        <Typography
          key={index}
          component="button"
          variant="body1"
          align="center"
          style={
            currentPage === link.key
              ? {backgroundColor: '#242424', color: '#ffd24a'}
              : null
          }
          className={classes.partnershipsHome}
          onClick={() => handleClickLink(link.url)}
        >
          {link.name}
        </Typography>
      ))}
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  linkContainer: {
    width: '95vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    marginTop: spacing(2),
    marginBottom: spacing(2),
  },
  partnershipsHome: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 15px',
    border: '1px solid #ddd',

    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default withStyles(styles)(PartnershipsNavBar);
