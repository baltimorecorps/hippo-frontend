import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {createALink} from 'lib/helperFunctions/helpers';
import terms from '../../../assets/pdf/services-terms.pdf';
import privacyPolicy from '../../../assets/pdf/BCPP.pdf';
import Typography from '@material-ui/core/Typography';
import {useRouteMatch} from 'react-router-dom';
import Logo from '../../../assets/images/logoSquare.png';

const MainFooter = ({classes, page}) => {
  const termsLink = createALink('Terms', terms, classes.link);
  const policyLink = createALink(
    'Privacy',
    privacyPolicy,
    classes.link
  );

  let staffViewAppMatch = useRouteMatch(
    '/opportunities/:opportunityId/contacts/:contactId/internal-review'
  );
  let employerViewAppMatch = useRouteMatch(
    '/opportunities/:opportunityId/contacts/:contactId/employer-review'
  );
  let candidateViewAppMatch = useRouteMatch(
    '/application/:opportunityId/review'
  );
  let candidateInterestForm = useRouteMatch('/application/:opportunityId');
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
          <span className={classes.copyright}>
            <img
              src={Logo}
              className={classes.logo}
              alt="Baltimore Corps Logo"
            />
            &#169; 2020 Baltimore Corps
          </span>
          <span className={classes.termsAndPolicy}>
            {termsLink} {policyLink}
          </span>
        </Typography>
      </div>
    );
  }
};

MainFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#303030',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      height: '50px',
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
    marginTop: '0',
    marginRight: '20px',
  },

  link: {
    '&:hover': {
      color: palette.primary.main,
    },
    marginRight: '8px',
    [breakpoints.up('sm')]: {
      marginLeft: spacing(2.5),
      margin: 'auto',
    },
  },
  copyright: {
    color: '#bdbdbd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginRight: '5px',
    height: '24px',
    width: '24px',
    [breakpoints.up('sm')]: {
      height: '30px',
      width: '30px',
    },
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

export default withStyles(styles)(MainFooter);
