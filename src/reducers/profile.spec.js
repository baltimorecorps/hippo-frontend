import {experiencesReducer} from './profile';

import {
  ADD_EXPERIENCE, 
  EXPERIENCE,
  EXPERIENCES,
  addExperienceLocal} from '../actions/profile';

describe('Experience state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('inital state', () => {
    const newState = experiencesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add new experience - request resolved', () => {
    const experience = {id: 1234, other_stuff: 'data'};
    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${ADD_EXPERIENCE}`,
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
      type: `RESOLVE_${ADD_EXPERIENCE}`,
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
      type: `REJECT_${ADD_EXPERIENCE}`,
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
    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${EXPERIENCES}`,
      body: {status: 'success', data: experiences},
    });
    expect(newState).toEqual({
      [11]: {id: 11, title: 'exp 1'},
      [12]: {id: 12, title: 'exp 2'},
      [16]: {id: 16, title: 'exp 6'},
      [15]: {id: 15, title: 'exp 5'},
    });
  });

  test('Refresh one experience', () => {
    const experience = {id: 11, data: 'exp data'};

    const oldExperience = { id: 11, data: 'old exp data' }
    const bystander = { id: 12, data: 'bystander' }
    initialState = {
      [11]: oldExperience,
      [12]: bystander,
    }
    const newState = experiencesReducer(initialState, {
      type: `RESOLVE_${EXPERIENCE}`,
      body: {status: 'success', data: experience},
    });
    expect(newState).toEqual({
      [11]: experience,
      [12]: bystander,
    });
  });

});
