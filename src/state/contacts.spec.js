import fetchMock from 'fetch-mock';
import {
  ALL_CONTACTS,
  ALL_CONTACTS_API,
  GET_CONTACT_API,
  GET_MY_CONTACT,
  GET_MY_CONTACT_API,
  getMyContact,
  ADD_CONTACT,
  ADD_CONTACT_API,
  addContact,
  UPDATE_CONTACT,
  UPDATE_CONTACT_API,
  GET_SESSION_API,
  getSession,
  CREATE_SESSION_API,
  createSession,
  DELETE_SESSION_API,
  deleteSession,
  GET_CONTACT_CAPABILITIES_API,
  updateContactSkills,
  UPDATE_CONTACT_SKILL,
  ADD_CONTACT_SKILL,
  ADD_CONTACT_SKILL_API,
  addContactSkill,
  DELETE_CONTACT_SKILL,
  DELETE_CONTACT_SKILL_API,
  deleteContactSkill,
  ADD_SKILL_SUGGESTION,
  ADD_SKILL_SUGGESTION_API,
  addSkillSuggestion,
  DELETE_SKILL_SUGGESTION_API,
  deleteSkillSuggestion,
  contactsReducer,
  accountsReducer,
} from './contacts';

import {CREATE_RESUME_API} from './resume';

afterEach(() => {
  fetchMock.restore();
});

test('Create new contact action - success', async function() {
  const dispatch = jest.fn();
  const contact = {data: 'test'};
  const response = {result: 'win'};
  const token = 'testAuthToken';
  const path = `path:/api/contacts/`;

  fetchMock.post(path, response, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const res = await addContact(async () => token, contact)(dispatch);

  expect(fetchMock.lastCall(path)[1].body).toBe(JSON.stringify(contact));

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(ADD_CONTACT);
  expect(dispatch.mock.calls[0][0].contact).toEqual(contact);
  expect(dispatch.mock.calls[1][0].type).toBe(ADD_CONTACT_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
});

test('Create new contact action - failure', async function() {
  const dispatch = jest.fn();
  const contactId = 1234;
  const contact = {data: 'test'};
  const token = async () => 'testAuthToken';

  fetchMock.post(`path:/api/contacts/`, {
    status: 500,
    body: '',
  });

  await addContact(async () => token, contact)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_API.REJECT);
  expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
});

test('Get my contact', async function() {
  const dispatch = jest.fn();
  const token = async () => 'testAuthToken';
  const response = {contact: 'me'};

  fetchMock.get(
    `path:/api/contacts/me/`,
    {
      status: 200,
      body: response,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  await getMyContact(async () => token)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(GET_MY_CONTACT);
  expect(dispatch.mock.calls[1][0].type).toBe(GET_MY_CONTACT_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(GET_MY_CONTACT_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
});

test('Update contact skills', async function() {
  const dispatch = jest.fn();
  const contactId = 123;
  const skills = [{id: 'abc123==', name: 'Test skill'}];
  const response = {contact: 'me'};

  fetchMock.put(`path:/api/contacts/${contactId}/`, {
    status: 200,
    body: response,
  });

  fetchMock.get(`path:/api/contacts/${contactId}/capabilities/`, {
    status: 200,
    body: response,
  });

  await updateContactSkills(contactId, skills)(dispatch);

  expect(dispatch.mock.calls.length).toBe(5);
  expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_CONTACT);
  expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_CONTACT_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_CONTACT_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
  expect(dispatch.mock.calls[3][0].type).toBe(
    GET_CONTACT_CAPABILITIES_API.REQUEST
  );
  expect(dispatch.mock.calls[4][0].type).toBe(
    GET_CONTACT_CAPABILITIES_API.RESOLVE
  );
  expect(dispatch.mock.calls[4][0].body).toEqual(response);
});

test('Create Session', async function() {
  const dispatch = jest.fn();
  const token = async () => 'testAuthToken';
  const response = {contact: 'me'};

  fetchMock.post(
    `path:/api/session/`,
    {
      status: 201,
      body: response,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  await createSession(async () => token)(dispatch);

  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[0][0].type).toBe(CREATE_SESSION_API.REQUEST);
  expect(dispatch.mock.calls[1][0].type).toBe(CREATE_SESSION_API.RESOLVE);
  expect(dispatch.mock.calls[1][0].body).toEqual(response);
});

test('Add contact skill', async function() {
  const dispatch = jest.fn();
  const contactId = 123;
  const skill = {id: 'abc123==', name: 'Test Skill'};
  const response = {data: {info: 'stuff'}};

  fetchMock.post(`path:/api/contacts/${contactId}/skills/`, {
    status: 201,
    body: response,
  });

  await addContactSkill(contactId, skill)(dispatch);

  expect(dispatch.mock.calls.length).toBe(4);
  expect(dispatch.mock.calls[0][0].type).toBe(ADD_CONTACT_SKILL);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    contact_id: contactId,
    name: skill.name,
    id: skill.id,
  });
  expect(dispatch.mock.calls[1][0].type).toBe(ADD_CONTACT_SKILL_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_SKILL_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
  expect(dispatch.mock.calls[3][0].type).toBe(UPDATE_CONTACT_SKILL);
  expect(dispatch.mock.calls[3][0].contactId).toBe(contactId);
  expect(dispatch.mock.calls[3][0].result).toEqual({info: 'stuff'});
});

test('Add contact skill - failure', async function() {
  const dispatch = jest.fn();
  const contactId = 123;
  const skill = {id: 'abc123==', name: 'Test Skill'};
  const response = {data: {info: 'stuff'}};

  fetchMock.post(`path:/api/contacts/${contactId}/skills/`, {
    status: 401,
    body: response,
  });

  await addContactSkill(contactId, skill)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(ADD_CONTACT_SKILL);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    contact_id: contactId,
    name: skill.name,
    id: skill.id,
  });
  expect(dispatch.mock.calls[1][0].type).toBe(ADD_CONTACT_SKILL_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_SKILL_API.REJECT);
});

test('Delete contact skill', async function() {
  const dispatch = jest.fn();
  const contactId = 123;
  const skill = {id: 'abc123==', name: 'Test Skill'};
  const response = {message: 'success'};

  fetchMock.delete(`path:/api/contacts/${contactId}/skills/${skill.id}/`, {
    status: 200,
    body: response,
  });

  await deleteContactSkill(contactId, skill)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(DELETE_CONTACT_SKILL_API.REQUEST);
  expect(dispatch.mock.calls[1][0].type).toBe(DELETE_CONTACT_SKILL_API.RESOLVE);
  expect(dispatch.mock.calls[1][0].body).toEqual(response);
  expect(dispatch.mock.calls[2][0].type).toBe(DELETE_CONTACT_SKILL);
  expect(dispatch.mock.calls[2][0].payload).toEqual({
    contactId: contactId,
    skillId: skill.id,
  });
});

test('Add skill suggestion', async function() {
  const dispatch = jest.fn();
  const contactId = 123;
  const capabilityId = 'cap1';
  const skill = {id: 'abc123==', name: 'Test Skill'};
  const response = {data: {info: 'stuff'}};

  fetchMock.post(
    `path:/api/contacts/${contactId}/capabilities/${capabilityId}/suggestion/`,
    {
      status: 201,
      body: response,
    }
  );

  await addSkillSuggestion(contactId, capabilityId, skill)(dispatch);

  expect(dispatch.mock.calls.length).toBe(4);
  expect(dispatch.mock.calls[0][0].type).toBe(ADD_SKILL_SUGGESTION);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    contact_id: contactId,
    capability_id: capabilityId,
    name: skill.name,
  });
  expect(dispatch.mock.calls[1][0].type).toBe(ADD_SKILL_SUGGESTION_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_SKILL_SUGGESTION_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
  expect(dispatch.mock.calls[3][0].type).toBe(UPDATE_CONTACT_SKILL);
  expect(dispatch.mock.calls[3][0].contactId).toBe(contactId);
  expect(dispatch.mock.calls[3][0].result).toEqual({info: 'stuff'});
});

test('Add skill suggestion - failure', async function() {
  const dispatch = jest.fn();
  const contactId = 123;
  const capabilityId = 'cap1';
  const skill = {id: 'abc123==', name: 'Test Skill'};
  const response = {data: {info: 'stuff'}};

  fetchMock.post(
    `path:/api/contacts/${contactId}/capabilities/${capabilityId}/suggestion/`,
    {
      status: 401,
      body: response,
    }
  );

  await addSkillSuggestion(contactId, capabilityId, skill)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(ADD_SKILL_SUGGESTION);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    contact_id: contactId,
    capability_id: capabilityId,
    name: skill.name,
  });
  expect(dispatch.mock.calls[1][0].type).toBe(ADD_SKILL_SUGGESTION_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_SKILL_SUGGESTION_API.REJECT);
});

test('Delete skill suggestion', async function() {
  const dispatch = jest.fn();
  const contactId = 123;
  const capabilityId = 'cap1';
  const skill = {id: 'abc123==', name: 'Test Skill'};
  const response = {data: {info: 'stuff'}};

  fetchMock.delete(
    `path:/api/contacts/${contactId}/capabilities/${capabilityId}/suggestion/${skill.id}/`,
    {
      status: 200,
      body: response,
    }
  );

  await deleteSkillSuggestion(contactId, capabilityId, skill)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(
    DELETE_SKILL_SUGGESTION_API.REQUEST
  );
  expect(dispatch.mock.calls[1][0].type).toBe(
    DELETE_SKILL_SUGGESTION_API.RESOLVE
  );
  expect(dispatch.mock.calls[1][0].body).toEqual(response);
  expect(dispatch.mock.calls[2][0].type).toBe(DELETE_CONTACT_SKILL);
  expect(dispatch.mock.calls[2][0].payload).toEqual({
    contactId,
    skillId: skill.id,
  });
});

describe('Contacts state', () => {
  const initialState = {};
  test('inital state', () => {
    const newState = contactsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  test('Fetch all contacts', () => {
    const contacts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const newState = contactsReducer(undefined, {
      type: ALL_CONTACTS_API.RESOLVE,
      body: {status: 'success', data: contacts},
    });
    expect(newState).toEqual({
      1: {id: 1},
      2: {id: 2},
      3: {id: 3},
      4: {id: 4},
    });
  });
  test('Get single contact', () => {
    const contact = {id: 123};
    const newState = contactsReducer(undefined, {
      type: GET_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      123: {id: 123},
    });
  });
  test('Add contact', () => {
    const contact = {id: 123};
    const newState = contactsReducer(undefined, {
      type: ADD_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      123: {id: 123},
    });
  });
  // test('Get session', () => {
  //   const contact = {id: 123};
  //   const newState = contactsReducer(undefined, {
  //     type: GET_SESSION_API.RESOLVE,
  //     body: {status: 'success', data: {contact}},
  //   });
  //   expect(newState).toEqual({
  //     123: {id: 123},
  //   });
  // });
  test('Create session', () => {
    const contact = {id: 123};
    const newState = contactsReducer(undefined, {
      type: CREATE_SESSION_API.RESOLVE,
      body: {status: 'success', data: {contact}},
    });
    expect(newState).toEqual({
      123: {id: 123},
    });
  });

  test('Add contact', () => {
    const contact = {id: 123};
    const newState = contactsReducer(undefined, {
      type: ADD_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      123: {id: 123},
    });
  });

  test('Update contact preserve extra fields', () => {
    const contact = {id: 123, a: 'abc'};
    const newState = contactsReducer(
      {
        123: {
          id: 123,
          a: 'test',
          b: 'foo',
        },
      },
      {
        type: UPDATE_CONTACT_API.RESOLVE,
        body: {status: 'success', data: contact},
      }
    );
    expect(newState).toEqual({
      123: {
        id: 123,
        a: 'abc',
        b: 'foo',
      },
    });
  });

  test('Get my contact', () => {
    const contact = {id: 123};
    const newState = contactsReducer(undefined, {
      type: GET_MY_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      123: {id: 123},
    });
  });

  test('Get session', () => {
    const contact = {info: 'me'};
    const newState = accountsReducer(undefined, {
      type: GET_SESSION_API.RESOLVE,
      body: {
        status: 'success',
        data: {
          contact,
        },
      },
    });
    expect(newState).toEqual({
      has_session: true,
      contact,
    });
  });
  test('Get session reject', () => {
    const newState = accountsReducer(undefined, {
      type: GET_SESSION_API.REJECT,
      body: {status: 'success', data: {}},
    });
    expect(newState).toEqual({
      has_session: false,
      contact: null,
    });
  });

  test('Replace existing contacts', () => {
    const contacts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const newState = contactsReducer(
      {
        5: {id: 5},
      },
      {
        type: ALL_CONTACTS_API.RESOLVE,
        body: {status: 'success', data: contacts},
      }
    );
    expect(newState).toEqual({
      1: {id: 1},
      2: {id: 2},
      3: {id: 3},
      4: {id: 4},
    });
  });

  test('Get contact capabilities', () => {
    const result = {
      contact_id: 5,
      capabilities: [{id: 'cap1'}, {id: 'cap2'}],
      other_skills: [{name: 'skill1', name: 'skill2'}],
    };

    const newState = contactsReducer(
      {
        2: {id: 2},
        3: {id: 3},
        5: {id: 5},
      },
      {
        type: GET_CONTACT_CAPABILITIES_API.RESOLVE,
        body: {status: 'success', data: result},
      }
    );
    expect(newState).toEqual({
      2: {id: 2},
      3: {id: 3},
      5: {
        id: 5,
        capabilities: {cap1: {id: 'cap1'}, cap2: {id: 'cap2'}},
        other_skills: [{name: 'skill1', name: 'skill2'}],
      },
    });
  });

  test('Get contact capabilities - update', () => {
    const result = {
      contact_id: 5,
      capabilities: [{id: 'cap1'}, {id: 'cap2'}],
      other_skills: [{name: 'skill1', name: 'skill2'}],
    };

    const newState = contactsReducer(
      {
        2: {id: 2},
        3: {id: 3},
        5: {
          id: 5,
          capabilities: [{id: 'cap1'}, {id: 'cap3'}],
          other_skills: [{name: 'skill4', name: 'skill5'}],
        },
      },
      {
        type: GET_CONTACT_CAPABILITIES_API.RESOLVE,
        body: {status: 'success', data: result},
      }
    );
    expect(newState).toEqual({
      2: {id: 2},
      3: {id: 3},
      5: {
        id: 5,
        capabilities: {cap1: {id: 'cap1'}, cap2: {id: 'cap2'}},
        other_skills: [{name: 'skill1', name: 'skill2'}],
      },
    });
  });

  test('Get contact capabilities - no contact', () => {
    const result = {
      contact_id: 5,
      capabilities: [{id: 'cap1'}, {id: 'cap2'}],
      other_skills: [{name: 'skill1', name: 'skill2'}],
    };

    const newState = contactsReducer(
      {
        2: {id: 2},
        3: {id: 3},
      },
      {
        type: GET_CONTACT_CAPABILITIES_API.RESOLVE,
        body: {status: 'success', data: result},
      }
    );
    expect(newState).toEqual({
      2: {id: 2},
      3: {id: 3},
      5: {
        id: 5,
        capabilities: {cap1: {id: 'cap1'}, cap2: {id: 'cap2'}},
        other_skills: [{name: 'skill1', name: 'skill2'}],
      },
    });
  });

  describe('Update contact skill', () => {
    const startState = {
      2: {id: 2},
      3: {id: 3, capabilities: undefined, other_skills: undefined},
      5: {
        id: 5,
        capabilities: {
          cap1: {
            id: 'cap1',
            skills: [{id: 'aaa111==', name: 'A'}],
            suggested_skills: [],
          },
          cap2: {
            id: 'cap2',
            skills: [{id: 'bbb222==', name: 'B'}],
            suggested_skills: [],
          },
        },
        other_skills: [{id: 'ccc333==', name: 'C'}],
      },
    };
    test('smoke', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'abc123==',
          name: 'Test skill',
          capabilities: [{id: 'cap1'}],
          suggested_capabilities: [{id: 'cap2'}],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {
          id: 'cap1',
          skills: [
            {id: 'aaa111==', name: 'A'},

            {id: 'abc123==', name: 'Test skill'},
          ],
          suggested_skills: [],
        },
        cap2: {
          id: 'cap2',
          skills: [{id: 'bbb222==', name: 'B'}],
          suggested_skills: [{id: 'abc123==', name: 'Test skill'}],
        },
      });
    });
    test('New capability', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'abc123==',
          name: 'Test skill',
          capabilities: [{id: 'cap3'}],
          suggested_capabilities: [],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {
          id: 'cap1',
          skills: [{id: 'aaa111==', name: 'A'}],
          suggested_skills: [],
        },
        cap2: {
          id: 'cap2',
          skills: [{id: 'bbb222==', name: 'B'}],
          suggested_skills: [],
        },
        cap3: {
          id: 'cap3',
          skills: [{id: 'abc123==', name: 'Test skill'}],
          suggested_skills: [],
        },
      });
    });
    test('No capability', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'abc123==',
          name: 'Test skill',
          capabilities: [],
          suggested_capabilities: [],
        },
      });
      expect(newState[5].capabilities).toEqual(startState[5].capabilities);
      expect(newState[5].other_skills).toEqual([
        {id: 'ccc333==', name: 'C'},
        {id: 'abc123==', name: 'Test skill'},
      ]);
    });
    test('Create capabilities', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 2,
        result: {
          id: 'abc123==',
          name: 'Test skill',
          capabilities: [{id: 'cap1', name: 'Capability 1'}],
          suggested_capabilities: [],
        },
      });
      expect(newState[2].capabilities).toEqual({
        cap1: {
          id: 'cap1',
          name: 'Capability 1',
          skills: [{id: 'abc123==', name: 'Test skill'}],
          suggested_skills: [],
        },
      });
    });
    test('Create other_skills', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 2,
        result: {
          id: 'abc123==',
          name: 'Test skill',
          capabilities: [],
          suggested_capabilities: [],
        },
      });
      expect(newState[2].other_skills).toEqual([
        {id: 'abc123==', name: 'Test skill'},
      ]);
    });
    test('Overwrite undefined fields', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 3,
        result: {
          id: 'abc123==',
          name: 'Test skill',
          capabilities: [],
          suggested_capabilities: [],
        },
      });
      expect(newState[3].other_skills).toEqual([
        {id: 'abc123==', name: 'Test skill'},
      ]);
    });
    test('Add to additional capability', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'aaa111==',
          name: 'A',
          capabilities: [{id: 'cap1'}],
          suggested_capabilities: [{id: 'cap2'}],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {
          id: 'cap1',
          skills: [{id: 'aaa111==', name: 'A'}],
          suggested_skills: [],
        },
        cap2: {
          id: 'cap2',
          skills: [{id: 'bbb222==', name: 'B'}],
          suggested_skills: [{id: 'aaa111==', name: 'A'}],
        },
      });
    });
    test('Remove from capability', () => {
      const startState = {
        5: {
          id: 5,
          capabilities: {
            cap1: {
              id: 'cap1',
              skills: [{id: 'aaa111==', name: 'A'}],
              suggested_skills: [],
            },
            cap2: {
              id: 'cap2',
              skills: [{id: 'bbb222==', name: 'B'}],
              suggested_skills: [{id: 'ddd444==', name: 'D'}],
            },
          },
          other_skills: [{id: 'ccc333==', name: 'C'}],
        },
      };
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'ddd444==',
          name: 'D',
          capabilities: [],
          suggested_capabilities: [{id: 'cap1'}],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {
          id: 'cap1',
          skills: [{id: 'aaa111==', name: 'A'}],
          suggested_skills: [{id: 'ddd444==', name: 'D'}],
        },
        cap2: {
          id: 'cap2',
          skills: [{id: 'bbb222==', name: 'B'}],
          suggested_skills: [],
        },
      });
    });
    test('Remove from capability - suggested', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'aaa111==',
          name: 'A',
          capabilities: [{id: 'cap2'}],
          suggested_capabilities: [],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {id: 'cap1', skills: [], suggested_skills: []},
        cap2: {
          id: 'cap2',
          skills: [
            {id: 'bbb222==', name: 'B'},
            {id: 'aaa111==', name: 'A'},
          ],
          suggested_skills: [],
        },
      });
    });
    test('Remove all capabilities', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'aaa111==',
          name: 'A',
          capabilities: [],
          suggested_capabilities: [],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {id: 'cap1', skills: [], suggested_skills: []},
        cap2: {
          id: 'cap2',
          skills: [{id: 'bbb222==', name: 'B'}],
          suggested_skills: [],
        },
      });
      expect(newState[5].other_skills).toEqual([
        {id: 'ccc333==', name: 'C'},
        {id: 'aaa111==', name: 'A'},
      ]);
    });
    test('Remove from other_skills', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'ccc333==',
          name: 'C',
          capabilities: [{id: 'cap2'}],
          suggested_capabilities: [],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {
          id: 'cap1',
          skills: [{id: 'aaa111==', name: 'A'}],
          suggested_skills: [],
        },
        cap2: {
          id: 'cap2',
          skills: [
            {id: 'bbb222==', name: 'B'},
            {id: 'ccc333==', name: 'C'},
          ],
          suggested_skills: [],
        },
      });
      expect(newState[5].other_skills).toEqual([]);
    });
    test('duplicate capabilities', () => {
      const newState = contactsReducer(startState, {
        type: UPDATE_CONTACT_SKILL,
        contactId: 5,
        result: {
          id: 'abc123==',
          name: 'Test skill',
          capabilities: [{id: 'cap1'}],
          suggested_capabilities: [{id: 'cap1'}],
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {
          id: 'cap1',
          skills: [
            {id: 'aaa111==', name: 'A'},
            {id: 'abc123==', name: 'Test skill'},
          ],
          suggested_skills: [],
        },
        cap2: {
          id: 'cap2',
          skills: [{id: 'bbb222==', name: 'B'}],
          suggested_skills: [],
        },
      });
    });
    test('remove skill', () => {
      const newState = contactsReducer(startState, {
        type: DELETE_CONTACT_SKILL,
        payload: {
          contactId: 5,
          skillId: 'aaa111==',
        },
      });
      expect(newState[5].capabilities).toEqual({
        cap1: {id: 'cap1', skills: [], suggested_skills: []},
        cap2: {
          id: 'cap2',
          skills: [{id: 'bbb222==', name: 'B'}],
          suggested_skills: [],
        },
      });
    });
    test('remove skill - other_skills', () => {
      const newState = contactsReducer(startState, {
        type: DELETE_CONTACT_SKILL,
        payload: {
          contactId: 5,
          skillId: 'ccc333==',
        },
      });
      expect(newState[5].other_skills).toEqual([]);
    });
  });
});

describe('accounts state', () => {
  const initialState = {};
  test('inital state', () => {
    const newState = accountsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Get session', () => {
    const contact = {info: 'me'};
    const newState = accountsReducer(undefined, {
      type: GET_SESSION_API.RESOLVE,
      body: {
        status: 'success',
        data: {
          contact,
        },
      },
    });
    expect(newState).toEqual({
      has_session: true,
      contact,
    });
  });
  test('Get session reject', () => {
    const newState = accountsReducer(undefined, {
      type: GET_SESSION_API.REJECT,
      body: {status: 'success', data: {}},
    });
    expect(newState).toEqual({
      has_session: false,
      contact: null,
    });
  });
  test('Delete session', () => {
    const contact = {id: 123, account_id: 'auth|myid'};
    const newState = accountsReducer(undefined, {
      type: DELETE_SESSION_API.RESOLVE,
      body: {status: 'success'},
    });
    expect(newState).toEqual({
      has_session: false,
      contact: null,
    });
  });

  test('Create session', () => {
    const contact = {info: 'me'};
    const newState = accountsReducer(undefined, {
      type: CREATE_SESSION_API.RESOLVE,
      body: {
        status: 'success',
        data: {
          contact,
        },
      },
    });
    expect(newState).toEqual({
      has_session: true,
      contact,
    });
  });
  test('Add contact', () => {
    const contact = {id: 123, account_id: 'auth|123'};
    const newState = accountsReducer(undefined, {
      type: ADD_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      has_session: true,
      contact,
    });
  });

  test('Fetch all contacts', () => {
    const contacts = [
      {id: 1},
      {id: 2, account_id: 'auth|2'},
      {id: 3, account_id: 'auth|3'},
      {id: 4},
    ];
    const newState = accountsReducer(undefined, {
      type: ALL_CONTACTS_API.RESOLVE,
      body: {status: 'success', data: contacts},
    });
    expect(newState).toEqual({
      'auth|2': {id: 2, account_id: 'auth|2'},
      'auth|3': {id: 3, account_id: 'auth|3'},
    });
  });
  test('Get my contact', () => {
    const contact = {id: 123, account_id: 'auth|myid'};
    const newState = accountsReducer(undefined, {
      type: GET_MY_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      'auth|myid': contact,
    });
  });
});
