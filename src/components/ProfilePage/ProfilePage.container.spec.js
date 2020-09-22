import {mapStateToProps} from './ProfilePage.container';
import {RESUME_CREATION} from 'state/resume';

const blankState = {
  contacts: [],
  experiences: {},
  resume: {},
};

test('test resume state mapping', () => {
  const state = Object.assign({}, blankState, {
    contacts: [1, 2, 3, 4],
    experiences: {
      10: {id: 10, data: 'exp 1', contact_id: 1, type: 'Work'},
      11: {id: 11, data: 'exp 2', contact_id: 2, type: 'Work'},
      12: {id: 12, data: 'exp 3', contact_id: 1, type: 'Accomplishment'},
      13: {id: 13, data: 'exp 4', contact_id: 1, type: 'Service'},
      14: {id: 14, data: 'exp 5', contact_id: 1, type: 'Work'},
      15: {id: 15, data: 'edu 1', contact_id: 1, type: 'Education'},
      16: {id: 16, data: 'edu 2', contact_id: 1, type: 'Education'},
      17: {id: 17, data: 'exp 6', contact_id: 1, type: 'Service'},
    },
    resume: {
      resumeCreationStep: RESUME_CREATION.SELECT_HIGHLIGHTS,
      selected: {
        experience: [10, 13],
        education: [15],
        accomplishments: [12],
      },
    },
  });
  const ownProps = {
    match: {
      params: {
        contactId: 1,
      },
    },
  };

  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty('myResume');
  ['exp', 'edu', 'achieve', 'skills'].forEach(suffix => {
    expect(props.myResume).toHaveProperty(`relevant_${suffix}`);
    expect(props.myResume).toHaveProperty(`other_${suffix}`);
  });
  expect(props.myResume.relevant_exp.sort()).toEqual([10, 13]);
  expect(props.myResume.other_exp.sort()).toEqual([14, 17]);
  expect(props.myResume.relevant_edu).toEqual([15]);
  expect(props.myResume.other_edu).toEqual([16]);
  expect(props.myResume.relevant_achieve).toEqual([12]);
  expect(props.myResume.other_achieve).toEqual([]);
});

test('test resume state mapping - non-select', () => {
  const state = Object.assign({}, blankState, {
    contacts: [1, 2, 3, 4],
    experiences: {
      10: {id: 10, data: 'exp 1', contact_id: 1, type: 'Work'},
      11: {id: 11, data: 'exp 2', contact_id: 2, type: 'Work'},
      12: {id: 12, data: 'exp 3', contact_id: 1, type: 'Accomplishment'},
      13: {id: 13, data: 'exp 4', contact_id: 1, type: 'Service'},
      14: {id: 14, data: 'exp 5', contact_id: 1, type: 'Work'},
      15: {id: 15, data: 'edu 1', contact_id: 1, type: 'Education'},
      16: {id: 16, data: 'edu 2', contact_id: 1, type: 'Education'},
      17: {id: 17, data: 'exp 6', contact_id: 1, type: 'Service'},
    },
    resume: {
      resumeCreationStep: RESUME_CREATION.CHOOSE_STYLE,
      selected: {
        experience: [10, 13],
        education: [15],
        accomplishments: [12],
      },
    },
  });
  const ownProps = {
    match: {
      params: {
        contactId: 1,
      },
    },
  };

  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty('myResume');
  ['exp', 'edu', 'achieve', 'skills'].forEach(suffix => {
    expect(props.myResume).toHaveProperty(`relevant_${suffix}`);
    expect(props.myResume).toHaveProperty(`other_${suffix}`);
  });
  expect(props.myResume.relevant_exp.sort()).toEqual([10, 13, 14, 17]);
  expect(props.myResume.other_exp).toEqual([]);
  expect(props.myResume.relevant_edu.sort()).toEqual([15, 16]);
  expect(props.myResume.other_edu).toEqual([]);
  expect(props.myResume.relevant_achieve.sort()).toEqual([12]);
  expect(props.myResume.other_achieve).toEqual([]);
});
