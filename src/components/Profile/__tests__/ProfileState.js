import fetchMock from 'fetch-mock'
import API_URL from '../../../constants'
import addExperience from '../ProfileState'

describe('Actions', () => {
  afterEach(() => { 
    fetchMock.restore() 
  });

  test('Create new experience action - success', () => {
    const dispatch = jest.fn()
    const contactId = 1234;
    const experience = { data: 'test' }
    const response = { response: 'win' }

    addExperience(contactId, experience)(dispatch)

    fetchMock.post(
      `${API_URL}/api/${contactId}/experiences/`,
      response);

    expect(dispatch.mock.calls[0].type).toBe('ADD_EXPERIENCE');
    expect(dispatch.mock.calls[0].data).toEqual(experience);
    expect(dispatch.mock.calls[1].type).toBe('REQUEST_ADD_EXPERIENCE');
    expect(dispatch.mock.calls[2].type).toBe('RESOLVE_ADD_EXPERIENCE');
    expect(dispatch.mock.calls[2].data).toEqual(response);

  });

});
