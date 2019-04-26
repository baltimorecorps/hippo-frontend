import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Achievements from './Achievements';
import ExperiencesList from './ExperiencesList';
import ResumeHeader from './ResumeHeader';
import SkillGroups from './SkillGroups';

const GeneratedResumePage = ({
  achievements,
  contactInfo,
  experiences,
  skillGroups,
  classes,
}) => {
  return (
    <Grid container justify='center'>
      <Grid item xs={10}>

        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <ResumeHeader contactInfo={contactInfo} />
            </Grid>

            <Grid item xs={8}>
              <ExperiencesList
                name='Work Experience'
                experiences={experiences.work}
              />
              <ExperiencesList
                name='Service and Leadership'
                experiences={experiences.service}
              />
              <ExperiencesList
                name='Education'
                experiences={experiences.education}
              />
            </Grid>

            <Grid item xs={4}>
              <Achievements achievements={achievements} />
              <SkillGroups skillGroups={skillGroups} />
            </Grid>
          </Grid>
        </Paper>

      </Grid>
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    marginTop: spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
  },
});

export default withStyles(styles)(GeneratedResumePage);
