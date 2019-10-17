import React from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ResumesListItem = ({resumeId, contactId, name}) => {
  return (
    <Grid item xs={3}>
      <Card key={resumeId}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            to={`/contacts/${contactId}/resume/${resumeId}`}
            component={AdapterLink}
          >
            View
          </Button>
          <Button
            size="small"
            color="secondary"
            to={`/contacts/${contactId}/create-resume/${resumeId}`}
            component={AdapterLink}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

export default ResumesListItem;
