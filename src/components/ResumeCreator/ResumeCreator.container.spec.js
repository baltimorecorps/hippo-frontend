import {mapStateToProps} from './ResumeCreator.container';
import {RESUME_CREATION} from '../../state/resume';

const blankState = {
  contacts: [],
  experiences: {},
  tags: {},
  tagItems: {},
  resume: {},
};

test('test resume state mapping', () => {
  const state = Object.assign({}, blankState, {
    experiences: {
      10: {id: 10, data: 'exp 1', contact_id: 1, type: 'Work'},
      11: {id: 11, data: 'exp 2', contact_id: 2, type: 'Work'},
      13: {id: 13, data: 'exp 4', contact_id: 1, type: 'Service'},
      14: {id: 14, data: 'exp 5', contact_id: 1, type: 'Work'},
    },
    resume: {
      resumeCreationStep: RESUME_CREATION.SELECT_HIGHLIGHTS,
      selected: {
        experience: [13, 10],
        education: [],
        accomplishments: [],
      },
    },
  });

  const props = mapStateToProps(state, {});
  expect(props).toHaveProperty('sections');
  expect(props.sections).toHaveProperty('experience');
  expect(props.sections.experience[0]).toEqual(state.experiences[13]);
  expect(props.sections.experience[1]).toEqual(state.experiences[10]);
});
