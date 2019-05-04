import { 
  experiencesReducer 
} from './profile';

import {
  ADD_EXPERIENCE,
  addExperienceLocal,
} from '../actions/profile';

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
