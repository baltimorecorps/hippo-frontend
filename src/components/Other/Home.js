import React from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Home = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Typography gutterBottom variant="h3" component="h1">
          Baltimore Corps Talent Matching
        </Typography>
        <Grid container justify="space-between" spacing={3}>
          {Home.cardDetails.map(({header, description, imageName, url}) => (
            <Grid item key={header} xs={3}>
              <Link to={url}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/images/${imageName}.jpeg`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {header}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                      {description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      Log in / Sign up
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

Home.cardDetails = [
  {
    header: "Talent",
    description:
      "Join as a talent, you can find numerous positions/opportunities in NGO here.",
    imageName: "talent",
    url: "/contacts",
  },
  {
    header: "Organization",
    description:
      "Join as an organization, you can find numerous talents for your organization.",
    imageName: "organization",
    url: "/contacts",
  },
  {
    header: "Baltimore Corps Staff",
    description:
      "As a Baltimore Staff, you can access data stored in database.",
    imageName: "baltimoreCorpsStaff",
    url: "/contacts",
  },
];

export default Home;
