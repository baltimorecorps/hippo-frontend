import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {refreshResume} from 'actions/resume';
import ResumePreview from './ResumePreview';

export const mapStateToProps = (state, props) => {
  const {resumeId} = props.match ? props.match.params : props;
  const resume = state.resumes[resumeId];

  if (!resume) {
    return {
      resumeId,
      achievements: [],
      contactInfo: {
        name: '',
        roles: [],
        title: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
      },
      experiences: {
        service: [],
        education: [],
        work: [],
      },
      skillGroups: [],
    };
  }

  const contactId = state.resumes[resumeId].contact_id;
  const contactInfo = state.contacts[contactId];

  const sections = Object.values(resume.sections);
  const getExperiences = name =>
    (sections.find(experience => experience.name === name) || {items: []}).items
      .filter(i => i.experience)
      .map(({experience}) => ({
        positionName: experience.title,
        orgName: experience.host,
        startDate: experience.date_start,
        endDate: experience.date_end,
        feats: [],
      }));

  return {
    resumeId,
    achievements: [],
    contactInfo: {
      name: `${contactInfo.first_name} ${contactInfo.last_name}`,
      email: contactInfo.email_primary.email,
      phoneNumber: contactInfo.phone_primary.replace(/-/g, ''),
    },
    experiences: {
      service: getExperiences('Relevant Experience'),
      education: getExperiences('Education'),
      work: getExperiences('Work Experience'),
    },
    skillGroups: [],
  };
};

const mapDispatchToProps = dispatch => ({
  refreshResume: resumeId => refreshResume(resumeId)(dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResumePreview)
);
