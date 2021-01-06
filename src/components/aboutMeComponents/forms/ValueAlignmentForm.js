import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {valueAlignmentValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import {createALink} from 'lib/helperFunctions/helpers';

import {
  FormMultiRowsTextField,
  FormHeader,
  FormSubmitButton,
} from './FormTemplates';

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
      const {id, first_name, last_name, email, profile} = values;
      const payload = {
        id,
        first_name,
        last_name,
        email,
        profile,
      };
      onSubmit(contactId, payload);
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

  const thisDocLink = createALink(
    'this document',
    'https://docs.google.com/document/u/1/d/e/2PACX-1vRWVyZoJQ7A5lxLuUP0W7auEPxnMLyjtZ_txBaYV4UcixCJBnskKsWeKyTVsSccl6rDwBn1ajLRzEHO/pub?urp=gmail_link',
    classes.descriptionLink
  );
  const ourWebsiteLink = createALink(
    'our website',
    'https://www.baltimorecorps.org/who-we-are',
    classes.descriptionLink
  );

  const descriptionWithLink = (
    <span>
      The questions below help us assess whether or not you are aligned with the
      core values of our organization and network. For more information on how
      we define these terms please review {thisDocLink} and {ourWebsiteLink}.
    </span>
  );

  const descriptions = [descriptionWithLink];

  return (
    <Grid
      item
      xs={12}
      className={classes.form}
      data-testid="value_alignment_form"
    >
      <FormHeader
        header="Value Alignment"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <FormMultiRowsTextField
            value={values.profile.value_question1}
            name="value_question1"
            question="Racial Equity & Baltimore: Why is racial equity work in Baltimore
              important to you? *"
            onChange={handleChange}
            error={errors.valueQuestion1_error}
          />

          <FormMultiRowsTextField
            value={values.profile.value_question2}
            name="value_question2"
            question="Sector Effectiveness: How has your background and experiences prepared you for today’s work in Baltimore’s social impact sector? *"
            onChange={handleChange}
            error={errors.valueQuestion2_error}
          />

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
  descriptionLink: {
    color: 'blue',
    textDecoration: 'underline',
  },
});

export default withStyles(styles)(ValueAlignmentForm);
