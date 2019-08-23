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

const TalentProfile = ({ contactId, contactInfo, refreshContacts, classes }) => {
  if (typeof contactInfo === 'undefined') {
    refreshContacts();
    return <div />;
  }

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

  return (
    <div className={classes.page}>
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
            <Typography gutterBottom variant="h3" component="h1">
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

      <Grid container justify="center" className={classes.wrapper}>
        <Button variant="contained" color="primary" onClick={pdfToHTML}>
          <Icon className={classes.leftIcon}>cloud_download</Icon> Download Resume
        </Button>
      </Grid>
    </div>
  );
};
TalentProfile.propTypes = {
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
    marginBottom: `${spacing.unit * 5}px`,
  },
  paper: {
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
    marginBottom: `${spacing.unit * 5}px`,
  },
  divider: {
    margin: `${spacing.unit * 1}px 0`,
  },
  leftIcon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(TalentProfile);
