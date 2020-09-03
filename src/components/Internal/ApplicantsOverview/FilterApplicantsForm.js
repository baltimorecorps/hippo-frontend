import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const FilterApplicantsForm = ({classes, isOpen, handleClose}) => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const {gilad, jason, antoine} = state;
  const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  const formLeft = [
    {
      header: 'Profile Status',
      options: [
        {name: 'submitted', label: 'Submitted', checked: false},
        {name: 'approved', label: 'Approved', checked: false},
      ],
    },

    {
      header: 'Interested Programs',
      options: [
        {name: 'place_for_purpose', label: 'Place for Purpose', checked: false},
        {name: 'fellowship', label: 'Fellowship', checked: false},
        {name: 'public_allies', label: 'Public Allies', checked: false},
        {
          name: 'mayoral_fellowship',
          label: 'Mayoral Fellowship',
          checked: false,
        },
        {
          name: 'jhu_fellowship',
          label: 'JHU Carey Humanities Fellowship',
          checked: false,
        },
      ],
    },
    {
      header: 'Interested Roles',
      options: [
        {
          name: 'advocacy_public_policy',
          label: 'Advocacy and Public Policy',
          checked: false,
        },
        {
          name: 'community_engagement_outreach',
          label: 'Community Engagement and Outreach',
          checked: false,
        },
        {name: 'data_analysis', label: 'Data Analysis', checked: false},
        {
          name: 'fundraising_development',
          label: 'Fundraising and Development',
          checked: false,
        },
        {
          name: 'marketing_public_relations',
          label: 'Marketing and Public Relations',
          checked: false,
        },
        {
          name: 'program_management',
          label: 'Program Management',
          checked: false,
        },
      ],
    },
    {
      header: 'Years of Experience',
      options: [
        {name: 'zero_to_two_years', label: '0-2 years', checked: false},
        {name: 'three_to_five_years', label: '3-5 years', checked: false},
        {name: 'five_plus_years', label: '5+ years', checked: false},
      ],
    },
    {
      header: 'Job Search Status',
      options: [
        {
          name: 'actively_looking',
          label: 'Actively looking for a job',
          checked: false,
        },
        {
          name: 'two_to_six_month',
          label: 'Looking for a job in the next 2-6 months',
          checked: false,
        },
        {
          name: 'just_curious',
          label: 'Curious to see what opportunities are available',
          checked: false,
        },
      ],
    },
    {
      header: 'Participated Programs Before',
      options: [
        {name: 'yes', label: 'Yes', checked: false},
        {name: 'no', label: 'No', checked: false},
      ],
    },
    {
      header: 'Participated Programs or Service',
      options: [
        {
          name: 'fellowship',
          label: 'Baltimore Corps Fellowship',
          checked: false,
        },
        {
          name: 'civic_innovators',
          label: 'Civic Innovators Program',
          checked: false,
        },
        {name: 'elevation_awards', label: 'Elevation Awards', checked: false},
        {name: 'kiva', label: 'Kiva', checked: false},
        {
          name: 'mayoral_fellowship',
          label: 'Mayoral Fellowship',
          checked: false,
        },
        {name: 'public_allies', label: 'Public Allies', checked: false},
      ],
    },
  ];

  const formRight = [
    {
      header: 'Employment Status',
      options: [
        {name: 'unemployed', label: 'Unemployed', checked: false},
        {name: 'part_time', label: 'Employed part-time', checked: false},
        {name: 'full_time', label: 'Employed full-time', checked: false},
      ],
    },
    {
      header: 'Currently Student',
      options: [
        {name: 'yes', label: 'Yes', checked: false},
        {name: 'no', label: 'No', checked: false},
      ],
    },

    {
      header: 'Race',
      options: [
        {
          name: 'american_indian',
          label: 'American Indian or Alaskan Native',
          checked: false,
        },
        {name: 'asian', label: 'Asian', checked: false},
        {name: 'black', label: 'Black or African Descent', checked: false},
        {name: 'hispanic', label: 'Hispanic or Latinx', checked: false},
        {
          name: 'hawaiian',
          label: 'Native Hawaiian or Other Pacific Islander',
          checked: false,
        },
        {name: 'south_asian', label: 'South Asian', checked: false},
        {name: 'white', label: 'White', checked: false},
        {name: 'not_listed', label: 'Not Listed', checked: false},
      ],
    },
    {
      header: 'Gender',
      options: [
        {name: 'Female', label: 'Female', checked: false},
        {name: 'Male', label: 'Male', checked: false},
        {name: 'Non-Binary', label: 'Non-Binary', checked: false},
        {name: 'Not Listed', label: 'Not Listed', checked: false},
      ],
    },
    {
      header: 'Pronoun',
      options: [
        {name: 'she', label: 'She/Her/Hers', checked: false},
        {name: 'he', label: 'He/Him/His', checked: false},
        {name: 'they', label: 'They/Them/Their', checked: false},
        {name: 'not_listed', label: 'Not Listed', checked: false},
      ],
    },
    {
      header: 'How they hear about us',
      options: [
        {
          name: 'Baltimore Corps Website',
          label: 'Baltimore Corps Website',
          checked: false,
        },
        {name: 'Facebook', label: 'Facebook', checked: false},
        {name: 'Instagram', label: 'Instagram', checked: false},
        {name: 'Indeed', label: 'Indeed', checked: false},
        {name: 'LinkedIn', label: 'LinkedIn', checked: false},
        {name: 'School', label: 'School', checked: false},
        {name: 'Virtual Event', label: 'Virtual Event', checked: false},
        {name: 'Other', label: 'Other', checked: false},
      ],
    },
  ];

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
          {formLeft.map((form, index) => (
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
                        onChange={handleChange}
                        name={option.name}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
            </React.Fragment>
          ))}
        </div>
        <div className={classes.checkboxContainer}>
          {formRight.map((form, index) => (
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
                        onChange={handleChange}
                        name={option.name}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
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
    [breakpoints.up('sm')]: {},
  },
  dialogTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    width: '300px',

    // // maxWidth: '1200px',
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
    // width: '45%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
export default withStyles(styles)(FilterApplicantsForm);
