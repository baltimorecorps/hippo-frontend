import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ResumesListItem from "./ResumesListItem";

const ResumesList = ({contactId, refreshResumes, resumes, classes}) => {
  useEffect(() => {
    refreshResumes(contactId);
  }, [refreshResumes, contactId]);

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5" component="h1">
            Resumes
          </Typography>
          <Grid container spacing={3}>
            {resumes.map(({id, name}) => (
              <ResumesListItem
                key={id}
                contactId={contactId}
                resumeId={id}
                name={name}
              />
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: spacing(2, 3, 3),
  },
});

export default withStyles(styles)(ResumesList);
