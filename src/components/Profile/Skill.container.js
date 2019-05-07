import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'redux-starter-kit';
import Skill from './Skill';

import {
  refreshTags,
  addTagItem,
  deleteTagItem,
  updateTagItem,
  refreshTagItems,
} from '../../actions/profile';

const getTags = createSelector(
  ['tags'],
  tags => Object.keys(tags).map(id => tags[id]),
);

const getContact = (state, props) => props.contactId;
const getTypeFilter = (state, props) => props.tagType;

const makeGetRelevantTagItems = () => {
  const getRelevantTagItems = createSelector(
    ['tagItems', getContact, getTypeFilter],
    (tagItems, contactId, type) => {
      const tagItemMap = tagItems[contactId];
      if (!tagItemMap) {
        return [];
      }

      return Object.keys(tagItemMap)
        .map(id => tagItemMap[id])
        .filter(tagItem => tagItem.type === type);
    },
  );
  return getRelevantTagItems;
};

export const makeMapStateToProps = () => {
  const getRelevantTagItems = makeGetRelevantTagItems();
  const mapStateToProps = (state, props) => {
    return {
      tags: getTags(state, props),
      tagItems: getRelevantTagItems(state, props),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    refreshTags: () => refreshTags()(dispatch),
    addTagItem: tagItem => addTagItem(tagItem)(dispatch),
    deleteTagItem: tagItem => deleteTagItem(tagItem)(dispatch),
    updateTagItem: tagItem => updateTagItem(tagItem)(dispatch),
    refreshTagItems: () =>
      refreshTagItems(props.contactId, props.tagType)(dispatch),
  };
};

const SkillContainer = connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(Skill);
export default SkillContainer;
