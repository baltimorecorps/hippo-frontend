import { makeMapStateToProps } from './Skill.container';

let state = {};
beforeEach(() => {
  state = {
    contacts: [1, 2, 3, 4],
    experiences: {
      10: { id: 10, data: 'exp 1', contact_id: 1, type: 'Work' },
      11: { id: 11, data: 'exp 2', contact_id: 2, type: 'Work' },
      12: { id: 12, data: 'exp 3', contact_id: 3, type: 'Work' },
      13: { id: 13, data: 'exp 4', contact_id: 2, type: 'Service' },
      14: { id: 14, data: 'exp 5', contact_id: 2, type: 'Work' },
    },
    tags: {
      10: { id: 10, data: 'tag 1', type: 'Function' },
      11: { id: 11, data: 'tag 2', type: 'Function' },
      12: { id: 12, data: 'tag 3', type: 'Function' },
      13: { id: 13, data: 'tag 4', type: 'Skill' },
      14: { id: 14, data: 'tag 5', type: 'Function' },
    },
    tagItems: {
      1234: {
        10: { contact_id: 1234, tag_id: 10, data: 'tag 1', type: 'Function' },
        11: { contact_id: 1234, tag_id: 11, data: 'tag 2', type: 'Function' },
        13: { contact_id: 1234, tag_id: 13, data: 'tag 4', type: 'Skill' },
        12: { contact_id: 1234, tag_id: 12, data: 'tag 3', type: 'Function' },
      },
      1111: {
        10: { contact_id: 1111, tag_id: 10, data: 'tag 1', type: 'Function' },
        13: { contact_id: 1111, tag_id: 13, data: 'tag 4', type: 'Skill' },
        14: { contact_id: 1111, tag_id: 14, data: 'tag 5', type: 'Function' },
      },
    },
  };
});

test('test tag conversion', () => {
  const ownProps = {
    contactId: 1234,
    experienceType: 'Function',
  };

  const mapStateToProps = makeMapStateToProps();
  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty('tags');
  expect(props.tags).toHaveLength(5);
});

test('test tag item state mapping', () => {
  const ownProps = {
    contactId: 1234,
    experienceType: 'Function',
  };

  const mapStateToProps = makeMapStateToProps();
  const props = mapStateToProps(state, ownProps);

  expect(props).toHaveProperty('tagItems');
  props.tagItems.forEach((tagItem) => {
    expect(tagItem.contact_id).toBe(1234);
    expect(tagItem.type).toBe('Function');
  });
});

test('test blank state mapping', () => {
  const ownProps = {
    contactId: 1234,
    experienceType: 'Function',
  };

  const mapStateToProps = makeMapStateToProps();
  const props = mapStateToProps({ tags: {}, tagItems: {} }, ownProps);

  expect(props).toHaveProperty('tags');
  expect(props.tags).toEqual([]);

  expect(props).toHaveProperty('tagItems');
  expect(props.tagItems).toEqual([]);
});