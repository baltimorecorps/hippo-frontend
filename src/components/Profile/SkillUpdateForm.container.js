import { connect } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import SkillUpdateForm from './SkillUpdateForm';

const getTags = createSelector(
  ['tags'],
  (tags) => Object.keys(tags).map((id) => tags[id]),
);
const getTypeFilter = (state, props) => props.tagType;

const makeGetRelevantTags = () => {
  const getRelevantTags = createSelector(
    [getTags, getTypeFilter],
    (tags, type) => tags.filter((tag) => tag.type === type),
  );
  return getRelevantTags;
};

export const makeMapStateToProps = () => {
  const getRelevantTags = makeGetRelevantTags();
  const mapStateToProps = (state, props) => {
    return {
      allTags: getRelevantTags(state, props),
    };
  };
  return mapStateToProps;
};

const SkillUpdateFormContainer = connect(makeMapStateToProps)(SkillUpdateForm);
export default SkillUpdateFormContainer;
