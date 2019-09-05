import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

import ReactSelect from 'react-select';

import useFormUpdate from 'lib/useFormUpdate';
import SkillLevelDropdown from './SkillLevelDropdown';

const useForm = (initialValues, onSubmit, onReplace) => {
  const oldTag = initialValues;
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleSelect: (value) => {
      update('name')(value.name);
      update('tag_id')(value.id);
    },
    handleScore: (event) => update('score')(parseInt(event.target.value)),
    handleSubmit: () => {
      if (oldTag.tag_id !== values.tag_id) {
        onReplace(oldTag, values);
      } else {
        onSubmit(values);
      }
    },
  };

  return [values, handlers];
};

const AddOrEditSkillForm = ({ allTags, tag, onSubmit, onReplace, onCancel, classes }) => {
  const [values, { handleSelect, handleSubmit, handleScore }] = useForm(
    tag,
    onSubmit,
    onReplace,
  );

  const getOptionLabel = ({type, name}) => name;
  const isOptionSelected = ({ id }, options) => !!options.find((o) => o.id === id);
  const selectedTag = {
    id: values.tag_id,
    name: values.name,
  };

  return (
    <Dialog open={true}>
      <DialogTitle id="form-dialog-title" className={classes.header}>
        Add Skill
      </DialogTitle>

      <form noValidate autoComplete="off">
        <DialogContent className={classes.container}>
          <ReactSelect
            placeholder='Type to find a Skill'
            options={allTags}
            value={selectedTag}
            getOptionLabel={getOptionLabel}
            isOptionSelected={isOptionSelected}
            onChange={handleSelect}
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="skillLevel">
              Skill Level
            </InputLabel>
            <SkillLevelDropdown value={values.score} onChange={handleScore} />
          </FormControl>
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

AddOrEditSkillForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  allTags: PropTypes.array.isRequired,
  tagType: PropTypes.oneOf(['Function', 'Skill', 'Topic']).isRequired,
  tag: PropTypes.shape({
    tag_id: PropTypes.number,
    contact_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['Function', 'Skill', 'Topic']).isRequired,
    score: PropTypes.number,
  }).isRequired,
};

const styles = ({ breakpoints, palette, spacing }) => ({
  header: {
    padding: spacing(2, 3, 0),
  },
  container: {
    height: 300,
    width: 300,
    marginBottom: spacing(3),
  },
  textField: {
    marginBottom: spacing(1),
  },
  actions: {
    padding: spacing(0, 3),
    marginBottom: spacing(3),
  },
});

export default withStyles(styles)(AddOrEditSkillForm);
