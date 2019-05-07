import fetchMock from 'fetch-mock';
import {
  GET_EXPERIENCE,
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  REFRESH_EXPERIENCE_TYPE,
  addExperience,
  updateExperience,
  deleteExperience,
  refreshExperienceType,
  ADD_TAG,
  REFRESH_TAGS,
  ADD_TAG_ITEM,
  UPDATE_TAG_ITEM,
  DELETE_TAG_ITEM,
  REFRESH_TAG_ITEMS,
  refreshTags,
  addTagItem,
  updateTagItem,
  deleteTagItem,
  refreshTagItems,
} from './profile';

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
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${ADD_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${ADD_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('Create new experience action - failure', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const experience = {data: 'test', contact_id: contactId};

    fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, 500);

    await addExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[2][0].type).toBe(`REJECT_${ADD_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
  });

  test('Update experience action', async function() {
    const dispatch = jest.fn();
    const experience = {id: 4321, new_data: 'update'};

    fetchMock.put(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success'},
    });
    fetchMock.get(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success', data: experience},
    });

    await updateExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_EXPERIENCE);
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${UPDATE_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${UPDATE_EXPERIENCE}`);
    expect(dispatch.mock.calls[3][0].type).toBe(`REQUEST_${GET_EXPERIENCE}`);
    expect(dispatch.mock.calls[4][0].type).toBe(`RESOLVE_${GET_EXPERIENCE}`);
    expect(dispatch.mock.calls[0][0].experience).toBe(experience);
  });

  test('Refresh experiences by type action', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const expType = 'test';

    fetchMock.get(
      `path:/api/contacts/${contactId}/experiences/`,
      {body: {status: 'success', data: []}},
      {query: {type: expType}},
    );

    await refreshExperienceType(contactId, expType)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toBe(
      `REQUEST_${REFRESH_EXPERIENCE_TYPE}`,
    );
    expect(dispatch.mock.calls[1][0].type).toBe(
      `RESOLVE_${REFRESH_EXPERIENCE_TYPE}`,
    );
    expect(dispatch.mock.calls[1][0].filter).toBe(expType);
    expect(
      fetchMock.called(`path:/api/contacts/${contactId}/experiences/`, {
        query: {type: expType},
      }),
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
      {query: {type: 'test'}},
    );

    await deleteExperience(experience)(dispatch);
    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_EXPERIENCE);
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${DELETE_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${DELETE_EXPERIENCE}`);
    expect(dispatch.mock.calls[3][0].type).toBe(
      `REQUEST_${REFRESH_EXPERIENCE_TYPE}`,
    );
    expect(dispatch.mock.calls[4][0].type).toBe(
      `RESOLVE_${REFRESH_EXPERIENCE_TYPE}`,
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
    expect(dispatch.mock.calls[0][0].type).toBe(`REQUEST_${REFRESH_TAGS}`);
    expect(dispatch.mock.calls[1][0].type).toBe(`RESOLVE_${REFRESH_TAGS}`);
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
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${ADD_TAG_ITEM}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${ADD_TAG_ITEM}`);
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
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${ADD_TAG}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${ADD_TAG}`);
    expect(dispatch.mock.calls[2][0].body).toEqual(tagResponse);
    expect(dispatch.mock.calls[3][0].type).toBe(`REQUEST_${ADD_TAG_ITEM}`);
    expect(dispatch.mock.calls[4][0].type).toBe(`RESOLVE_${ADD_TAG_ITEM}`);
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
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${UPDATE_TAG_ITEM}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${UPDATE_TAG_ITEM}`);
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
      },
    );

    await deleteTagItem(tagItem)(dispatch);

    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_TAG_ITEM);
    expect(dispatch.mock.calls[0][0].tag).toEqual(tagItem);
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${DELETE_TAG_ITEM}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${DELETE_TAG_ITEM}`);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
    expect(dispatch.mock.calls[3][0].type).toBe(`REQUEST_${REFRESH_TAG_ITEMS}`);
    expect(dispatch.mock.calls[4][0].type).toBe(`RESOLVE_${REFRESH_TAG_ITEMS}`);
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
    expect(dispatch.mock.calls[0][0].type).toBe(`REQUEST_${REFRESH_TAG_ITEMS}`);
    expect(dispatch.mock.calls[1][0].type).toBe(`RESOLVE_${REFRESH_TAG_ITEMS}`);
    expect(dispatch.mock.calls[1][0].filter).toBe('test');
    expect(dispatch.mock.calls[1][0].contactId).toBe(1234);
    fetchMock.called(`path:/api/contacts/${contactId}/tags/`, {
      query: {type: 'test'},
    });
  });
});
