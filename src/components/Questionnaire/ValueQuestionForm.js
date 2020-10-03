import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const ValueQuestionForm = ({values, handleChange, errors, classes}) => {
  return (
    <React.Fragment>
      <div className={classes.valuesQuestions}>
        <Typography variant="body1" component="p" className={classes.question}>
          Racial Equity & Baltimore: Why is racial equity work in Baltimore
          important to you? *
        </Typography>
        <TextField
          required
          id="value_question1"
          name="value_question1"
          value={values.value_question1}
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
        <Typography variant="body1" component="p" className={classes.question}>
          Sector Effectiveness: How has your background and experiences prepared
          you for today’s work in Baltimore’s social impact sector? *
        </Typography>
        <TextField
          required
          id="value_question2"
          name="value_question2"
          value={values.value_question2}
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
    </React.Fragment>
  );
};

ValueQuestionForm.propTypes = {
  //   contact: PropTypes.object.isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  //   onCloseAllForms: PropTypes.func.isRequired,
  //   onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  valuesQuestions: {
    margin: '10px 0px 30px 0px',
  },
  question: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#303030',
  },
});

export default withStyles(styles)(ValueQuestionForm);
