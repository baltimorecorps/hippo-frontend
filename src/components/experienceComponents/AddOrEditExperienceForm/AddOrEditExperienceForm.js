import React from 'react';
import {createClickTracking} from 'lib/helperFunctions/helpers';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import AchievementInputsList from './AchievementInputsList';
import SelectorForm from './SelectorForm';
import DegreeDropdown from './DegreeDropdown';
import FormHelperText from '@material-ui/core/FormHelperText';
import {experienceValidator} from 'lib/formHelpers/formValidator';
import {configureForm} from 'components/experienceComponents/ExperiencesList/helpers';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import LocationTextField from './LocationTextField';
import SkillSelect from 'components/userProfileComponents/skillComponents/SkillSelect';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import DeleteExperience from 'components/experienceComponents/ExperiencesList/DeleteExperience';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: event => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleSubmit: () => {
      values.start_year = parseInt(values.start_year);
      values.end_year = parseInt(values.end_year);
      onSubmit(values);
    },

    handleLocation: location => {
      update('location')(location);
    },
    handleIsCurrent: e => {
      e.persist();
      values.is_current = e.target.checked;
      if (values.is_current === true) {
        update('end_month')('none');
        update('end_year')('0');
      } else {
        update('end_month')('');
        update('end_year')('');
      }
    },
    handleAchievements: update('achievements'),
    handleSkills: update('skills'),
  };

  return [values, handlers];
};

const AddOrEditExperienceForm = ({
  experience,
  capabilities,
  onSubmit,
  handleCancel,
  classes,
  onDelete,
  refreshDynamicInstructions,
  onSkillsMore,
}) => {
  const config = configureForm(experience.type);
  if (!config.showEndDate) {
    experience['end_year'] = 0;
    experience['end_month'] = 'none';
  }

  const [
    values,
    {
      handleChange,
      handleSubmit,
      handleAchievements,
      handleSkills,
      handleLocation,
      handleIsCurrent,
    },
  ] = useForm(experience, onSubmit);

  if (typeof values.start_year === String) {
    values.start_year = null;
  }

  const {
    type,
    start_month,
    end_month,
    start_year,
    end_year,
    is_current,
    location,
    host,
    title,
    degree,
    degree_other,
    link,
    link_name,
    description,
    achievements,
  } = values;

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  const inputProps = {classes: {input: classes.resize}, autoComplete: 'off'};

  const [errors, setErrors] = React.useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isDegreeOther, setIsDegreeOther] = React.useState(
    degree === 'Other' ? true : false
  );

  const handleFormSubmit = () => {
    // validate form values
    const {isError, err} = experienceValidator(values);

    if (isError) {
      setErrors(err);
    } else {
      return handleSubmit();
    }
  };

  const handleDegree = event => {
    event.persist();
    handleChange(event);
    if (event.target.value === 'Other') {
      setIsDegreeOther(true);
    } else {
      setIsDegreeOther(false);
    }
  };

  const saveExperienceHandler = () => {
    createClickTracking(
      'Experience',
      `Save ${experience.type}`,
      `Save ${experience.type} Button`
    );
    handleFormSubmit();
  };

  const handleAchievementsLocal = achievements => {
    handleAchievements(achievements);
  };

  return (
    <Grid
      container
      spacing={1}
      justify="space-between"
      className={classes.form}
    >
      <Grid item xs={12} align="end">
        <IconButton
          edge="end"
          aria-label="cancel form"
          onMouseDown={handleCancel}
          className={classes.iconButton}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      {config.showHost && (
        <Grid item xs={12}>
          <TextField
            required
            id="host"
            className={classes.formControl}
            label={config.labels.host || 'Organization'}
            value={host}
            name="host"
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.host_error || null}
          </FormHelperText>
        </Grid>
      )}
      {config.showDegree && (
        <Grid item xs={12}>
          <DegreeDropdown
            value={degree}
            onChange={handleDegree}
            name="degree"
            label="Type of Education *"
            errors={errors.degree_error}
          />
        </Grid>
      )}
      {isDegreeOther && (
        <Grid item xs={12}>
          <TextField
            required
            id="degree_other"
            className={classes.formControl}
            label="Explain Other (Type of Education)"
            value={degree_other}
            name="degree_other"
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.degreeOther_error || null}
          </FormHelperText>
        </Grid>
      )}

      <Grid item xs={12}>
        <TextField
          required
          id="title"
          className={classes.formControl}
          label={config.labels.title || 'Title'}
          value={title}
          name="title"
          onChange={handleChange}
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
        />
        <FormHelperText className={classes.formHelperText}>
          {errors.title_error || null}
        </FormHelperText>
      </Grid>

      {config.showLink && (
        <Grid item xs={12}>
          <TextField
            id="link"
            className={classes.formControl}
            label="URL (optional)"
            placeholder="Link to external documents, websites, photos, or documents"
            value={link || ''}
            name="link"
            onChange={handleChange}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
              shrink: true,
            }}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.link_error || null}
          </FormHelperText>

          {link && (
            <React.Fragment>
              <TextField
                id="link_name"
                className={classes.formControl}
                label="Link Name"
                placeholder="Name the link above (what will be displayed in place of the url)"
                value={link_name || ''}
                name="link_name"
                onChange={handleChange}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                  shrink: true,
                }}
                InputProps={inputProps}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.linkName_error || null}
              </FormHelperText>
            </React.Fragment>
          )}
        </Grid>
      )}
      {config.showLocation && (
        <Grid item xs={12}>
          <LocationTextField
            id="city"
            className={classes.formControl}
            label="City, State"
            value={location || ''}
            name="location"
            handleLocationChange={handleLocation}
          />
          <FormHelperText className={classes.formHelperText}>
            {errors.location_error || null}
          </FormHelperText>
        </Grid>
      )}
      <Grid item xs={6}>
        <SelectorForm
          type="month"
          label={
            experience.type === 'Accomplishment' ? 'Month' : 'Start Month *'
          }
          name="start_month"
          value={start_month === 'none' ? '' : start_month}
          onChange={handleChange}
          helperText={errors.startMonth_error || null}
        />
      </Grid>
      <Grid item xs={6}>
        <SelectorForm
          type="year"
          label={experience.type === 'Accomplishment' ? 'Year' : 'Start Year *'}
          name="start_year"
          value={start_year === 0 || start_year === '0' ? '' : start_year}
          onChange={handleChange}
          helperText={errors.startYear_error || null}
        />
      </Grid>
      {config.showEndDate ? (
        <React.Fragment>
          <Grid item xs={6}>
            <SelectorForm
              disabled={is_current}
              type="month"
              label={is_current ? 'Present' : 'End Month *'}
              name="end_month"
              value={end_month === 'none' ? '' : end_month}
              onChange={handleChange}
              helperText={
                errors.endMonth_error && !is_current
                  ? errors.endMonth_error
                  : null
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SelectorForm
              disabled={is_current}
              type="year"
              label={is_current ? 'Present' : 'End Year *'}
              name="end_year"
              value={end_year === 0 || end_year === '0' ? '' : end_year}
              onChange={handleChange}
              helperText={
                errors.endYear_error && !is_current
                  ? errors.endYear_error
                  : null
              }
            />
          </Grid>
        </React.Fragment>
      ) : null}
      {config.showEndDate && (
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={is_current}
                onChange={handleIsCurrent}
                value={is_current}
                name="is_current"
                color="primary"
                data-testid="is_current"
              />
            }
            label={
              type === 'Education'
                ? 'I am currently enrolled'
                : 'I am currently working in this role'
            }
          />
        </Grid>
      )}
      {config.showSkills && (
        <Grid item xs={12}>
          <Typography className={classes.skillLabel}>Skills</Typography>
          <Typography className={classes.skillSublabel}>
            Employers are looking for things like Project Management,
            Communication and
            <Link
              component="span"
              variant="body2"
              onClick={onSkillsMore}
              className={classes.moreDetails}
            >
              more...
            </Link>
          </Typography>

          <SkillSelect value={values.skills} onChange={handleSkills} />
        </Grid>
      )}
      {config.showDescription && (
        <Grid item xs={12}>
          <TextField
            className={classes.formControl}
            label={config.labels.description || 'Description'}
            value={description}
            name="description"
            id="description"
            multiline
            rows={4}
            onChange={handleChange}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
          <FormHelperText className={classes.formHelperText}>
            {description.length > 750 && errors.description_error}
          </FormHelperText>
        </Grid>
      )}
      {config.showAchievements && (
        <Grid item xs={12}>
          <AchievementInputsList
            errors={errors}
            contactId={experience.contact_id}
            achievements={achievements}
            capabilities={capabilities}
            onChange={handleAchievementsLocal}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
            label={
              config.labels.achievements.label ||
              'Responsibilities and Achievements:'
            }
            sublabel={config.labels.achievements.sublabel || ''}
          />
        </Grid>
      )}
      <Grid item xs={12} className={classes.alignButtonsBetween}>
        {onDelete ? (
          <Button
            className={classes.delete}
            variant="contained"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete this experience
          </Button>
        ) : (
          <span />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={saveExperienceHandler}
        >
          Save
        </Button>
      </Grid>
      {openDeleteDialog && (
        <DeleteExperience
          experience={experience}
          refreshDynamicInstructions={refreshDynamicInstructions}
          onDelete={onDelete}
          handleCancel={() => setOpenDeleteDialog(false)}
        />
      )}
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '7px 20px 20px 20px',
    marginBottom: '20px',
    backgroundColor: '#f7f7f7',
  },

  formControl: {
    width: '100%',
    marginTop: spacing(0),
  },
  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 19,
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
  },
  iconButton: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  alignButtonsBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing(1),
  },
  moreDetails: {
    display: 'inline',
    marginLeft: spacing(0.5),
    color: '#2971ff',
    alignSelf: 'center',
    '&:hover': {
      fontWeight: 'bold',
      textDecoration: 'none',
      color: '#0f60ff',
    },
  },
  delete: {
    padding: '5px 15px',
    '&:hover': {
      backgroundColor: palette.error.main,
      color: '#ffffff',
      borderColor: palette.error.dark,
    },
  },
  skillLabel: {
    fontSize: 18,
  },
  skillSublabel: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: spacing(1),
  },
});

AddOrEditExperienceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  experience: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    host: PropTypes.string,
    title: PropTypes.string,
    degree: PropTypes.oneOf([
      '',
      'Completes Classes',
      'Completed Training',
      'Certificate',
      'GED',
      'High School',
      'Associates',
      'Undergraduate',
      'Masters',
      'Doctoral',
      'Other',
    ]),
    start_month: PropTypes.string,
    start_year: PropTypes.number,
    end_month: PropTypes.string,
    end_year: PropTypes.number,
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education'])
      .isRequired,
    contact_id: PropTypes.number.isRequired,
    achievements: PropTypes.array,
  }).isRequired,
};

export default withStyles(styles)(AddOrEditExperienceForm);
