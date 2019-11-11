import React from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const CardGroup = ({items}) => {
  return (
    <Grid container spacing={3}>
      {items.map(({href, header, meta, description}, index) => (
        <Grid item key={header + index} xs={3}>
          <Link to={href}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {header}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="h3">
                  {meta}
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGroup;
