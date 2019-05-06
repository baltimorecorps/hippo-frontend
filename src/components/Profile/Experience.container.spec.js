import {makeMapStateToProps} from './Experience.container';

test('test state mapping', () => {
  const state = {
    contacts: [1, 2, 3, 4],
    experiences: {
      [10]: {id: 10, data: 'exp 1', contact_id: 1, type: 'Work'},
      [11]: {id: 11, data: 'exp 2', contact_id: 2, type: 'Work'},
      [12]: {id: 12, data: 'exp 3', contact_id: 3, type: 'Work'},
      [13]: {id: 13, data: 'exp 4', contact_id: 2, type: 'Service'},
      [14]: {id: 14, data: 'exp 5', contact_id: 2, type: 'Work'},
    },
  };
  const ownProps = {
    contactId: 2,
    experienceType: 'Work',
  };

  const mapStateToProps = makeMapStateToProps();
  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty('experiences');
  expect(props.experiences).toBeInstanceOf(Array);
  props.experiences.forEach(experience => {
    expect(experience.contact_id).toBe(2);
    expect(experience.type).toBe('Work');
  });
});
