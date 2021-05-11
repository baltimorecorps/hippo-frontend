import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor:'primary'
    // borderRadius: "0 1rem 0 0"
  },
  media: {
    height: 200,
    // borderRadius: "0 1rem 0 0"
  }
});

export default function TestimonialCard(props) {
  const classes = useStyles();

  return (
    
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.quote}
        />
        <CardContent style={{backgroundColor: "#ffcc33"}}>
          <Typography gutterBottom variant="h6" component="h2">
            {props.quote}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            {props.author}
          </Typography>
        </CardContent>
    </Card>
  );
}