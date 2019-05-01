import fetchMock from 'fetch-mock'
import { API_URL } from '../../../constants'
import { ADD_EXPERIENCE, addExperience } from '../ProfileState'

describe('Actions', () => {
  afterEach(() => { 
    fetchMock.restore() 
  });

  test('Create new experience action - success', async function() {
    const dispatch = jest.fn()
    const contactId = 1234;
    const experience = { data: 'test' }
    const response = { response: 'win' }

    fetchMock.post(
      `${API_URL}/api/contacts/${contactId}/experiences/`,
      response);

    await addExperience(contactId, experience)(dispatch)

    console.log(dispatch.mock.calls);
    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(ADD_EXPERIENCE);
    expect(dispatch.mock.calls[0][0].experience).toEqual(experience);
    expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${ADD_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${ADD_EXPERIENCE}`);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);

  });

});
