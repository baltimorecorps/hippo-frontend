import React from 'react';
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
import {formData} from './defaultValues';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

const useForm = (initialValues, onSubmit, setFilterCount, filterCount) => {
  const [update, values] = useFormUpdate(initialValues);

  const handleSubmit = () => {
    let payload = {};
    const allValues = values.left.concat(values.right);

    allValues.forEach(value => {
      let tempValues = [];

      value.options.forEach(option => {
        if (option.checked === true) {
          tempValues.push(option.payload_value || option.label);
        }
      });
      if (tempValues.length > 0) {
        payload = {
          ...payload,
          [value.key]: tempValues,
        };
      }
    });
    setFilterCount(Object.keys(payload).length);

    console.log('payload', payload);
    onSubmit(payload);
  };

  const handleChange = (event, side) => {
    event.persist();

    let newValueOptions = [];
    let newValue = [];
    newValue = values[side].map(value => {
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

    update(side)(newValue);
  };

  return [values, handleChange, handleSubmit];
};

const FilterApplicantsForm = ({
  classes,
  isOpen,
  handleClose,
  onSubmit,
  addContactsFilters,
  setFilterCount,
  filterCount,
}) => {
  const [values, handleChange, handleSubmit] = useForm(
    formData,
    addContactsFilters,
    setFilterCount,
    filterCount
  );
  let displayFiltersTemp = [];

  values.left.forEach(value => {
    value.options.forEach(option => {
      if (option.checked === true) {
        displayFiltersTemp.push({name: value.header, label: option.label});
      }
    });
  });

  const submit = async () => {
    await handleSubmit();
    handleClose();
  };

  return (
    <Dialog
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" style={{padding: '10px 20px'}}>
        <Typography className={classes.dialogTitle}>
          <span> Filter Applicants </span>
          <IconButton
            onClick={handleClose}
            aria-label="delete"
            style={{padding: '5px'}}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers={true}>
        <div className={classes.checkboxContainer}>
          {values.left.map((form, index) => (
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
                        checked={option.checked}
                        onChange={e => handleChange(e, 'left')}
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
        <div className={classes.checkboxContainer}>
          {values.right.map((form, index) => (
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
                        checked={option.checked}
                        onChange={e => handleChange(e, 'right')}
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
      </DialogContent>
      <DialogActions className={classes.dialogActionsContainer}>
        <Button onClick={submit} color="primary" variant="contained">
          Save
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
  dialogContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
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
  checkboxContainer: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
export default withStyles(styles)(FilterApplicantsForm);
