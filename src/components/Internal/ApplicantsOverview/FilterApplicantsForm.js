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

const useForm = (initialValues, onSubmit, closeForm) => {
  const [update, values] = useFormUpdate(initialValues);

  const handleSubmit = () => {
    if (!values.program_name) {
      values.program_name = 'Place for Purpose';
    }
    onSubmit(values);
  };

  const handleChangeLeft = event => {
    event.persist();

    let newValueOptions = [];
    let newValue = [];
    newValue = values.left.map(value => {
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
    update('left')(newValue);
  };
  const handleChangeRight = event => {
    event.persist();

    let newValueOptions = [];
    let newValue = [];
    newValue = values.right.map(value => {
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
    update('right')(newValue);
  };

  return [values, handleChangeLeft, handleChangeRight, handleSubmit];
};

const FilterApplicantsForm = ({classes, isOpen, handleClose, onSubmit}) => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const {gilad, jason, antoine} = state;
  const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  const [values, handleChangeLeft, handleChangeRight, handleSubmit] = useForm(
    formData,
    onSubmit
  );
  console.log('values', values);

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
          <IconButton aria-label="delete" style={{padding: '5px'}}>
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers={true}>
        {/* <FormControl
          fullWidth={true}
          component="fieldset"
          className={classes.formControl}
        > */}
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
                        onChange={handleChangeLeft}
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
                        onChange={handleChangeRight}
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
        {/* </FormControl> */}
      </DialogContent>
      <DialogActions className={classes.dialogActionsContainer}>
        <Button onClick={handleClose} color="primary" variant="contained">
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
