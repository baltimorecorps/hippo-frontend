import {connect} from "react-redux";
import GeneratedResumePage from "./GeneratedResumePage";

import {refreshResume} from "actions/resume";
import {refreshContacts} from "actions/contacts";

const mapStateToProps = (state, ownProps) => {
  const {contactId, resumeId} = ownProps.match
    ? ownProps.match.params
    : ownProps;
  const contactInfo = state.contacts[contactId];
  const resume = state.resume[resumeId];
  if (!resume || !contactInfo) {
    return {
      resumeId,
      achievements: [],
      contactInfo: {
        name: "",
        roles: [],
        title: "",
        email: "",
        phoneNumber: "",
        city: "",
        state: "",
      },
      experiences: {
        service: [],
        education: [],
        work: [],
      },
      skillGroups: [],
    };
  }

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
      roles: [],
      title: "",
      email: contactInfo.email_primary.email,
      phoneNumber: contactInfo.phone_primary.replace(/-/g, ""),
      city: "",
      state: "",
    },
    experiences: {
      service: getExperiences("Relevant Experience"),
      education: getExperiences("Education"),
      work: getExperiences("Experience"),
    },
    skillGroups: [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    refreshContacts: () => refreshContacts(dispatch),
    refreshResume: resumeId => refreshResume(resumeId)(dispatch),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneratedResumePage);

export default Container;
