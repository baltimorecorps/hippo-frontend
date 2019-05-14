import { experiencesReducer, tagReducer, tagItemReducer } from './profile';

import {
  ADD_EXPERIENCE,
  GET_EXPERIENCE,
  REFRESH_EXPERIENCES,
  REFRESH_EXPERIENCE_TYPE,
  ADD_TAG,
  REFRESH_TAGS,
  ADD_TAG_ITEM,
  UPDATE_TAG_ITEM,
  REFRESH_TAG_ITEMS,
} from '../actions/profile';

describe('Experience state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = experiencesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add new experience - request resolved', () => {
    const experience = { id: 1234, other_stuff: 'data' };
    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${ADD_EXPERIENCE}`,
      body: { data: experience },
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(experience);
  });

  test('Add new experience - request resolved', () => {
    const oldExperience = { id: 1234, other_stuff: 'data' };
    const experience = { id: 1234, other_stuff: 'new data' };
    initialState[1234] = oldExperience;

    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${ADD_EXPERIENCE}`,
      body: { data: experience },
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(experience);
  });

  test('Add new experience - request rejected', () => {
    const oldExperience = { id: 1234, other_stuff: 'data' };
    const experience = { id: 1234, other_stuff: 'new data' };
    const startState = initialState;
    startState[1234] = oldExperience;
    const newState = experiencesReducer(startState, {
      type: `REJECT_${ADD_EXPERIENCE}`,
      experience: experience,
    });
    expect(newState).toEqual(startState);
  });

  test('Refresh all experiences', () => {
    const experiences = [
      { id: 11, title: 'exp 1' },
      { id: 12, title: 'exp 2' },
      { id: 16, title: 'exp 6' },
      { id: 15, title: 'exp 5' },
    ];

    initialState = {
      10: { id: 10, title: 'exp 0' },
    };
    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${REFRESH_EXPERIENCES}`,
      body: { status: 'success', data: experiences },
    });
    expect(newState).toEqual({
      11: { id: 11, title: 'exp 1' },
      12: { id: 12, title: 'exp 2' },
      16: { id: 16, title: 'exp 6' },
      15: { id: 15, title: 'exp 5' },
    });
  });

  test('Refresh experiences by type', () => {
    const experiences = [
      { id: 11, title: 'exp 1', type: 'Test' },
      { id: 15, title: 'exp 5', type: 'Test' },
    ];

    initialState = {
      10: { id: 10, title: 'exp 0', type: 'Stay' },
      12: { id: 12, title: 'exp 2', type: 'Test' },
    };
    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${REFRESH_EXPERIENCE_TYPE}`,
      body: { status: 'success', data: experiences },
      filter: 'test',
    });
    expect(newState).toEqual({
      10: { id: 10, title: 'exp 0', type: 'Stay' },
      11: { id: 11, title: 'exp 1', type: 'Test' },
      15: { id: 15, title: 'exp 5', type: 'Test' },
    });
  });

  test('Refresh one experience', () => {
    const experience = { id: 11, data: 'exp data' };

    const oldExperience = { id: 11, data: 'old exp data' };
    const bystander = { id: 12, data: 'bystander' };
    initialState = {
      11: oldExperience,
      12: bystander,
    };
    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${GET_EXPERIENCE}`,
      body: { status: 'success', data: experience },
    });
    expect(newState).toEqual({
      11: experience,
      12: bystander,
    });
  });
});

describe('Tag state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = tagReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add new tag - request resolved', () => {
    const tag = { id: 4321, other_stuff: 'data' };
    const newState = tagReducer(initialState, {
      type: `RESOLVE_${ADD_TAG}`,
      body: { data: tag },
    });
    expect(newState).toHaveProperty('4321');
    expect(newState[4321]).toEqual(tag);
  });

  test('Refresh all tags', () => {
    const tags = [{ id: 11, title: 'tag 1' }, { id: 15, title: 'tag 5' }];

    initialState = {
      10: { id: 10, title: 'tag 0' },
    };
    const newState = tagReducer(initialState, {
      type: `RESOLVE_${REFRESH_TAGS}`,
      body: { status: 'success', data: tags },
    });
    expect(newState).toEqual({
      11: { id: 11, title: 'tag 1' },
      15: { id: 15, title: 'tag 5' },
    });
  });
});

describe('TagItem state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = tagItemReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add new tagItem blank contact', () => {
    const tagItem = { contact_id: 4321, tag_id: 1234, other_stuff: 'data' };
    const newState = tagItemReducer(initialState, {
      type: `RESOLVE_${ADD_TAG_ITEM}`,
      body: { data: tagItem },
    });
    expect(newState).toHaveProperty('4321');
    expect(newState[4321]).toEqual({ 1234: tagItem });
  });
  test('Add new tagItem existing contact', () => {
    const tagItem = { contact_id: 4321, tag_id: 1234, other_stuff: 'data' };
    initialState[4321] = [{ contact_id: 4321, tag_id: 1111 }];
    const newState = tagItemReducer(initialState, {
      type: `RESOLVE_${ADD_TAG_ITEM}`,
      body: { data: tagItem },
    });
    expect(newState).toHaveProperty('4321');
    expect(newState[4321]).toHaveProperty('1234');
    expect(newState[4321][1234]).toEqual(tagItem);
  });

  test('Refresh tagItem by type', () => {
    const tagItems = [
      { contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test' },
      { contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test' },
    ];

    initialState = {
      1: {
        10: { contact_id: 1, tag_id: 10, title: 'exp 0', type: 'Stay' },
        12: { contact_id: 1, tag_id: 12, title: 'exp 2', type: 'Test' },
      },
      2: {
        12: { contact_id: 2, tag_id: 12, title: 'exp 2', type: 'Test' },
      },
    };
    const newState = tagItemReducer(initialState, {
      type: `RESOLVE_${REFRESH_TAG_ITEMS}`,
      body: { status: 'success', data: tagItems },
      contactId: 1,
      filter: 'test',
    });
    expect(newState).toEqual({
      1: {
        10: { contact_id: 1, tag_id: 10, title: 'exp 0', type: 'Stay' },
        11: { contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test' },
        15: { contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test' },
      },
      2: {
        12: { contact_id: 2, tag_id: 12, title: 'exp 2', type: 'Test' },
      },
    });
  });

  test('Refresh tagItem by type empty state', () => {
    const tagItems = [
      { contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test' },
      { contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test' },
    ];

    const newState = tagItemReducer(initialState, {
      type: `RESOLVE_${REFRESH_TAG_ITEMS}`,
      body: { status: 'success', data: tagItems },
      contactId: 1,
      filter: 'test',
    });
    expect(newState).toEqual({
      1: {
        11: { contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test' },
        15: { contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test' },
      },
    });
  });

  test('Update one tagItem', () => {
    const tagItem = { contact_id: 1, tag_id: 11, data: 'exp data' };

    const oldTagItem = { contact_id: 1, tag_id: 11, data: 'old exp data' };
    const bystander1 = { contact_id: 1, tag_id: 12, data: 'bystander 1' };
    const bystander2 = { contact_id: 2, tag_id: 11, data: 'bystander 2' };
    initialState = {
      1: {
        11: oldTagItem,
        12: bystander1,
      },
      2: {
        11: bystander2,
      },
    };
    const newState = tagItemReducer(initialState, {
      type: `RESOLVE_${UPDATE_TAG_ITEM}`,
      body: { status: 'success', data: tagItem },
    });
    expect(newState).toEqual({
      1: {
        11: tagItem,
        12: bystander1,
      },
      2: {
        11: bystander2,
      },
    });
  });
});
