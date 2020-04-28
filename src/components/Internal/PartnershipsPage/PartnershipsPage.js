import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const PartnershipsPage = ({classes}) => {
  let history = useHistory();

  const handleClickLink = linkURL => {
    history.push(`/internal/${linkURL}`);
  };

  const links = [
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
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          align="left"
          className={classes.header}
        >
          Partnerships Team Page
        </Typography>
        <Divider className={classes.divider} />
        {links.map((link, index) => (
          <Link
            key={index}
            component="button"
            variant="body1"
            onClick={() => handleClickLink(link.url)}
            className={classes.linkText}
          >
            <ArrowForwardIcon className={classes.icons} /> {link.name}
          </Link>
        ))}
      </Paper>
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(1),
  },
  header: {
    textAlign: 'center',
    paddingBottom: spacing(2),
  },
  paper: {
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  divider: {
    marginBottom: spacing(2.5),
  },
  linkText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    color: '#000000',
    padding: spacing(1.5, 2),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#ebebeb',
    },
  },
  icons: {
    marginRight: '5px',
  },
});

export default withStyles(styles)(PartnershipsPage);
