import fetchMock from 'fetch-mock';
import {
  experiencesReducer,
  tagReducer,
  tagItemReducer,
  GET_EXPERIENCE,
  GET_EXPERIENCE_API,
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_API,
  UPDATE_EXPERIENCE,
  UPDATE_EXPERIENCE_API,
  DELETE_EXPERIENCE,
  DELETE_EXPERIENCE_API,
  REFRESH_EXPERIENCES,
  REFRESH_EXPERIENCES_API,
  REFRESH_EXPERIENCE_TYPE,
  REFRESH_EXPERIENCE_TYPE_API,
  addExperience,
  updateExperience,
  deleteExperience,
  refreshExperienceType,
  ADD_TAG,
  ADD_TAG_API,
  REFRESH_TAGS,
  REFRESH_TAGS_API,
  ADD_TAG_ITEM,
  ADD_TAG_ITEM_API,
  UPDATE_TAG_ITEM,
  UPDATE_TAG_ITEM_API,
  DELETE_TAG_ITEM,
  DELETE_TAG_ITEM_API,
  REFRESH_TAG_ITEMS,
  REFRESH_TAG_ITEMS_API,
  refreshTags,
  addTagItem,
  updateTagItem,
  deleteTagItem,
  refreshTagItems,
} from './profile';

import {GET_CONTACT_CAPABILITIES_API} from './contacts';

afterEach(() => {
  fetchMock.restore();
});

describe('Experiences', () => {
  test('Create new experience action - success', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const experience = {data: 'test', contact_id: contactId};
    const response = {response: 'win'};

    fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, response);

    await addExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(ADD_EXPERIENCE);
    expect(dispatch.mock.calls[0][0].experience).toEqual(experience);
    expect(dispatch.mock.calls[1][0].type).toBe(ADD_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(ADD_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('Create new experience action - failure', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const experience = {data: 'test', contact_id: contactId};

    fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, {
      status: 500,
      body: '',
    });

    await addExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[2][0].type).toBe(ADD_EXPERIENCE_API.REJECT);
    expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
  });

  test('Update experience action', async function() {
    const dispatch = jest.fn();
    const experience = {id: 4321, contact_id: 123, new_data: 'update'};

    fetchMock.put(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success'},
    });
    fetchMock.get(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success', data: experience},
    });
    fetchMock.get(`path:/api/contacts/${experience.contact_id}/capabilities/`, {
      body: {status: 'success'},
    });

    await updateExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(7);
    expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_EXPERIENCE);
    expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[3][0].type).toBe(GET_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[4][0].type).toBe(
      GET_CONTACT_CAPABILITIES_API.REQUEST
    );
    expect(dispatch.mock.calls[5][0].type).toBe(GET_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[6][0].type).toBe(
      GET_CONTACT_CAPABILITIES_API.RESOLVE
    );

    expect(dispatch.mock.calls[0][0].experience).toBe(experience);
  });

  test('Refresh experiences by type action', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const expType = 'test';

    fetchMock.get(
      `path:/api/contacts/${contactId}/experiences/`,
      {body: {status: 'success', data: []}},
      {query: {type: expType}}
    );

    await refreshExperienceType(contactId, expType)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.REQUEST
    );
    expect(dispatch.mock.calls[1][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.RESOLVE
    );
    expect(dispatch.mock.calls[1][0].filter).toBe(expType);
    expect(
      fetchMock.called(`path:/api/contacts/${contactId}/experiences/`, {
        query: {type: expType},
      })
    ).toBe(true);
  });

  test('Delete experience action', async function() {
    const dispatch = jest.fn();
    const experience = {
      id: 4321,
      new_data: 'update',
      contact_id: 1234,
      type: 'Test',
    };

    fetchMock.delete(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success'},
    });
    fetchMock.get(
      `path:/api/contacts/${experience.contact_id}/experiences/`,
      {body: {status: 'success', data: []}},
      {query: {type: 'test'}}
    );

    await deleteExperience(experience)(dispatch);
    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_EXPERIENCE);
    expect(dispatch.mock.calls[1][0].type).toBe(DELETE_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(DELETE_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[3][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.REQUEST
    );
    expect(dispatch.mock.calls[4][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.RESOLVE
    );
  });
});

describe('Tags and Tag Items', () => {
  test('Refresh tags', async function() {
    const dispatch = jest.fn();
    const tagId = 9876;
    const tag = {data: 'test', id: tagId};
    const response = {data: [tag]};

    fetchMock.get(`path:/api/tags/`, {body: response});

    await refreshTags(tag)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toBe(REFRESH_TAGS_API.REQUEST);
    expect(dispatch.mock.calls[1][0].type).toBe(REFRESH_TAGS_API.RESOLVE);
    expect(dispatch.mock.calls[1][0].body).toEqual(response);
  });

  test('Add new tag item with tag id', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const tagId = 9876;
    const tag = {data: 'test', contact_id: contactId, tag_id: tagId};
    const response = {data: tag};

    fetchMock.post(`path:/api/contacts/${contactId}/tags/`, {body: response});

    await addTagItem(tag)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(ADD_TAG_ITEM);
    expect(dispatch.mock.calls[0][0].tag).toEqual(tag);
    expect(dispatch.mock.calls[1][0].type).toBe(ADD_TAG_ITEM_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(ADD_TAG_ITEM_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('Add new tag item without tag id', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const tagId = 9876;
    const tag = {
      name: 'test',
      type: 'Function',
      id: tagId,
    };
    const tagItem = {
      name: 'test',
      type: 'Function',
      contact_id: contactId,
      score: 2,
    };
    const tagResponse = {data: tag};
    const tagItemResponse = {
      data: {
        ...tagItem,
        tag_id: tagId,
      },
    };

    fetchMock.post(`path:/api/tags/`, {body: tagResponse});

    fetchMock.post(`path:/api/contacts/${contactId}/tags/`, {
      body: tagItemResponse,
    });

    await addTagItem(tagItem)(dispatch);

    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(ADD_TAG_ITEM);
    expect(dispatch.mock.calls[0][0].tag).toEqual(tagItem);
    expect(dispatch.mock.calls[1][0].type).toBe(ADD_TAG_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(ADD_TAG_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(tagResponse);
    expect(dispatch.mock.calls[3][0].type).toBe(ADD_TAG_ITEM_API.REQUEST);
    expect(dispatch.mock.calls[4][0].type).toBe(ADD_TAG_ITEM_API.RESOLVE);
    expect(dispatch.mock.calls[4][0].body).toEqual(tagItemResponse);

    const request = fetchMock.lastCall(`path:/api/contacts/${contactId}/tags/`);
    const requestTag = JSON.parse(request[1].body);
    expect(requestTag).toHaveProperty('tag_id');
    expect(requestTag.tag_id).toBe(tagId);
  });

  test('Update tag item ', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const tagId = 9876;
    const tagItem = {
      name: 'test',
      type: 'Function',
      contact_id: contactId,
      tag_id: tagId,
      score: 2,
    };

    const response = {data: tagItem};

    fetchMock.put(`path:/api/contacts/${contactId}/tags/${tagId}/`, {
      body: response,
    });

    await updateTagItem(tagItem)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_TAG_ITEM);
    expect(dispatch.mock.calls[0][0].tag).toEqual(tagItem);
    expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_TAG_ITEM_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_TAG_ITEM_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('Delete tag item ', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const tagId = 9876;
    const tagItem = {
      name: 'test',
      type: 'Function',
      contact_id: contactId,
      tag_id: tagId,
      score: 2,
    };

    const response = {stuff: 'win'};

    fetchMock.delete(`path:/api/contacts/${contactId}/tags/${tagId}/`, {
      body: response,
    });

    fetchMock.get(
      `path:/api/contacts/${contactId}/tags/`,
      {body: response},
      {
        query: {type: 'function'},
      }
    );

    await deleteTagItem(tagItem)(dispatch);

    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_TAG_ITEM);
    expect(dispatch.mock.calls[0][0].tag).toEqual(tagItem);
    expect(dispatch.mock.calls[1][0].type).toBe(DELETE_TAG_ITEM_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(DELETE_TAG_ITEM_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
    expect(dispatch.mock.calls[3][0].type).toBe(REFRESH_TAG_ITEMS_API.REQUEST);
    expect(dispatch.mock.calls[4][0].type).toBe(REFRESH_TAG_ITEMS_API.RESOLVE);
    fetchMock.called(`path:/api/contacts/${contactId}/tags/`, {
      query: {type: 'function'},
    });
  });

  test('Refresh tag items', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const tagType = 'Test';
    const response = {body: {stuff: 'win'}};

    fetchMock.get(`path:/api/contacts/${contactId}/tags/`, response, {
      query: {type: 'test'},
    });

    await refreshTagItems(contactId, tagType)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toBe(REFRESH_TAG_ITEMS_API.REQUEST);
    expect(dispatch.mock.calls[1][0].type).toBe(REFRESH_TAG_ITEMS_API.RESOLVE);
    expect(dispatch.mock.calls[1][0].filter).toBe('test');
    expect(dispatch.mock.calls[1][0].contactId).toBe(1234);
    fetchMock.called(`path:/api/contacts/${contactId}/tags/`, {
      query: {type: 'test'},
    });
  });
});

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
    const experience = {id: 1234, other_stuff: 'data'};
    const newState = experiencesReducer(initialState, {
      type: ADD_EXPERIENCE_API.RESOLVE,
      body: {data: experience},
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(experience);
  });

  test('Add new experience - request resolved', () => {
    const oldExperience = {id: 1234, other_stuff: 'data'};
    const experience = {id: 1234, other_stuff: 'new data'};
    initialState[1234] = oldExperience;

    const newState = experiencesReducer(initialState, {
      type: ADD_EXPERIENCE_API.RESOLVE,
      body: {data: experience},
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(experience);
  });

  test('Add new experience - request rejected', () => {
    const oldExperience = {id: 1234, other_stuff: 'data'};
    const experience = {id: 1234, other_stuff: 'new data'};
    const startState = initialState;
    startState[1234] = oldExperience;
    const newState = experiencesReducer(startState, {
      type: ADD_EXPERIENCE_API.REJECT,
      experience: experience,
    });
    expect(newState).toEqual(startState);
  });

  test('Refresh all experiences', () => {
    const experiences = [
      {id: 11, title: 'exp 1'},
      {id: 12, title: 'exp 2'},
      {id: 16, title: 'exp 6'},
      {id: 15, title: 'exp 5'},
    ];

    initialState = {
      10: {id: 10, title: 'exp 0'},
    };
    const newState = experiencesReducer(initialState, {
      type: REFRESH_EXPERIENCES_API.RESOLVE,
      body: {status: 'success', data: experiences},
    });
    expect(newState).toEqual({
      11: {id: 11, title: 'exp 1'},
      12: {id: 12, title: 'exp 2'},
      16: {id: 16, title: 'exp 6'},
      15: {id: 15, title: 'exp 5'},
    });
  });

  test('Refresh experiences by type', () => {
    const experiences = [
      {id: 11, title: 'exp 1', type: 'Test'},
      {id: 15, title: 'exp 5', type: 'Test'},
    ];

    initialState = {
      10: {id: 10, title: 'exp 0', type: 'Stay'},
      12: {id: 12, title: 'exp 2', type: 'Test'},
    };
    const newState = experiencesReducer(initialState, {
      type: REFRESH_EXPERIENCE_TYPE_API.RESOLVE,
      body: {status: 'success', data: experiences},
      filter: 'test',
    });
    expect(newState).toEqual({
      10: {id: 10, title: 'exp 0', type: 'Stay'},
      11: {id: 11, title: 'exp 1', type: 'Test'},
      15: {id: 15, title: 'exp 5', type: 'Test'},
    });
  });

  test('Refresh one experience', () => {
    const experience = {id: 11, data: 'exp data'};

    const oldExperience = {id: 11, data: 'old exp data'};
    const bystander = {id: 12, data: 'bystander'};
    initialState = {
      11: oldExperience,
      12: bystander,
    };
    const newState = experiencesReducer(initialState, {
      type: GET_EXPERIENCE_API.RESOLVE,
      body: {status: 'success', data: experience},
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
    const tag = {id: 4321, other_stuff: 'data'};
    const newState = tagReducer(initialState, {
      type: ADD_TAG_API.RESOLVE,
      body: {data: tag},
    });
    expect(newState).toHaveProperty('4321');
    expect(newState[4321]).toEqual(tag);
  });

  test('Refresh all tags', () => {
    const tags = [
      {id: 11, title: 'tag 1'},
      {id: 15, title: 'tag 5'},
    ];

    initialState = {
      10: {id: 10, title: 'tag 0'},
    };
    const newState = tagReducer(initialState, {
      type: REFRESH_TAGS_API.RESOLVE,
      body: {status: 'success', data: tags},
    });
    expect(newState).toEqual({
      11: {id: 11, title: 'tag 1'},
      15: {id: 15, title: 'tag 5'},
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
    const tagItem = {contact_id: 4321, tag_id: 1234, other_stuff: 'data'};
    const newState = tagItemReducer(initialState, {
      type: ADD_TAG_ITEM_API.RESOLVE,
      body: {data: tagItem},
    });
    expect(newState).toHaveProperty('4321');
    expect(newState[4321]).toEqual({1234: tagItem});
  });
  test('Add new tagItem existing contact', () => {
    const tagItem = {contact_id: 4321, tag_id: 1234, other_stuff: 'data'};
    initialState[4321] = [{contact_id: 4321, tag_id: 1111}];
    const newState = tagItemReducer(initialState, {
      type: ADD_TAG_ITEM_API.RESOLVE,
      body: {data: tagItem},
    });
    expect(newState).toHaveProperty('4321');
    expect(newState[4321]).toHaveProperty('1234');
    expect(newState[4321][1234]).toEqual(tagItem);
  });

  test('Refresh tagItem by type', () => {
    const tagItems = [
      {contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test'},
      {contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test'},
    ];

    initialState = {
      1: {
        10: {contact_id: 1, tag_id: 10, title: 'exp 0', type: 'Stay'},
        12: {contact_id: 1, tag_id: 12, title: 'exp 2', type: 'Test'},
      },
      2: {
        12: {contact_id: 2, tag_id: 12, title: 'exp 2', type: 'Test'},
      },
    };
    const newState = tagItemReducer(initialState, {
      type: REFRESH_TAG_ITEMS_API.RESOLVE,
      body: {status: 'success', data: tagItems},
      contactId: 1,
      filter: 'test',
    });
    expect(newState).toEqual({
      1: {
        10: {contact_id: 1, tag_id: 10, title: 'exp 0', type: 'Stay'},
        11: {contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test'},
        15: {contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test'},
      },
      2: {
        12: {contact_id: 2, tag_id: 12, title: 'exp 2', type: 'Test'},
      },
    });
  });

  test('Refresh tagItem by type empty state', () => {
    const tagItems = [
      {contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test'},
      {contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test'},
    ];

    const newState = tagItemReducer(initialState, {
      type: REFRESH_TAG_ITEMS_API.RESOLVE,
      body: {status: 'success', data: tagItems},
      contactId: 1,
      filter: 'test',
    });
    expect(newState).toEqual({
      1: {
        11: {contact_id: 1, tag_id: 11, title: 'exp 1', type: 'Test'},
        15: {contact_id: 1, tag_id: 15, title: 'exp 5', type: 'Test'},
      },
    });
  });

  test('Update one tagItem', () => {
    const tagItem = {contact_id: 1, tag_id: 11, data: 'exp data'};

    const oldTagItem = {contact_id: 1, tag_id: 11, data: 'old exp data'};
    const bystander1 = {contact_id: 1, tag_id: 12, data: 'bystander 1'};
    const bystander2 = {contact_id: 2, tag_id: 11, data: 'bystander 2'};
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
      type: UPDATE_TAG_ITEM_API.RESOLVE,
      body: {status: 'success', data: tagItem},
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
