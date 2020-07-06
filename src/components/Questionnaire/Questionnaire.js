import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ContactInfoForm from './ContactInfoForm';
import ValueQuestionForm from './ValueQuestionForm';
import InterestsAndGoalsForm from './InterestsAndGoalsForm';
import DemographicInfoForm from './DemographicInfoForm';

import mockData from '../AboutMe/mockData';
import mockDataEmpty from '../AboutMe/mockDataEmpty';
import Logo from '../../lib/images/long.png';
import {contactInfoValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: event => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleSubmit: values => {
      onSubmit(values);
    },

    handleAddress: event => {
      event.persist();
      const newValue = {
        ...values.address,
        [event.target.name]: event.target.value,
      };
      update('address')(newValue);
    },
    handleInterestedRolesChange: event => {
      event.persist();
      const newValue = {
        ...values.interested_roles,
        [event.target.name]: event.target.checked,
      };
      update('interested_roles')(newValue);
    },
    handleRacesChange: event => {
      event.persist();
      const newValue = {
        ...values.race,
        [event.target.name]: event.target.checked,
      };
      update('race')(newValue);
    },

    handleRaceOther: event => {
      event.persist();
      const newValue = {
        ...values.race,
        [event.target.name]: event.target.value,
      };

      update('race')(newValue);
    },
  };

  return [values, handlers];
};

const Questionnaire = ({
  // contact,
  onSubmit,
  classes,
}) => {
  //   const contact = mockData;
  const contact = mockDataEmpty;
  const [
    values,
    {
      handleChange,
      handleAddress,
      handleInterestedRolesChange,
      handleRacesChange,
      handleRaceOther,
    },
  ] = useForm(contact.profile, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    values.email = values.email_primary.email;
    const {isError, err} = contactInfoValidator(values);

    setErrors(err);

    if (!isError) {
      console.log('submitted form');
      // handleSubmit(values);
      //   onCloseForm();
    }
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <img src={Logo} className={classes.logo} alt="Baltimore Corps Logo" />
        <Typography
          variant="body1"
          component="p"
          className={classes.formDescription}
        >
          The questions below help us understand which of our programs and
          services best align with your needs and goals at this point in your
          professional career. Once you submit this application, we'll review
          your responses and follow up with next steps in approximately 5-7
          business days. Thanks for your interest and time; we hope to have you
          as a part of our network.
        </Typography>
      </div>
      <Grid item xs={12} style={{marginTop: '15px', width: '100%'}}>
        <form noValidate autoComplete="off">
          <fieldset className={classes.sectionContainer}>
            <legend>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHeader}
              >
                Address
              </Typography>
            </legend>
            <ContactInfoForm
              values={values}
              handleAddress={handleAddress}
              errors={errors}
            />
          </fieldset>
          <fieldset className={classes.sectionContainer}>
            <legend>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHeader}
              >
                Values
              </Typography>
            </legend>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionDescription}
            >
              The questions below help us assess whether or not you are aligned
              with the core values of our organization and network. For more
              information on how we define these terms please review this
              document and our website
              {/* add link */}
            </Typography>
            <ValueQuestionForm values={values} handleChange={handleChange} />
          </fieldset>
          <fieldset className={classes.sectionContainer}>
            <legend>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHeader}
              >
                Interests and Goals
              </Typography>
            </legend>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionDescription}
            >
              The questions below help us understand a little bit more about
              your experience and which roles you might be interested in
              applying for.
            </Typography>
            <InterestsAndGoalsForm
              values={values}
              handleChange={handleChange}
              handleInterestedRolesChange={handleInterestedRolesChange}
              errors={errors}
            />
          </fieldset>
          <fieldset className={classes.sectionContainer}>
            <legend>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHeader}
              >
                Demographic Information
              </Typography>
            </legend>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionDescription}
            >
              The information below helps us build a better picture of our
              applicants. As an organization committed to equity, it is
              important for us to understand the variety of identities and
              affinities that are represented within our pool so that we can
              engage in a thoughtful process. That being said, we understand
              that this information is sensitive and providing it is completely
              optional.
            </Typography>
            <DemographicInfoForm
              values={values}
              handleChange={handleChange}
              handleRacesChange={handleRacesChange}
              handleRaceOther={handleRaceOther}
            />
          </fieldset>
        </form>
      </Grid>
    </Paper>
  );
};

Questionnaire.propTypes = {
  //   contact: PropTypes.object.isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  //   onCloseAllForms: PropTypes.func.isRequired,
  //   onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
      padding: spacing(3, 6),
      margin: spacing(2, 0),
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
    padding: spacing(2, 3),
    margin: spacing(0),

    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [breakpoints.up('sm')]: {},
  },
  logo: {
    marginRight: '10px',
    position: 'absolute',
    top: 40,
    height: '160px',
    [breakpoints.up('sm')]: {
      height: '230px',
    },
    [breakpoints.up('md')]: {
      height: '250px',
    },
    [breakpoints.up('lg')]: {
      height: '280px',
    },
  },
  formDescription: {
    position: 'static',
    marginTop: '90px',
    textIndent: '30px',
    textAlign: 'justify',
    fontSize: '15px',
    [breakpoints.up('sm')]: {
      fontSize: '16px',
      marginTop: '100px',
    },
    [breakpoints.up('md')]: {
      marginTop: '120px',
    },
    [breakpoints.up('lg')]: {
      marginTop: '140px',
    },
  },
  form: {
    padding: '17px 30px 20px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },

  formControl: {
    width: '95%',

    marginTop: spacing(0),
  },
  sectionContainer: {
    border: `1px solid ${palette.primary.main}`,
    padding: '0px 40px 20px 40px',
    marginBottom: '20px',
  },
  sectionHeader: {
    fontSize: '19px',
    padding: '8px',
  },
  sectionDescription: {
    textIndent: '30px',
    textAlign: 'justify',
    fontSize: '15px',
    marginBottom: '20px',

    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  },
  valuesQuestions: {
    margin: '10px 0px 30px 0px',
  },
  question: {
    marginBottom: '10px',
    fontWeight: 'bold',
    // fontSize: '15px',
    color: '#303030',
  },
});

export default withStyles(styles)(Questionnaire);
