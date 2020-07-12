import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {valueAlignmentValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import {FormHeader, FormSubmitButton} from './FormTemplates';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: event => {
      event.persist();
      const newValue = {
        ...values.profile,
        [event.target.name]: event.target.value,
      };
      update('profile')(newValue);
    },
    handleSubmit: (contactId, values) => {
      onSubmit(contactId, values);
    },
  };

  return [values, handlers];
};

const ValueAlignmentForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [values, {handleChange, handleSubmit}] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    const {isError, err} = valueAlignmentValidator(values);
    setErrors(err);

    if (!isError) {
      handleSubmit(contact.id, values);
      onCloseForm();
    }
  };

  const descriptions = [
    'The questions below help us assess whether or not you are aligned with the core values of our organization and network. For more information on how we define these terms please review this document and our website.',
  ];

  return (
    <Grid item xs={12} className={classes.form}>
      <FormHeader
        header="Value Alignment"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <div className={classes.valuesQuestions}>
            <Typography
              variant="body1"
              component="p"
              className={classes.question}
            >
              Racial Equity & Baltimore: Why is racial equity work in Baltimore
              important to you? *
            </Typography>
            <TextField
              required
              id="value_question1"
              name="value_question1"
              value={values.profile.value_question1}
              multiline
              rows={6}
              onChange={handleChange}
              variant="outlined"
              style={{width: '100%'}}
            />
            <FormHelperText className={classes.formHelperText}>
              {errors.valueQuestion1_error || null}
            </FormHelperText>
          </div>
          <div className={classes.valuesQuestions}>
            <Typography
              variant="body1"
              component="p"
              className={classes.question}
            >
              Sector Effectiveness: How has your background and experiences
              prepared you for today’s work in Baltimore’s social impact sector?
              *
            </Typography>
            <TextField
              required
              id="value_question2"
              name="value_question2"
              value={values.profile.value_question2}
              onChange={handleChange}
              multiline
              rows={6}
              variant="outlined"
              style={{width: '100%'}}
            />
          </div>
          <FormHelperText className={classes.formHelperText}>
            {errors.valueQuestion2_error || null}
          </FormHelperText>
          <FormSubmitButton onSubmit={submit} />
        </form>
      </Grid>
    </Grid>
  );
};

ValueAlignmentForm.propTypes = {
  contact: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '0px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },
  valuesQuestions: {
    margin: '10px 0px 20px 0px',
  },
  question: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#303030',
    fontSize: '15px',
    textAlign: 'left',
  },
});

export default withStyles(styles)(ValueAlignmentForm);
