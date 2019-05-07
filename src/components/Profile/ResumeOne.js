import React from "react";
/*import PropTypes from '../lib/PropTypes';*/
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import Navbar from "react-bootstrap/Navbar";
//import Nav from "react-bootstrap/Nav";
//import Form from "react-bootstrap/Form";
//import FormControl from "react-bootstrap/FormControl";
//import Button from "react-bootstrap/Button";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "../../index.css";

import PropTypes from 'prop-types';
//import classNames from "classnames";
//import MenuItem from "@material-ui/core/MenuItem";
//import Button from '@material-ui/core/Button';
//import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
/*import { withStyles } from "@material-ui/core/styles";*/
//import TextField from '@material-ui/core/TextField';
import { blue } from "@material-ui/core/colors";

class ResumeOne extends React.Component {
  state = {
    last_name: "",
    first_name: "",
    email_primary: "",
    phone_primary: "",
    gender: "",
    race_all: "",
    birthday: ""
  };

  handleChange = varName => event => {
    this.setState({ varName: event.target.value });
  };

  render() {
    //const { classes } = this.props;
    return (
      <div>
        <Container>
          <Row className="profileHeader">
            <div style={{ paddingTop: "30px", margin: "20px" }}>
              <h1>Billy Daly</h1>
              <p>Data Science & Data Architecture</p>
            </div>
            <img
              className="icon"
              src="/logos/long.png"
              alt="Baltimore Corps Logo"
              height="200px"
            />
            <div className="contact" style={{ paddingTop: "30px" }}>
              <p>billy@baltimorecorps.org</p>
              <p>908-578-4622</p>
              <p>Baltimore, MD 21201</p>
            </div>
          </Row>
          <Row
            style={{
              minHeight: "780px",
              minWidth: "800px",
              overflow: "scroll"
            }}
          >
            <Col
              className="column"
              xs={12}
              md={8}
              style={{ backgroundColor: "#eaf9f9", overflow: "hidden" }}
            >
              <Row>
                <div className="infoBlock">
                  <h5> Work Experience </h5>
                  <p>
                    <strong>September 2015 - Present</strong>
                  </p>
                  <p style={{ color: "grey" }}>
                    <strong>Baltimore Corps, Systems Design Manager</strong>
                  </p>
                  <div>
                    {" "}
                    Redesigned the Salesforce architecture to facilitate easier
                    reporting. Formalized organizational strategy for defining
                    and analyzing KPIs. Developed recruitment projection tools
                    to model and track progress to goals. Designed and
                    implemented recommendation algorithm to facilitate job
                    matching. Helped position Baltimore Corps as a thought
                    leader among data driven nonprofits through publications and
                    presentations.
                  </div>
                  <br />
                  <p>
                    {" "}
                    <strong>September 2015 - December 2015</strong>
                  </p>
                  <p style={{ color: "grey" }}>
                    <strong>
                      Baltimore Green Currency Association, Database
                      Administrator
                    </strong>
                  </p>
                  <div>
                    Assisted in the implementation of MySQL databases of
                    participating businesses. Helped design a tracking system to
                    monitor the circulation of BNote currency. Modeled potential
                    investment opportunities for the funds held on reserve for
                    BNotes.
                  </div>
                  <br />
                </div>
              </Row>

              <Row>
                <div className="infoBlock">
                  <h5> Service and Leadership </h5>
                  <p>
                    <strong>September 2015 - Present</strong>
                  </p>
                  <p style={{ color: "grey" }}>
                    <strong>Baltimore Corps, Systems Design Manager</strong>
                  </p>
                  <div>
                    {" "}
                    Contributed to the DGS GitHub repository for analyzing
                    city-wide data. Presented on Baltimore Corps' use of python
                    for data science.
                  </div>
                  <br />
                </div>
              </Row>
              <Row>
                <div className="infoBlock">
                  <h5> Education </h5>
                  <p>
                    <strong>September 2015 - Present</strong>
                  </p>
                  <p style={{ color: "grey" }}>
                    <strong>
                      University of Michigan, Applied Data Science with Python
                    </strong>
                  </p>
                  <div>
                    <p>
                      Applied Plotting, Charting, & Data Representation in
                      Python
                    </p>
                    <p>Applied Social Network Analysis in Python </p>
                  </div>

                  <br />
                </div>
              </Row>
            </Col>
            <Col
              className="accomColumn"
              xs={6}
              md={4}
              style={{ backgroundColor: "#e6f9e3", overflow: "hidden" }}
            >
              <Row>
                <div className="infoBlock">
                  <h5> Accomplishments </h5>
                  <div className="rightCol">
                    <div style={{ marginRight: "5px" }}> Nov 2017 </div>
                    <div style={{ color: "grey" }}>
                      <div>
                        {" "}
                        <strong>Dreamforce Conference</strong>
                      </div>
                      <div> Salesforce Communities Presentation</div>
                    </div>
                  </div>
                  <div className="rightCol">
                    <div style={{ marginRight: "5px" }}> Nov 2017 </div>
                    <div style={{ color: "grey" }}>
                      <div>
                        {" "}
                        <strong>FormAssembly Blog</strong>
                      </div>
                      <div> Salesforce Communities Presentation</div>
                    </div>
                  </div>
                  <br />
                </div>
              </Row>
              <Row>
                <div className="infoBlock">
                  <h5>Skills and Abilities </h5>
                  <div className="allSkills">
                    <div className="skillCategory">
                      <p style={{ color: "grey" }}>
                        <strong>Data Science</strong>
                      </p>
                      <div className="skills">
                        <div className="skill">
                          <div className="float_left">Statistics</div>
                          <div className="float_right">3 years</div>
                        </div>
                        <div className="skill">
                          <div className="float_left">Python</div>
                          <div className="float_right">3 years</div>
                        </div>
                        <div className="skill">
                          <div className="float_left">R</div>
                          <div className="float_right">3 years</div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="skillCategory">
                      <p style={{ color: "grey" }}>
                        <strong>Data Architecture</strong>
                      </p>
                      <div className="skills">
                        <div className="skill">
                          <div className="float_left">Salesforce</div>
                          <div className="float_right">3 years</div>
                        </div>
                        <div className="skill">
                          <div className="float_left">UML?ERD</div>
                          <div className="float_right">3 years</div>
                        </div>
                        <div className="skill">
                          <div className="float_left">SQL</div>
                          <div className="float_right">3 years </div>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ResumeOne.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = ({ breakpoints, palette, spacing, theme }) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "50px"
  },
  row: {
    backgroundColor: blue
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

export default withStyles(styles)(ResumeOne);
