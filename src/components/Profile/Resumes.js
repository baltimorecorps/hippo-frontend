import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const Resumes = ({
  contactId,
  refreshResumes,
  resumes,
  classes,
}) => {
  useEffect(() => {
    refreshResumes(contactId);
  }, [refreshResumes]);

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h3" component="h1">
            Resumes
          </Typography>
          <Grid container spacing={24}>
            {resumes.map(resume =>
              <Grid item xs={3}>
                <Card key={resume.id}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {resume.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="secondary"
                      to={`/Contacts/${contactId}/Resume/${resume.id}`}
                      component={AdapterLink}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      to={`/Contacts/${contactId}/create-resume/${resume.id}`}
                      component={AdapterLink}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  paper: {
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
  },
});

export default withStyles(styles)(Resumes);
