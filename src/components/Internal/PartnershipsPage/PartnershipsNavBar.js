import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const PartnershipsNavBar = ({classes}) => {
  let history = useHistory();

  const handleClickLink = linkURL => {
    history.push(`/internal/${linkURL}`);
  };

  const links = [
    {
      name: 'Partnerships',
      url: 'partnerships',
    },
    {name: 'Add or Edit Opportunities', url: 'add-or-edit-opportunities'},
    {
      name: 'Internal Opportunities Board',
      url: 'opportunities-board',
    },
    {
      name: 'Internal Applications Board',
      url: 'applications-board',
    },
  ];

  return (
    <div className={classes.linkContainer}>
      {links.map((link, index) => (
        <Typography
          key={index}
          component="button"
          variant="body1"
          align="center"
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
  },
  partnershipsHome: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: spacing(2),
    marginLeft: '2%',
    [breakpoints.up('sm')]: {
      alignSelf: 'flex-start',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default withStyles(styles)(PartnershipsNavBar);
