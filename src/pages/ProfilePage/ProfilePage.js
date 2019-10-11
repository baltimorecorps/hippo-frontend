import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import BasicInfoDisplay from 'modules/Users/BasicInfoDisplay';
import ExperiencesList from 'modules/Experiences/ExperiencesList';
import SkillsList from 'modules/Tags/SkillsList';
import ResumesList from 'modules/Resumes/ResumesList';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProfilePage = ({ contactId, contactInfo, refreshContacts, classes }) => {
  // If the state for this contact hasn't been loaded yet, we try and reload
  // that state from the API. If this load goes well, this page should be
  // rerendered due to the Redux state update
  if (typeof contactInfo === 'undefined') {
    refreshContacts();
    // TODO: Ideally we have a better empty/error state here
    return <div />;
  }

  // printDocument is not in use at the moment, but it was an alternate first
  // pass attempt at a way to generate a pdf version of a resume
  //
  // eslint-disable-next-line no-unused-vars
  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      //pdf.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
      pdf.save('resume.pdf');
    });
  };

  // pdfToHTML is another first pass attempt at turning the information on a
  // profile into a PDF resume
  const pdfToHTML = () => {
    const pdf = new jsPDF('p', 'pt', 'letter');
    const source = document.getElementById('divToPrint');
    const specialElementHandlers = {
      '#bypassme': function(element, renderer) {
        return true;
      },
    };

    const margins = {
      top: 50,
      left: 60,
      width: 545,
    };

    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, // y coord
      {
        width: margins.width, // max width of content on PDF
        elementHandlers: specialElementHandlers,
      },
      function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        // this allow the insertion of new lines after html
        pdf.save('html2pdf.pdf');
      },
    );
  };

  const email = contactInfo.email_primary ? contactInfo.email_primary.email : '';

  // This page primarily serves as the top level container for the profile of
  // this person's employment-relevant experiences and skills.
  //
  // The three main components it makes use of are BasicInfoDisplay,
  // ExperiencesList, and SkillsList
  return (
    <React.Fragment>
      <Grid id="divToPrint" container justify="center" className={classes.wrapper}>
        <Grid item xs={8}>
          <BasicInfoDisplay
            firstName={contactInfo.first_name}
            lastName={contactInfo.last_name}
            email={email}
            phone={contactInfo.phone_primary}
          />

          <ExperiencesList contactId={contactId} experienceType="Work" />
          <ExperiencesList contactId={contactId} experienceType="Education" />
          <ExperiencesList contactId={contactId} experienceType="Service" />
          <ExperiencesList contactId={contactId} experienceType="Accomplishment" />

          <Paper className={classes.paper}>
            <Typography gutterBottom variant="h5" component="h1">
              Skills and Abilities
            </Typography>
            <Divider className={classes.divider} />
            <SkillsList contactId={contactId} tagType="Function" />
            <SkillsList contactId={contactId} tagType="Skill" />
            <SkillsList contactId={contactId} tagType="Topic" />
          </Paper>

          <ResumesList />
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Button variant="contained" color="primary" onClick={pdfToHTML}>
          <Icon className={classes.leftIcon}>cloud_download</Icon> Download Resume
        </Button>
      </Grid>
    </React.Fragment>
  );
};
ProfilePage.propTypes = {
  contactId: PropTypes.any.isRequired,
  contactInfo: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email_primary: PropTypes.object.isRequired,
    phone_primary: PropTypes.string.isRequired,
  }),
  refreshContacts: PropTypes.func.isRequired,
};

const styles = ({ breakpoints, palette, spacing }) => ({
  page: {
    backgroundColor: 'hsl(216, 18%, 89%)',
  },
  wrapper: {
    marginBottom: spacing(5),
  },
  paper: {
    padding: spacing(2, 3, 3),
    marginBottom: spacing(5),
  },
  divider: {
    margin: spacing(1, 0),
  },
  leftIcon: {
    marginRight: spacing(1),
  },
});

export default withStyles(styles)(ProfilePage);
