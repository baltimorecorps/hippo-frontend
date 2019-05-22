import { resumeReducer } from './resume';

import {
  CREATE_RESUME_API,
  CREATE_SECTION_API,
  REFRESH_RESUME_API,
  REFRESH_RESUMES_API,
  REFRESH_SECTION_API,
  UPDATE_RESUME_API,
  UPDATE_SECTION_API,
} from '../actions/resume';

describe('Resumes state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = resumeReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  test('Create new resume - request resolved', () => {
    const newState = resumeReducer(initialState, {
      type: CREATE_RESUME_API.RESOLVE,
      body: {
        data: {
          name: 'Test Resume Name',
          date_created: '2019-05-06',
          contact: {
            id: 5678,
            other_stuff: 'blah',
          },
          id: 1234,
          sections: [],
        },
      },
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234].id).toBe(1234);
    expect(newState[1234].name).toEqual('Test Resume Name');
    expect(newState[1234].date_created).toEqual('2019-05-06');
    expect(newState[1234].contact_id).toBe(5678);
    expect(newState[1234].sections).toEqual({});
  });

  test('Create new resume - request rejected', () => {
    const newState = resumeReducer(initialState, {
      type: CREATE_RESUME_API.REJECT,
      body: {
        data: {
          name: 'Test Resume Name',
          date_created: '2019-05-06',
          contact: {
            id: 5678,
            other_stuff: 'blah',
          },
          id: 1234,
          sections: [],
        },
      },
    });
    expect(newState).toEqual(initialState);
  });

  test('Refresh single resume', () => {
    const oldResume = {
      id: 1234,
      name: 'Test Resume',
      contact_id: 333,
      sections: {
        765: {
          id: 765,
          stuff: 'old',
        },
      },
    };

    const newResume = {
      id: 1234,
      name: 'Test Resume New',
      contact: {
        name: 'Test Person',
        id: 333,
      },
      sections: [
        {
          id: 987,
          stuff: 'here',
        },
        {
          id: 234,
          stuff: 'here 2',
        },
      ],
    };

    initialState = {
      1234: oldResume,
    };
    const newState = resumeReducer(initialState, {
      type: REFRESH_RESUME_API.RESOLVE,
      body: { status: 'success', data: newResume },
    });
    expect(newState).toEqual({
      1234: {
        name: 'Test Resume New',
        contact_id: 333,
        sections: {
          978: {
            id: 987,
            stuff: 'here',
          },
          234: {
            id: 234,
            stuff: 'here 2',
          },
        },
      },
    });
  });

  test('Refresh all resumes for contact', () => {
    const bystander = {
      id: 333,
      name: 'Test Resume 333',
      contact_id: 22,
      sections: {},
    };

    initialState = {
      111: {
        id: 111,
        name: 'Test Resume 111',
        contact_id: 11,
        sections: {},
      },
      222: {
        id: 222,
        name: 'Test Resume 222',
        contact_id: 11,
        sections: {},
      },
      333: bystander,
    };

    const updatedResume = {
      id: 222,
      name: 'Test Resume New',
      contact: {
        name: 'Test Person',
        id: 11,
      },
      sections: [
        {
          id: 123,
          stuff: 'test update',
        },
      ],
    };

    const newResume = {
      id: 444,
      name: 'Test Resume New',
      contact: {
        name: 'Test Person',
        id: 11,
      },
      sections: [
        {
          id: 987,
          stuff: 'here',
        },
        {
          id: 234,
          stuff: 'here 2',
        },
      ],
    };
    const newState = resumeReducer(initialState, {
      type: REFRESH_RESUMES_API.RESOLVE,
      body: {
        status: 'success',
        data: experience,
        contact_id: 11,
      },
    });
    expect(newState).toEqual({
      222: updatedResume,
      333: bystander,
      444: newResume,
    });
  });

  test('Update resume', () => {
    // Needs to be specced out for UPDATE_RESUME_API response!
    // Probably base this off REFRESH_RESUME_API
    expect(true).toBe(false);
  });

  test('Create new section', () => {
    const newSection = {
      name: 'Relevant Experience',
      resume_id: 11,
      items: [{ test: 'item_1' }, { test: 'item_2' }],
      id: 8,
      other_stuff: 'test stuff',
    };
    const resume = {
      id: 11,
      name: 'Test Resume',
      sections: {
        55: {
          id: 55,
          resume_id: 11,
          name: 'Test Section 1',
          items: [],
        },
      },
    };

    initialState = {
      11: resume,
    };
    const newState = resumeReducer(initialState, {
      type: CREATE_SECTION_API.RESOLVE,
      body: { status: 'success', data: newSection },
    });
    expect(newState[11].sections).toHaveProperty('8');
    expect(newState[11].sections[8]).toEqual(newSection);
    expect(newState[11].sections).toHaveProperty('55');
    expect(newState[11].sections[55]).toEqual({
      id: 55,
      resume_id: 11,
      name: 'Test Section 1',
      items: [],
    });
  });

  test('Update section', () => {
    const newSection = {
      name: 'Relevant Experience',
      resume_id: 11,
      items: [{ test: 'item_1' }, { test: 'item_2' }],
      id: 8,
      other_stuff: 'test stuff',
    };
    const resume = {
      id: 11,
      name: 'Test Resume',
      sections: {
        8: {
          id: 8,
          resume_id: 11,
          name: 'Test Section 1',
          items: [],
        },
      },
    };

    initialState = {
      11: resume,
    };
    const newState = resumeReducer(initialState, {
      type: UPDATE_SECTION_API.RESOLVE,
      body: { status: 'success', data: newSection },
    });
    expect(newState[11].sections).toHaveProperty('8');
    expect(newState[11].sections[8]).toEqual(newSection);
  });

  test('Refresh resume section', () => {
    // Needs to be specced out for REFRESH_SECTION_API response!
    // Probably base this off UPDATE_SECTION_API test
    expect(true).toBe(false);
  });
});
