import fetchMock from "fetch-mock";
import {ADD_CONTACT, ADD_CONTACT_API, addContact} from "./contacts";

afterEach(() => {
  fetchMock.restore();
});

test("Create new contact action - success", async function() {
  const dispatch = jest.fn();
  const contact = {data: "test"};
  const response = {result: "win"};
  const path = `path:/api/contacts/`;

  fetchMock.post(path, response);

  await addContact(contact)(dispatch);

  expect(fetchMock.lastCall(path)[1].body).toBe(JSON.stringify(contact));

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(ADD_CONTACT);
  expect(dispatch.mock.calls[0][0].contact).toEqual(contact);
  expect(dispatch.mock.calls[1][0].type).toBe(ADD_CONTACT_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
});

test("Create new contact action - failure", async function() {
  const dispatch = jest.fn();
  const contact = {data: "test"};

  fetchMock.post(`path:/api/contacts/`, {
    status: 500,
    body: "",
  });

  await addContact(contact)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_API.REJECT);
  expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
});
