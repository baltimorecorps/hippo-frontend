import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // borderRadius: "0 1rem 0 0"
  },
  media: {
    height: 200,
    // borderRadius: "0 1rem 0 0"
  }
});

export default function OfferingCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disableRipple>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}