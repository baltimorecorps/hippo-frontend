import { makeMapStateToProps } from './Header.container';

test('test state mapping', () => {
  const state = {
    resumes: {
      3: {
        id: 3,
        name: 'Test Resume 3',
      },
      4: {
        id: 4,
        name: 'Test Resume 4',
      },
    }
  };
  const ownProps = {
    contactId: 2,
    resumeId: 3,
  };

  const mapStateToProps = makeMapStateToProps();
  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty('name');
  expect(props.name).toEqual('Test Resume 3');
});
