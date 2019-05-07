import React from "react";
import { Link } from "react-router-dom";
/*import PropTypes from '../lib/PropTypes';*/
import PropTypes from 'prop-types';
//import classNames from "classnames";
//import MenuItem from "@material-ui/core/MenuItem";
//import Button from '@material-ui/core/Button';
import { Button } from "semantic-ui-react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
/*import { withStyles } from "@material-ui/core/styles";*/
import TextField from "@material-ui/core/TextField";

const races = [
  {
    value: 'asian',
    label: 'Asian',
  },
  {
    value: 'african-american',
    label: 'African-american',
  },
];
const genders = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

class TextFields extends React.Component {
  state = {
    last_name: '',
    first_name: '',
    email_primary: '',
    phone_primary: '',
    gender: '',
    race_all: '',
    birthday: '',
  };

  handleChange = (varName) => (event) => {
    this.setState({ varName: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <img
            className={classes.avatar}
            src="/logos/long.png"
            alt="Baltimore Corps Logo"
          />
          <Typography component="h1" variant="h5">
            Contact Form
          </Typography>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="standard-name"
              label="First Name"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange("first_name")}
              margin="normal"
            />
            <TextField
              required
              id="standard-name"
              label="Last Name"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange("last_name")}
              margin="normal"
            />
            <TextField
              required
              id="email"
              label="Primary Email"
              className={classes.textField}
              margin="normal"
            />

            <TextField
              required
              id="phone"
              label="Primary Phone"
              className={classes.textField}
              margin="normal"
            />

            <TextField
              id="standard-select-currency-native"
              select
              label="Gender select"
              className={classes.textField}
              value={this.state.currency}
              onChange={this.handleChange("gender")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
            >
              {genders.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <TextField
              id="standard-select-currency-native"
              select
              label="Race select"
              className={classes.textField}
              value={this.state.currency}
              onChange={this.handleChange("race")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              /*helperText="Please select your race"*/
              margin="normal"
            >
              {races.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="standard-full-width"
              label="Address"
              style={{ margin: 8 }}
              placeholder="110 Waterman Street, Apt 210, Providence, RI, 02215"
              helperText="Please enter your address"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <div>
              <Link to="/Talent">
                {" "}
                <Button fluid type="submit" color="primary">
                  Submit
                </Button>
              </Link>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styles = ({ breakpoints, palette, spacing, theme }) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "50px"
  },
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  main: {
    width: "auto",
    marginLeft: spacing.unit * 3,
    marginRight: spacing.unit * 3,
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`
  },
  avatar: {
    width: "100%",
    marginBottom: spacing.unit
  },
  password: {
    marginBottom: spacing.unit * 3
  },
  submitButton: {
    marginBottom: spacing.unit * 3
  }
});

export default withStyles(styles)(TextFields);
