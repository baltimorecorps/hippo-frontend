import fetchMock from 'fetch-mock';
import {
  ADD_EXPERIENCE,
  addExperience,
  addExperienceLocal,
  experiencesReducer,
} from '../ProfileState';

describe('Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('Create new experience action - success', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const experience = {data: 'test'};
    const response = {response: 'win'};

    fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, response);

    await addExperience(contactId, experience)(dispatch);

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
    const experience = {data: 'test'};

    fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, 500);

    await addExperience(contactId, experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[2][0].type).toBe(`REJECT_${ADD_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].contactId).toBe(contactId);
    expect(dispatch.mock.calls[2][0].experience).toBe(experience);
    expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
  });
});

describe('State changes', () => {
  describe('Experience state', () => {
    const initialState = {
      unsavedChanges: false,
      inRequest: false,
      order: [],
      experiences: {},
    };
    test('inital state', () => {
      const newState = experiencesReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });
    test('Add new experience - local state only', () => {
      const experience = {id: 1234, other_stuff: 'data'};
      const newState = experiencesReducer(
        undefined,
        addExperienceLocal(experience),
      );
      expect(newState.experiences).toHaveProperty('1234');
      expect(newState.experiences[1234]).toEqual(experience);
      expect(newState.order).toContain(1234);
      expect(newState.unsavedChanges).toBe(true);
    });
    test('Add new experience - request dispatched', () => {
      const newState = experiencesReducer(initialState, {
        type: `REQUEST_${ADD_EXPERIENCE}`,
      });
      expect(newState.inRequest).toBe(true);
    });
    test('Add new experience - request resolved', () => {
      const experience = {id: 1234, other_stuff: 'data'};
      const startState = initialState;
      startState.inRequest = true;
      startState.unsavedChanges = true;
      const newState = experiencesReducer(startState, {
        type: `RESOLVE_${ADD_EXPERIENCE}`,
        body: experience,
      });
      expect(newState.experiences).toHaveProperty('1234');
      expect(newState.experiences[1234]).toEqual(experience);
      expect(newState.order).toContain(1234);
      expect(newState.inRequest).toBe(false);
      expect(newState.unsavedChanges).toBe(false);
    });
    test('Add new experience - request rejected', () => {
      const experience = {id: 1234, other_stuff: 'data'};
      const startState = initialState;
      startState.order.push(1234);
      startState.experiences[1234] = experience;
      startState.unsavedChanges = true;
      startState.inRequest = true;

      const newState = experiencesReducer(startState, {
        type: `REJECT_${ADD_EXPERIENCE}`,
        experience: experience,
      });
      expect(newState.experiences).not.toHaveProperty('1234');
      expect(newState.order).not.toContain(1234);
      expect(newState.inRequest).toBe(false);
      expect(newState.unsavedChanges).toBe(false);
    });
  });
});
