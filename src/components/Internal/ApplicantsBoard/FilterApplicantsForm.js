import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import SkillSelect from '../../Skills/SkillSelect';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);
  const handleSubmit = () => {
    let payload = {};
    const allCheckboxValues = values.checkboxes.left.concat(
      values.checkboxes.right
    );

    allCheckboxValues.forEach(value => {
      let tempArrayValues = [];
      let tempObjectValues = {};
      const key = value.key;
      value.options.forEach(option => {
        if (option.checked === true) {
          if (key === 'roles' || key === 'programs_completed') {
            tempObjectValues[option.payload_key] = option.checked;
          } else if (key === 'program_apps') {
            tempArrayValues.push({
              program: {name: option.label, id: option.id},
            });
          } else if (key === 'needs_help_programs') {
            tempArrayValues.push(option.label === 'Yes' ? true : false);
          } else {
            tempArrayValues.push(option.payload_value || option.label);
          }
        }
      });

      if (tempArrayValues.length > 0) {
        payload = {
          ...payload,
          [key]: tempArrayValues,
        };
      }
      if (Object.keys(tempObjectValues).length > 0) {
        payload = {
          ...payload,
          [key]: tempObjectValues,
        };
      }
    });
    const filterCount = Object.keys(payload).length;
    onSubmit(payload, values, filterCount);
  };

  const handleChangeCheckbox = (event, side) => {
    event.persist();

    let newValueOptions = [];
    let newValue = [];
    newValue = values.checkboxes[side].map(value => {
      if (event.target.name.includes(value.key)) {
        newValueOptions = value.options.map(option => {
          if (option.name === event.target.name) {
            return {
              ...option,
              checked: event.target.checked,
            };
          } else {
            return option;
          }
        });
        return {
          ...value,
          options: newValueOptions,
        };
      } else {
        return value;
      }
    });
    const otherSide = side === 'left' ? 'right' : 'left';

    update('checkboxes')({
      [otherSide]: values.checkboxes[otherSide],
      [side]: newValue,
    });
  };
  const handleChangeSkills = newSkills => {
    console.log('newSkills', newSkills);
    update('skills')(newSkills);
  };
  return [values, handleChangeCheckbox, handleChangeSkills, handleSubmit];
};

const FilterApplicantsForm = ({
  classes,
  isOpen,
  handleClose,
  addContactsFilters,
  filterFormData,
}) => {
  const [
    values,
    handleChangeCheckbox,
    handleChangeSkills,
    handleSubmit,
  ] = useForm(filterFormData, addContactsFilters);

  console.log('values', values);

  const submit = async () => {
    await handleSubmit();
    handleClose();
  };

  console.log('skills', values.skills);

  return (
    <Dialog
      data-testid="filter-applicants-form"
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" style={{padding: '10px 20px'}}>
        <Typography component="p" variant="h6" className={classes.dialogTitle}>
          <span data-testid="form-header"> Filter Applicants </span>
          <IconButton
            onClick={handleClose}
            aria-label="close filter form"
            style={{padding: '5px'}}
            data-testid="close-form-button"
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers={true}>
        <div className={classes.checkboxContainer}>
          <div className={classes.checkboxesHalf}>
            {values.checkboxes.left.map((form, index) => (
              <React.Fragment key={index}>
                <Typography style={{fontWeight: 'bold'}}>
                  {form.header}
                </Typography>
                <FormGroup>
                  {form.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          data-testid={option.name}
                          checked={option.checked}
                          onChange={e => handleChangeCheckbox(e, 'left')}
                          name={option.name}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
                <div style={{marginBottom: '10px'}}></div>
              </React.Fragment>
            ))}
          </div>
          <div className={classes.checkboxesHalf}>
            {values.checkboxes.right.map((form, index) => (
              <React.Fragment key={index}>
                <Typography style={{fontWeight: 'bold'}}>
                  {form.header}
                </Typography>
                <FormGroup>
                  {form.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          data-testid={option.name}
                          checked={option.checked}
                          onChange={e => handleChangeCheckbox(e, 'right')}
                          name={option.name}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
                <div style={{marginBottom: '10px'}}></div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <Typography variant="body1" component="p" style={{fontWeight: 'bold'}}>
          Filter by Skills
        </Typography>
        <SkillSelect
          id="other"
          value={values.skills || []}
          onChange={newSkill => handleChangeSkills(newSkill)}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          data-testid="add-filter-button"
          onClick={submit}
          color="primary"
          variant="contained"
        >
          Add Filters
        </Button>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  dialog: {},
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    [breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  dialogTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    width: '300px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      width: '900px',
    },
  },
  checkboxesHalf: {
    margin: 0,
    position: 'relative',
    top: '390px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    [breakpoints.up('sm')]: {
      top: '0px',
    },
  },
});
export default withStyles(styles)(FilterApplicantsForm);
