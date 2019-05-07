import { connect } from "react-redux";
import { createSelector } from "redux-starter-kit";
import Experience from "./Experience";

import {
  addExperience,
  refreshExperienceType,
  updateExperience,
  deleteExperience
} from "../../actions/profile";

const getExperiences = createSelector(
  ["experiences"],
  experiences => Object.keys(experiences).map(id => experiences[id])
);

const getContact = (state, props) => props.contactId;
const getTypeFilter = (state, props) => props.experienceType;

const makeGetRelevantExperiences = () => {
  const getRelevantExperiences = createSelector(
    [getExperiences, getContact, getTypeFilter],
    (exps, contactId, type) =>
      exps
        .filter(exp => exp.contact_id.toString() === contactId.toString())
        .filter(exp => exp.type === type)
  );
  return getRelevantExperiences;
};

export const makeMapStateToProps = () => {
  const getRelevantExperiences = makeGetRelevantExperiences();
  const mapStateToProps = (state, ownProps) => ({
    experiences: getRelevantExperiences(state, ownProps)
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addNewExperience: experience => addExperience(experience)(dispatch),
    updateExperience: experience => updateExperience(experience)(dispatch),
    deleteExperience: experience => deleteExperience(experience)(dispatch),
    refreshExperiences: () =>
      refreshExperienceType(props.contactId, props.experienceType)(dispatch)
  };
};

const Container = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Experience);

export default Container;
