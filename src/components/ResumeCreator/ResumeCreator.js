import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const ResumeCreator = ({classes}) => {
  return (
    <Grid container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} className={classes.header}>
            <Grid container>
              <Grid item xs={9} className={classes.vertical}>
                <span className={classes.name}>David Koh</span>
                <span className={classes.vocation}>Software Engineer</span>
              </Grid>
              <Grid item xs={3} className={classes.headerDetails}>
                <span>Tuscaloosa, AL</span>
                <span>(555) 123-4567</span>
                <span>david@example.com</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.body}>
            <Grid container>
              <Grid item xs={9}>
                <div className={classes.section} >
                <div className={classes.sectionHeader}>
                  Relevant Experience
                </div>
                <div className={classes.largeItem}>
                  <div><span className={classes.itemOrg}>OkCupid &mdash;</span><span className={classes.itemLoc}>New York, NY</span></div>
                  <span className={classes.itemTitle}>Director of Engineering</span>
                  <span className={classes.itemDates}>January 2015 - July 2016</span>
                  <span className={classes.itemAchievement}>Redesigned the Salesforce architecture to facilitate easier reporting.</span>
                  <span className={classes.itemAchievement}>Formalized otrganizational strategy for defining and analyzing KPIs.</span>
                  <span className={classes.itemAchievement}>Developed recruitment projection tools to model and track progress to goals.</span>
                  <span className={classes.itemAchievement}>Designed and implemented recommendation algorithm to facilitate job matching.</span>
                  <span className={classes.itemAchievement}>Helped position Baltimore Corps as a thought leader among data driven nonprofits through publications and presentations.</span>
                </div>
                  </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.section}>
                <div className={classes.sectionHeader}>
                  Skills &amp; Abilities
                </div>
                  <span className={classes.capability}>Data Science</span>
                  <span className={classes.skill}>C</span>
                  <span className={classes.skill}>C++</span>
                  <span className={classes.skill}>Machine Learning</span>
                  <span className={classes.skill}>Unix Systems</span>
                  <span className={classes.skill}>Logic Programming</span>
                  <span className={classes.skill}>GUI Graphics</span>
                  <span className={classes.skill}>Windows Programming</span>
                  <span className={classes.capability}>Data Management</span>
                  <span className={classes.skill}>Microsoft Access</span>
                  <span className={classes.skill}>Microsoft Excel</span>
                  <span className={classes.skill}>Data Organizing</span>
                  <span className={classes.skill}>Data Structures</span>
                  <span className={classes.skill}>Process Management</span>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: `${spacing(3)}px ${spacing(1.5)}px`,
    fontFamily: "Merriweather",
  },
  container: {
    margin: `${spacing(5)}px ${spacing(0)}px`,
  },
  name: {
    fontWeight: 700,
    fontSize: "20pt",
    paddingTop: spacing(2),
    paddingBottom: spacing(1),
  },
  vocation: {
    fontWeight: 400,
    fontSize: "12pt",
    color: "#93c47d",
  },
  header: {
    padding: spacing(1),
    backgroundColor: "#f4f0de",
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing(2.5),
    fontWeight: 300,
    fontSize: "9pt",
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
  },
  section: {
    display: 'inline-flex',
    flexDirection: 'column',
    paddingLeft: spacing(1),
    marginRight: spacing(2),
  },
  sectionHeader: {
    fontWeight: 400,
    fontSize: "12pt",
    color: "#2079c7",
    paddingTop: spacing(3),
    paddingBottom: spacing(0.5),
    paddingLeft: spacing(1),
    marginBottom: spacing(0.5),
    borderBottom: "solid 2px #2079c7",
  },
  largeItem: {
    display: 'inline-flex',
    flexDirection: 'column',
    marginTop: spacing(1.5),
    padding: spacing(1),
    borderLeft: "solid 3px #93c47d",
    fontWeight: 400,
    fontSize: "9pt",
    fontFamily: "Quicksand",
    borderRadius: "1px",
    backgroundColor: "#fbfbfb",
    boxShadow: "0 1px 1px rgba(9,30,66,.25)",
  },
  itemOrg: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
    fontWeight: 400,
    fontSize: "10pt",
    fontFamily: "Merriweather",
  },
  itemTitle: {
    paddingTop: spacing(0.5),
    fontWeight: 400,
    fontSize: "10pt",
    fontFamily: "Merriweather",
  },
  itemLoc: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
    fontWeight: 400,
    fontFamily: "Merriweather",
    fontSize: "10pt",
    fontStyle: "italic",
  },
  itemDates: {
    marginTop: spacing(1),
    fontWeight: 300,
    fontFamily: "Merriweather",
    fontSize: "9pt",
    color: "#434343",
  },
  itemAchievement: {
    paddingLeft: spacing(2),
    paddingTop: spacing(0.5),
  },
  capability: {
    marginTop: spacing(1),
    fontWeight: 300,
    fontFamily: "Merriweather",
    fontSize: "10pt",
  },
  skill: {
    paddingTop: spacing(0.5),
    paddingLeft: spacing(2),
    fontWeight: 400,
    fontFamily: "Quicksand",
    fontSize: "9pt",
  }

});

export default withStyles(styles)(ResumeCreator);
