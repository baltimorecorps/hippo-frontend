import { 
  resumeReducer,
  RESUME_CREATION
} from './resume';

import {
  START_RESUME_CREATION,
  CANCEL_RESUME_SELECT,
  START_RESUME_SELECT,
  SELECT_RESUME_EXPERIENCE,
  DESELECT_RESUME_EXPERIENCE,
  GENERATE_RESUME,
  GENERATE_RESUME_API,
  CREATE_RESUME_API,
  CREATE_SECTION_API,
  REFRESH_RESUME_API,
  REFRESH_RESUMES_API,
  REFRESH_SECTION_API,
  UPDATE_RESUME_API,
  UPDATE_SECTION_API,
} from '../actions/resume';

describe('Resume selection state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {
      resumeCreationStep: RESUME_CREATION.NOT_ACTIVE,
      selected: {
        experience: [],
        education: [],
        accomplishments: [],
      },
      inProgress: false,
      resumes: [],
    }
  });
  test('initial state', () => {
    const newState = resumeReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('start resume creation', () => {
    const newState = resumeReducer(undefined, {type: START_RESUME_CREATION});
    expect(newState.resumeCreationStep).toBe(RESUME_CREATION.CHOOSE_STYLE);
  });
  test('start resume select', () => {
    const newState = resumeReducer(undefined, {type: START_RESUME_SELECT});
    expect(newState.resumeCreationStep).toBe(RESUME_CREATION.SELECT_HIGHLIGHTS);
  });
  test('cancel resume select', () => {
    Object.values(RESUME_CREATION).forEach((value) => {
      initialState.resumeCreationStep = value;
      const newState = resumeReducer(initialState, {type: CANCEL_RESUME_SELECT});
      expect(newState.resumeCreationStep).toBe(RESUME_CREATION.NOT_ACTIVE);
    })
  });
  test('cancel resume select clears selection', () => {
    initialState.selected.experience.push(1);
    initialState.selected.education.push(2);
    initialState.selected.accomplishments.push(3);
    initialState.selected.accomplishments.push(4);
    const newState = resumeReducer(initialState, {type: CANCEL_RESUME_SELECT});
    expect(newState.selected.experience.length).toBe(0);
    expect(newState.selected.education.length).toBe(0);
    expect(newState.selected.accomplishments.length).toBe(0);
  });

  test('select when select mode is not on', () => {
    const newState = resumeReducer(undefined, {
      type: SELECT_RESUME_EXPERIENCE,
      experience: {id: 123, type: 'Work'},
    });
    expect(newState.selected.experience.length).toBe(0);
  });

  test('select experience', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    const newState = resumeReducer(initialState, {
      type: SELECT_RESUME_EXPERIENCE,
      experience: {id: 123, type: 'Work'},
    });
    expect(newState.selected.experience.length).toBe(1);
    expect(newState.selected.experience[0]).toBe(123);
  });

  test('select second experience', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    initialState.selected.experience.push(456)
    const newState = resumeReducer(initialState, {
      type: SELECT_RESUME_EXPERIENCE,
      experience: {id: 123, type: 'Work'},
    });
    expect(newState.selected.experience.length).toBe(2);
    expect(newState.selected.experience[0]).toBe(456);
    expect(newState.selected.experience[1]).toBe(123);
  });

  test('deselect experience', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    initialState.selected.experience.push(123)
    initialState.selected.experience.push(456)
    initialState.selected.experience.push(789)
    const newState = resumeReducer(initialState, {
      type: DESELECT_RESUME_EXPERIENCE,
      experience: {id: 456, type: 'Work'},
    });
    expect(newState.selected.experience.length).toBe(2);
    expect(newState.selected.experience[0]).toBe(123);
    expect(newState.selected.experience[1]).toBe(789);
  });
  
  test('select experience - service', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    const newState = resumeReducer(initialState, {
      type: SELECT_RESUME_EXPERIENCE,
      experience: {id: 123, type: 'Service'},
    });
    expect(newState.selected.experience.length).toBe(1);
    expect(newState.selected.experience[0]).toBe(123);
  });

  test('deselect experience - education', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    initialState.selected.education.push(123)
    initialState.selected.education.push(456)
    initialState.selected.education.push(789)
    const newState = resumeReducer(initialState, {
      type: DESELECT_RESUME_EXPERIENCE,
      experience: {id: 456, type: 'Education'},
    });
    expect(newState.selected.education.length).toBe(2);
    expect(newState.selected.education[0]).toBe(123);
    expect(newState.selected.education[1]).toBe(789);
  });
  

  test('select experience - education', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    const newState = resumeReducer(initialState, {
      type: SELECT_RESUME_EXPERIENCE,
      experience: {id: 123, type: 'Education'},
    });
    expect(newState.selected.education.length).toBe(1);
    expect(newState.selected.education[0]).toBe(123);
  });

  test('select experience - accomplishment', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    const newState = resumeReducer(initialState, {
      type: SELECT_RESUME_EXPERIENCE,
      experience: {id: 123, type: 'Accomplishment'},
    });
    expect(newState.selected.accomplishments.length).toBe(1);
    expect(newState.selected.accomplishments[0]).toBe(123);
  });

  test('deselect experience - accomplishment', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    initialState.selected.accomplishments.push(123)
    initialState.selected.accomplishments.push(456)
    initialState.selected.accomplishments.push(789)
    const newState = resumeReducer(initialState, {
      type: DESELECT_RESUME_EXPERIENCE,
      experience: {id: 456, type: 'Accomplishment'},
    });
    expect(newState.selected.accomplishments.length).toBe(2);
    expect(newState.selected.accomplishments[0]).toBe(123);
    expect(newState.selected.accomplishments[1]).toBe(789);
  });

  test('generate experience', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    initialState.selected.experience.push(123)
    initialState.selected.education.push(789)
    initialState.selected.accomplishments.push(456)
    initialState.inProgress = true
    const resume =  {
      'id' : 2,
      'name': 'test_name',
      'date_created': '2019-10-28',
      'gdoc_id': 'ABCD1234',
    }

    const newState = resumeReducer(initialState, {
      type: GENERATE_RESUME_API.RESOLVE,
      body: {
        status: 'success',
        data: resume,
      }
    });
    expect(newState.resumeCreationStep).toBe(RESUME_CREATION.NOT_ACTIVE);
    expect(newState.resumes.length).toBe(1);
    expect(newState.resumes[0]).toEqual(resume)
    expect(newState.inProgress).toBe(false)
  });

  test('generate experience - request', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    initialState.selected.experience.push(123)
    initialState.selected.education.push(789)
    initialState.selected.accomplishments.push(456)

    const newState = resumeReducer(initialState, {
      type: GENERATE_RESUME_API.REQUEST,
    });
    expect(newState.resumeCreationStep).toBe(RESUME_CREATION.SELECT_HIGHLIGHTS);
    expect(newState.resumes.length).toBe(0);
    expect(newState.selected.experience.length).toBe(1)
    expect(newState.selected.education.length).toBe(1)
    expect(newState.selected.accomplishments.length).toBe(1)
    expect(newState.inProgress).toBe(true)

  });

  test('generate experience - reject', () => {
    initialState.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    initialState.selected.experience.push(123)
    initialState.selected.education.push(789)
    initialState.selected.accomplishments.push(456)
    initialState.inProgress = true

    const newState = resumeReducer(initialState, {
      type: GENERATE_RESUME_API.REJECT,
    });
    expect(newState.resumeCreationStep).toBe(RESUME_CREATION.SELECT_HIGHLIGHTS);
    expect(newState.resumes.length).toBe(0);
    expect(newState.selected.experience.length).toBe(1)
    expect(newState.selected.education.length).toBe(1)
    expect(newState.selected.accomplishments.length).toBe(1)
    expect(newState.inProgress).toBe(false)

  });


})

describe.skip('Resumes state', () => {
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
        email_primary: {
          email: 'testperson@testperson.test',
        },
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
        id: 1234,
        name: 'Test Resume New',
        contact_id: 333,
        sections: {
          987: {
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

  // TODO
  test.skip('Refresh all resumes for contact', () => {
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
        data: {}, // TODO what goes here?
        contact_id: 11,
      },
    });
    expect(newState).toEqual({
      222: updatedResume,
      333: bystander,
      444: newResume,
    });
  });

  // TODO
  test.skip('Update resume', () => {
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

  // TODO
  test.skip('Refresh resume section', () => {
    // Needs to be specced out for REFRESH_SECTION_API response!
    // Probably base this off UPDATE_SECTION_API test
    expect(true).toBe(false);
  });
});
