import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Fade,
  Container,
  Backdrop,
  Button,
  Modal,
  Link,
} from '@material-ui/core';
import MayoralAuth from './mayoralAuth';

const useStyles = makeStyles(theme => ({
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
    fontSize: '1.4rem',
    lineHeight: '25px',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(2, 3, 3),
    marginBottom: theme.spacing(2),
    outline: 'none',
  },
}));

export default function FellowshipModal({program}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  let program_name, description, link;
  switch (program) {
    default:
      program_name = 'Baltimore Corps Fellowship';
      description =
        'The jobs listed here are full time roles with the additional commitment to our 10-month Baltimore Corps Fellowship program. Fellowship programming includes race & equity workshops, online-learning assignments including a Change Recommendation capstone project and presentation, as well as professional development and networking opportunities. Fellows can expect to engage in programming and online-learning for approximately 6 to 8 hours per month.';
      link = 'https://www.baltimorecorps.org/fellowship';

      break;

    case 'Mayoral Fellowship':
      program_name = 'Mayoral Fellowship';
      description =
        'The Mayoral Fellowship is an opportunity that provides a 10-week, full-time, placement in a Mayoral office or Baltimore City agency. Placements are based on the Fellow’s background and interests, coupled with the needs of city agencies and departments. To access these roles users must be approved.';
      link = 'https://www.baltimorecorps.org/mayoral';
  }

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
          <Paper className={classes.container}>
            <Container
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
              }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="h1"
                className={classes.title1}
                color="secondary"
              >
                {' '}
                Welcome to the {program_name} Program:
              </Typography>
              <Typography
                style={{padding: '1%'}}
                gutterBottom
                variant="body1"
                component="p"
                align="justify"
              >
                {' '}
                {description}
                <Link
                  variant="body1"
                  href={link}
                  target="_blank"
                  rel="noopener"
                  color="secondary"
                  style={{padding: '1%', width: '100%'}}
                  component="a"
                  align="center"
                >
                  Click here to learn more about this program.
                </Link>
              </Typography>
              {program_name === 'Baltimore Corps Fellowship' ? (
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="contained"
                  color="secondary"
                  style={{width: 'auto'}}
                >
                  I understand and would like to check out the Fellowship roles.
                </Button>
              ) : (
                <>
                  <MayoralAuth handleClose={handleClose} />
                </>
              )}
            </Container>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
