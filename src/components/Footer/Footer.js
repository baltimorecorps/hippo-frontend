import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {createALink} from 'lib/helperFunctions/helpers';
import terms from 'lib/pdf_files/services-terms.pdf';
import policy from 'lib/pdf_files/privacy-policy.pdf';
import Typography from '@material-ui/core/Typography';
import {useRouteMatch} from 'react-router-dom';

const Footer = ({classes, page}) => {
  const termsLink = createALink('Terms', terms, classes.link);
  const policyLink = createALink('Privacy', policy, classes.link);

  let staffViewAppMatch = useRouteMatch(
    '/opportunities/:opportunityId/contacts/:contactId/internal-review'
  );
  let employerViewAppMatch = useRouteMatch(
    '/opportunities/:opportunityId/contacts/:contactId/employer-review'
  );
  let candidateViewAppMatch = useRouteMatch(
    '/application/:opportunityId/review'
  );
  let candidateInterestForm = useRouteMatch(
    '/application/:opportunityId'
  );
  let candidateCustomizeResume = useRouteMatch(
    '/application/:opportunityId/resume'
  );

  if (
    (candidateViewAppMatch && candidateViewAppMatch.isExact) ||
    (staffViewAppMatch && staffViewAppMatch.isExact) ||
    (employerViewAppMatch && employerViewAppMatch.isExact) ||
    (candidateInterestForm && candidateInterestForm.isExact) ||
    (candidateCustomizeResume && candidateCustomizeResume.isExact)
  ) {
    return null;
  } else {
    return (
      <div className={classes.footerContainer} data-testid="footer">
        <Typography
          component="p"
          variant="body2"
          className={classes.footerLinksContainer}
        >
          <span className={classes.copyright}>&#169; 2020 Baltimore Corps</span>
          <span className={classes.termsAndPolicy}>
            {termsLink} {policyLink}
          </span>
        </Typography>
      </div>
    );
  }
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#303030',
    padding: '10px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      padding: '15px 0px',
    },
  },
  footerLinksContainer: {
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ebebeb',
    flexDirection: 'column',

    [breakpoints.up('sm')]: {
      width: '90%',
      flexDirection: 'row',
    },
    [breakpoints.up('md')]: {
      width: '75%',
    },
    [breakpoints.up('lg')]: {
      width: '60%',
    },
  },
  terms: {
    marginRight: '20px',
  },

  link: {
    '&:hover': {
      color: palette.primary.main,
    },
    margin: '8px 8px 0px 8px',
    marginLeft: 0,
    [breakpoints.up('sm')]: {
      marginLeft: spacing(2.5),
      margin: 'auto',
    },
  },
  copyright: {
    color: '#bdbdbd',
  },
  termsAndPolicy: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
      width: 'auto',
    },
  },
});

export default withStyles(styles)(Footer);
