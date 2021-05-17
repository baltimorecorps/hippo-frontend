import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Fade, Container, Backdrop, Button, Modal} from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title1: {
    fontSize: "1.4rem",
    lineHeight: "25px",
    textTransform: "uppercase",
    textAlign:'center'
},
container:{
    display:"flex",
    padding:'1%',
    alignItems:'center',
    justifyContent:'center',
    width:'80vw'
    
},

}));

export default function FellowshipModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Paper  className={classes.container}>
{/* <div className={classes.paper}> */}
          <Container style={{ display:'flex', flexDirection:'column', margin:'0 auto'}}>
          <Typography
            gutterBottom
            variant="h4"
            component="h1"
            className={classes.title1}
            color="secondary"
        > Welcome to the Fellowship: 
            </Typography>
            <Typography
              style={{padding: '1%'}}
              gutterBottom
              variant="body1"
              component="p"
              align="justify"
            >The jobs listed here are full time roles with the additional commitment to our 10-month Baltimore Corps Fellowship program. Fellowship programming includes race & equity workshops, online-learning assignments including a Change Recommendation capstone project and presentation, as well as professional development and networking opportunities. Fellows can expect to engage in programming and online-learning for approximately 6 to 8 hours per month. </Typography>
            <Button type="button" onClick={handleClose} variant="contained" color="secondary" style={{width:'100%'}}>
            I understand and would like to check out the Fellowship roles. 
      </Button>

</Container>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
